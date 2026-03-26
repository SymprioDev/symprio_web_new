import express from 'express';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());

// Debug: Log all incoming requests
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    console.log(`[REQUEST] ${req.method} ${req.path}`);
  }
  next();
});

const uploadsDir = path.join(__dirname, 'public', 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase();
    const safeExt = ext && ext.length <= 5 ? ext : '';
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`);
  }
});

const upload = multer({ storage });

app.use('/uploads', express.static(uploadsDir));

// Initialize SQLite Database
const db = new sqlite3.Database(path.join(__dirname, 'users.db'), (err) => {
  if (err) {
    console.error('Database error:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating users table:', err);
    } else {
      console.log('Users table ready');
    }
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      date TEXT NOT NULL,
      location TEXT NOT NULL,
      type TEXT DEFAULT 'event',
      link TEXT,
      created_by INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (created_by) REFERENCES users(id)
    )
  `, (err) => {
    if (err) {
      console.error('Error creating events table:', err);
    } else {
      console.log('Events table ready');
      // Add link column if it doesn't exist
      db.run(`ALTER TABLE events ADD COLUMN link TEXT`, (altErr) => {
        if (altErr && !altErr.message.includes('duplicate column')) {
          console.log('Link column added to events');
        }
      });
    }
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS trainings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      date TEXT NOT NULL,
      duration TEXT NOT NULL,
      instructor TEXT NOT NULL,
      capacity INTEGER DEFAULT 50,
      enrolled INTEGER DEFAULT 0,
      link TEXT,
      created_by INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (created_by) REFERENCES users(id)
    )
  `, (err) => {
    if (err) {
      console.error('Error creating trainings table:', err);
    } else {
      console.log('Trainings table ready');
      // Add link column if it doesn't exist
      db.run(`ALTER TABLE trainings ADD COLUMN link TEXT`, (altErr) => {
        if (altErr && !altErr.message.includes('duplicate column')) {
          console.log('Link column added to trainings');
        }
      });
    }
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      department TEXT NOT NULL,
      type TEXT NOT NULL,
      description TEXT NOT NULL,
      location TEXT DEFAULT 'Remote',
      status TEXT DEFAULT 'active',
      created_by INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (created_by) REFERENCES users(id)
    )
  `, (err) => {
    if (err) {
      console.error('Error creating jobs table:', err);
    } else {
      console.log('Jobs table ready');
      // Seed default jobs if table is empty
      db.get('SELECT COUNT(*) as count FROM jobs', (err, row) => {
        if (!err && row && row.count === 0) {
          const seedJobs = [
            ['Senior RPA Developer', 'Engineering', 'Full-time', 'Design and deploy enterprise RPA solutions using UiPath and Power Automate. Lead bot development, testing, and go-live support.', 'Kuala Lumpur, Malaysia'],
            ['AI Solution Architect', 'Consulting', 'Full-time', 'Architect AI-powered applications including chatbots, RAG systems, and LLM pipelines for enterprise clients.', 'Singapore / Remote'],
            ['Oracle Cloud Consultant', 'Consulting', 'Contract', 'Lead Oracle Cloud ERP implementations and migrations for APAC and Middle East clients.', 'India'],
            ['Business Development Manager', 'Sales', 'Full-time', 'Drive new business in APAC by identifying prospects and closing AI & automation deals.', 'Kuala Lumpur, Malaysia'],
            ['Digital Marketing Specialist', 'Marketing', 'Full-time', "Own Symprio's digital presence across LinkedIn, Google, and content channels.", 'Remote'],
            ['UiPath RPA Trainer', 'Consulting', 'Contract', 'Deliver hands-on UiPath and Power Automate training to enterprise clients across APAC.', 'Remote / On-site']
          ];
          const stmt = db.prepare('INSERT INTO jobs (title, department, type, description, location, status) VALUES (?, ?, ?, ?, ?, ?)');
          seedJobs.forEach(j => stmt.run([...j, 'active']));
          stmt.finalize();
          console.log('Seeded 6 default jobs');
        }
      });
    }
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      company TEXT NOT NULL,
      service TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'new',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating enquiries table:', err);
    } else {
      console.log('Enquiries table ready');
    }
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS locations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      image_url TEXT,
      created_by INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (created_by) REFERENCES users(id)
    )
  `, (err) => {
    if (err) {
      console.error('Error creating locations table:', err);
    } else {
      console.log('Locations table ready');
    }
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS job_applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      mobileNumber TEXT NOT NULL,
      email TEXT NOT NULL,
      coverLetter TEXT,
      cvFilePath TEXT,
      jobTitle TEXT,
      submittedDate DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating job_applications table:', err);
    } else {
      console.log('Job applications table ready');
      // Add email column if it doesn't exist (for existing databases)
      db.run(`ALTER TABLE job_applications ADD COLUMN email TEXT`, (alterErr) => {
        if (alterErr && !alterErr.message.includes('duplicate column name')) {
          console.error('Error adding email column:', alterErr);
        }
      });
      
      // Add status column if it doesn't exist (for existing databases)
      db.run(`ALTER TABLE job_applications ADD COLUMN status TEXT DEFAULT 'pending'`, (alterErr) => {
        if (alterErr && !alterErr.message.includes('duplicate column name')) {
          console.error('Error adding status column:', alterErr);
        }
      });
      
      // Create indices for better query performance
      db.run('CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status)', (idxErr) => {
        if (idxErr) console.error('Error creating job_applications status index:', idxErr);
      });
      db.run('CREATE INDEX IF NOT EXISTS idx_job_applications_jobTitle ON job_applications(jobTitle)', (idxErr) => {
        if (idxErr) console.error('Error creating job_applications jobTitle index:', idxErr);
      });
      db.run('CREATE INDEX IF NOT EXISTS idx_job_applications_submittedDate ON job_applications(submittedDate)', (idxErr) => {
        if (idxErr) console.error('Error creating job_applications submittedDate index:', idxErr);
      });
    }
  });

  // Mail Configuration table
  db.run(`
    CREATE TABLE IF NOT EXISTS mail_config (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      MAILERSEND_API_KEY TEXT,
      MAILERSEND_DOMAIN TEXT,
      COMPANY_EMAIL TEXT,
      last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating mail_config table:', err);
    } else {
      console.log('Mail config table ready');
    }
  });

  // Subscription config table
  db.run(`
    CREATE TABLE IF NOT EXISTS subscription_config (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      rate INTEGER DEFAULT 50,
      last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating subscription_config table:', err);
    } else {
      // Insert default rate if not exists
      db.run('INSERT OR IGNORE INTO subscription_config (id, rate) VALUES (1, 50)');
      console.log('Subscription config table ready');
    }
  });

  // Subscriptions table
  db.run(`
    CREATE TABLE IF NOT EXISTS subscriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      companyName TEXT,
      contactNumber TEXT,
      message TEXT,
      hours INTEGER,
      rate INTEGER,
      totalAmount INTEGER,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating subscriptions table:', err);
    } else {
      console.log('Subscriptions table ready');
      // Create indices for better query performance
      db.run('CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status)', (idxErr) => {
        if (idxErr) console.error('Error creating subscriptions status index:', idxErr);
      });
      db.run('CREATE INDEX IF NOT EXISTS idx_subscriptions_created_at ON subscriptions(created_at)', (idxErr) => {
        if (idxErr) console.error('Error creating subscriptions created_at index:', idxErr);
      });
    }
  });

  // Subscription Status Types table
  db.run(`
    CREATE TABLE IF NOT EXISTS subscription_status_types (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      status_name TEXT NOT NULL UNIQUE,
      color TEXT NOT NULL DEFAULT '#6b7280',
      display_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating subscription_status_types table:', err);
    } else {
      console.log('Subscription status types table ready');
      // Insert default status types if table is empty
      db.get('SELECT COUNT(*) as count FROM subscription_status_types', (countErr, result) => {
        if (!countErr && result.count === 0) {
          const defaultStatuses = [
            { name: 'Pending', color: '#f59e0b', order: 1 },
            { name: 'Reviewed', color: '#10b981', order: 2 },
            { name: 'Approved', color: '#3b82f6', order: 3 },
            { name: 'Rejected', color: '#ef4444', order: 4 }
          ];
          defaultStatuses.forEach((status, index) => {
            db.run('INSERT INTO subscription_status_types (status_name, color, display_order) VALUES (?, ?, ?)',
              [status.name, status.color, status.order]);
          });
          console.log('Default subscription status types created');
        }
      });
    }
  });
}

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validation
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    db.run(
      'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
      [email, hashedPassword, name],
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE')) {
            return res.status(400).json({ error: 'Email already registered' });
          }
          return res.status(500).json({ error: 'Registration failed' });
        }

        // Generate JWT
        const token = jwt.sign({ id: this.lastID, email }, JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({
          success: true,
          token,
          user: { id: this.lastID, email, name }
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Generate JWT
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
      res.json({
        success: true,
        token,
        user: { id: user.id, email: user.email, name: user.name }
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify token endpoint
app.post('/api/auth/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ valid: false, error: 'Invalid token' });
  }
});

// Get user profile
app.get('/api/auth/profile', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    db.get('SELECT id, email, name, created_at FROM users WHERE id = ?', [decoded.id], (err, user) => {
      if (err || !user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Middleware to verify JWT
const verifyJWT = (req, res, next) => {
  console.log('[verifyJWT] Checking token...');
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('[verifyJWT] Token present:', !!token);
    if (!token) {
      console.log('[verifyJWT] No token provided');
      return res.status(401).json({ error: 'No token provided' });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('[verifyJWT] Token valid, user:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log('[verifyJWT] Token invalid:', error.message);
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ========== EVENTS ENDPOINTS ==========

// Get all events
app.get('/api/events', (req, res) => {
  db.all('SELECT * FROM events ORDER BY date DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows || []);
  });
});

// Add new event (admin only)
app.post('/api/events', verifyJWT, (req, res) => {
  try {
    const { title, description, date, location, type, link } = req.body;

    if (!title || !description || !date || !location) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    db.run(
      'INSERT INTO events (title, description, date, location, type, link, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, date, location, type || 'event', link || null, req.user.id],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to create event' });
        }
        res.status(201).json({
          success: true,
          event: {
            id: this.lastID,
            title,
            description,
            date,
            location,
            type: type || 'event',
            link: link || null
          }
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete event (admin only)
app.delete('/api/events/:id', verifyJWT, (req, res) => {
  try {
    db.run('DELETE FROM events WHERE id = ? AND created_by = ?', [req.params.id, req.user.id], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete event' });
      }
      res.json({ success: true, message: 'Event deleted' });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== TRAININGS ENDPOINTS ==========

// Get all trainings
app.get('/api/trainings', (req, res) => {
  db.all('SELECT * FROM trainings ORDER BY date DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows || []);
  });
});

// Add new training (admin only)
app.post('/api/trainings', verifyJWT, (req, res) => {
  try {
    const { title, description, date, duration, instructor, capacity, link } = req.body;

    if (!title || !description || !date || !duration || !instructor) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    db.run(
      'INSERT INTO trainings (title, description, date, duration, instructor, capacity, link, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description, date, duration, instructor, capacity || 50, link || null, req.user.id],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to create training' });
        }
        res.status(201).json({
          success: true,
          training: {
            id: this.lastID,
            title,
            description,
            date,
            duration,
            instructor,
            capacity: capacity || 50,
            enrolled: 0,
            link: link || null
          }
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete training (admin only)
app.delete('/api/trainings/:id', verifyJWT, (req, res) => {
  try {
    db.run('DELETE FROM trainings WHERE id = ? AND created_by = ?', [req.params.id, req.user.id], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete training' });
      }
      res.json({ success: true, message: 'Training deleted' });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== JOBS ENDPOINTS ==========

// Get all active jobs
app.get('/api/jobs', (req, res) => {
  db.all('SELECT * FROM jobs WHERE status = "active" ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows || []);
  });
});

// Post new job (admin only)
app.post('/api/jobs', verifyJWT, (req, res) => {
  try {
    const { title, department, type, description, location } = req.body;

    if (!title || !department || !type || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    db.run(
      'INSERT INTO jobs (title, department, type, description, location, status, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, department, type, description, location || 'Remote', 'active', req.user.id],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to post job' });
        }
        res.status(201).json({
          success: true,
          job: {
            id: this.lastID,
            title,
            department,
            type,
            description,
            location: location || 'Remote',
            status: 'active'
          }
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete job (admin only)
app.delete('/api/jobs/:id', verifyJWT, (req, res) => {
  try {
    db.run('DELETE FROM jobs WHERE id = ? AND created_by = ?', [req.params.id, req.user.id], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete job' });
      }
      res.json({ success: true, message: 'Job deleted' });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Post enquiry (public endpoint)
app.post('/api/enquiries', async (req, res) => {
  try {
    const { name, email, phone, company, service, message } = req.body;

    if (!name || !email || !phone || !company || !service || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    db.run(
      'INSERT INTO enquiries (name, email, phone, company, service, message, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, phone, company, service, message, 'new'],
      async function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to submit enquiry' });
        }

        const enquiryId = this.lastID;
        
        // Prepare enquiry data for email
        const enquiryData = {
          fullName: name,
          email: email,
          phone: phone,
          companyName: company,
          service: service,
          message: message
        };

        // Trigger email (non-blocking) - using dynamic import for ES6 module
        try {
          const { sendEnquiryEmails } = await import('./services/emailService.js');
          // Don't await - let it run in background
          sendEnquiryEmails(enquiryData);
        } catch (emailErr) {
          console.error('Email service error:', emailErr.message);
          // Don't block - email failure shouldn't affect enquiry submission
        }

        res.status(201).json({
          success: true,
          message: 'Your enquiry has been submitted successfully',
          enquiry: {
            id: enquiryId,
            name,
            email,
            phone,
            company,
            service,
            message,
            status: 'new'
          }
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all enquiries (admin only)
app.get('/api/enquiries', verifyJWT, (req, res) => {
  try {
    db.all('SELECT * FROM enquiries ORDER BY created_at DESC', (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch enquiries' });
      }
      res.json({ enquiries: rows || [] });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update enquiry status (admin only)
app.patch('/api/enquiries/:id', verifyJWT, (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    db.run(
      'UPDATE enquiries SET status = ? WHERE id = ?',
      [status, req.params.id],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to update enquiry' });
        }
        res.json({ success: true, message: 'Enquiry status updated' });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete enquiry (admin only)
app.delete('/api/enquiries/:id', verifyJWT, (req, res) => {
  try {
    db.run('DELETE FROM enquiries WHERE id = ?', [req.params.id], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete enquiry' });
      }
      res.json({ success: true, message: 'Enquiry deleted' });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== LOCATIONS ENDPOINTS ==========

// Get all locations (public)
app.get('/api/locations', (req, res) => {
  db.all('SELECT * FROM locations ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch locations' });
    }
    res.json(rows || []);
  });
});

// Add new location (admin only)
app.post('/api/locations', verifyJWT, upload.single('image'), (req, res) => {
  try {
    const { name, address, phone, email, imageUrl } = req.body;
    const filePath = req.file ? `/uploads/${req.file.filename}` : null;
    const finalImageUrl = filePath || (imageUrl ? imageUrl.trim() : null);

    if (!name || !address || !phone) {
      return res.status(400).json({ error: 'Name, address, and phone are required' });
    }

    db.run(
      'INSERT INTO locations (name, address, phone, email, image_url, created_by) VALUES (?, ?, ?, ?, ?, ?)',
      [name, address, phone, email || null, finalImageUrl, req.user.id],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to create location' });
        }
        res.status(201).json({
          success: true,
          location: {
            id: this.lastID,
            name,
            address,
            phone,
            email: email || null,
            image_url: finalImageUrl
          }
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete location (admin only)
app.delete('/api/locations/:id', verifyJWT, (req, res) => {
  try {
    db.run('DELETE FROM locations WHERE id = ? AND created_by = ?', [req.params.id, req.user.id], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete location' });
      }
      res.json({ success: true, message: 'Location deleted' });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Job Applications API

// Create uploads directory for CVs
const cvUploadsDir = path.join(__dirname, 'public', 'uploads', 'cv');
fs.mkdirSync(cvUploadsDir, { recursive: true });

const cvStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, cvUploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase();
    const safeExt = ext && ext.length <= 5 ? ext : '.pdf';
    cb(null, `cv-${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`);
  }
});

const cvUpload = multer({ 
  storage: cvStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

// POST job application
app.post('/api/job-applications', cvUpload.single('cv'), async (req, res) => {
  try {
    const { firstName, lastName, mobileNumber, coverLetter, jobTitle, email } = req.body;

    if (!firstName || !lastName || !mobileNumber || !email) {
      return res.status(400).json({ error: 'First name, last name, mobile number, and email are required' });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    const cvFilePath = req.file ? `/uploads/cv/${req.file.filename}` : null;

    // Import email service
    const { sendJobApplicationEmails } = await import('./services/emailService.js');

    db.run(
      'INSERT INTO job_applications (firstName, lastName, mobileNumber, email, coverLetter, cvFilePath, jobTitle) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [firstName, lastName, mobileNumber, email, coverLetter || '', cvFilePath, jobTitle || ''],
      function(err) {
        if (err) {
          console.error('Error inserting job application:', err);
          return res.status(500).json({ error: 'Failed to submit application' });
        }
        
        // Send emails asynchronously (won't block response)
        // First fetch the mail config from database
        db.get('SELECT MAILERSEND_API_KEY, MAILERSEND_DOMAIN, COMPANY_EMAIL FROM mail_config ORDER BY id DESC LIMIT 1', [], (dbErr, mailConfig) => {
          const application = { firstName, lastName, mobileNumber, coverLetter, jobTitle, cvFilePath };
          const config = mailConfig ? { 
            apiKey: mailConfig.MAILERSEND_API_KEY, 
            domain: mailConfig.MAILERSEND_DOMAIN 
          } : null;
          sendJobApplicationEmails(application, email, config, mailConfig?.COMPANY_EMAIL);
        });
        
        res.status(201).json({ 
          success: true, 
          message: 'Application submitted successfully',
          id: this.lastID 
        });
      }
    );
  } catch (error) {
    console.error('Job application error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET all job applications (admin)
app.get('/api/job-applications', verifyJWT, (req, res) => {
  try {
    db.all('SELECT * FROM job_applications ORDER BY submittedDate DESC', [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch job applications' });
      }
      res.json(rows);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE job application (admin)
app.delete('/api/job-applications/:id', verifyJWT, (req, res) => {
  try {
    // First get the application to delete the file
    db.get('SELECT cvFilePath FROM job_applications WHERE id = ?', [req.params.id], (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete application' });
      }
      
      // Delete the file if exists
      if (row && row.cvFilePath) {
        const filePath = path.join(__dirname, 'public', row.cvFilePath);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      
      // Delete from database
      db.run('DELETE FROM job_applications WHERE id = ?', [req.params.id], function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to delete application' });
        }
        res.json({ success: true, message: 'Application deleted' });
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH job application status (admin)
app.patch('/api/job-applications/:id/status', verifyJWT, (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Validate status value
    const validStatuses = ['pending', 'reviewed', 'rejected'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value. Must be: pending, reviewed, or rejected' });
    }
    
    db.run('UPDATE job_applications SET status = ? WHERE id = ?', [status, id], function(err) {
      if (err) {
        console.error('Error updating status:', err);
        return res.status(500).json({ error: 'Failed to update status' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Application not found' });
      }
      res.json({ success: true, message: 'Status updated successfully' });
    });
  } catch (error) {
    console.error('Status update error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ========== MAIL CONFIG ENDPOINTS ==========

// Get mail config (admin only)
app.get('/api/admin/mail-config', verifyJWT, (req, res) => {
  try {
    db.get('SELECT * FROM mail_config ORDER BY id DESC LIMIT 1', [], (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch mail config' });
      }
      if (!row) {
        return res.json({
          MAILERSEND_API_KEY: '',
          MAILERSEND_DOMAIN: '',
          COMPANY_EMAIL: '',
          lastUpdated: null
        });
      }
      res.json({
        MAILERSEND_API_KEY: row.MAILERSEND_API_KEY || '',
        MAILERSEND_DOMAIN: row.MAILERSEND_DOMAIN || '',
        COMPANY_EMAIL: row.COMPANY_EMAIL || '',
        lastUpdated: row.last_updated
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save mail config (admin only)
app.post('/api/admin/mail-config', verifyJWT, async (req, res) => {
  try {
    const { MAILERSEND_API_KEY, MAILERSEND_DOMAIN, COMPANY_EMAIL } = req.body;

    if (!MAILERSEND_DOMAIN || !COMPANY_EMAIL) {
      return res.status(400).json({ error: 'Domain and company email are required' });
    }

    // Check if config exists
    db.get('SELECT id FROM mail_config ORDER BY id DESC LIMIT 1', [], async (err, existing) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to save mail config' });
      }

      const now = new Date().toISOString();

      // If existing config, update only if new API key is provided
      if (existing) {
        let updateQuery = 'UPDATE mail_config SET MAILERSEND_DOMAIN = ?, COMPANY_EMAIL = ?, last_updated = ?';
        let params = [MAILERSEND_DOMAIN, COMPANY_EMAIL, now];

        // Only update API key if a new one is provided (not empty string from masking)
        if (MAILERSEND_API_KEY && MAILERSEND_API_KEY.trim() !== '') {
          updateQuery = 'UPDATE mail_config SET MAILERSEND_API_KEY = ?, MAILERSEND_DOMAIN = ?, COMPANY_EMAIL = ?, last_updated = ?';
          params = [MAILERSEND_API_KEY, MAILERSEND_DOMAIN, COMPANY_EMAIL, now];
        }

        db.run(updateQuery, params, function(err) {
          if (err) {
            return res.status(500).json({ error: 'Failed to update mail config' });
          }
          res.json({ success: true, message: 'Mail config updated', lastUpdated: now });
        });
      } else {
        // Insert new config
        db.run(
          'INSERT INTO mail_config (MAILERSEND_API_KEY, MAILERSEND_DOMAIN, COMPANY_EMAIL, last_updated) VALUES (?, ?, ?, ?)',
          [MAILERSEND_API_KEY || '', MAILERSEND_DOMAIN, COMPANY_EMAIL, now],
          function(err) {
            if (err) {
              return res.status(500).json({ error: 'Failed to create mail config' });
            }
            res.json({ success: true, message: 'Mail config created', lastUpdated: now });
          }
        );
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Test email (admin only)
app.post('/api/admin/mail-config/test', verifyJWT, async (req, res) => {
  try {
    // Get current config
    db.get('SELECT * FROM mail_config ORDER BY id DESC LIMIT 1', [], async (err, config) => {
      if (err) {
        console.error('Database error fetching mail config:', err);
        return res.status(500).json({ message: 'Failed to retrieve mail configuration' });
      }
      
      if (!config || !config.MAILERSEND_API_KEY || !config.MAILERSEND_DOMAIN || !config.COMPANY_EMAIL) {
        return res.status(400).json({ message: 'Please configure mail settings first. API key, domain, and company email are required.' });
      }

      try {
        // Import email service
        const { sendTestEmail } = await import('./services/emailService.js');
        
        console.log('Sending test email with domain:', config.MAILERSEND_DOMAIN);
        console.log('Sending test email to:', config.COMPANY_EMAIL);
        
        const result = await sendTestEmail(config.MAILERSEND_API_KEY, config.MAILERSEND_DOMAIN, config.COMPANY_EMAIL);
        
        if (result.success) {
          res.json({ success: true, message: 'Test email sent successfully!' });
        } else {
          // The email service now returns more specific error messages
          res.status(400).json({ message: result.message || 'Failed to send test email. Please check your configuration.' });
        }
      } catch (emailError) {
        console.error('Test email error:', emailError);
        
        // Check for authentication/unauthorized errors
        const errorStr = JSON.stringify(emailError).toLowerCase();
        if (errorStr.includes('unauthorized') || errorStr.includes('401') || errorStr.includes('unauthenticated')) {
          return res.status(400).json({ message: 'Invalid or expired API key. Please update your MailerSend API key in the settings.' });
        }
        
        // Check for domain errors
        if (errorStr.includes('domain') || errorStr.includes('from address')) {
          return res.status(400).json({ message: 'Invalid domain. Please verify your MailerSend domain is correctly configured.' });
        }
        
        res.status(400).json({ message: emailError.message || 'Failed to send test email. Please check your configuration.' });
      }
    });
  } catch (error) {
    console.error('Test email endpoint error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Helper function to get subscription config path
const getSubscriptionConfigPath = () => {
  return path.join(process.cwd(), 'config', 'subscription-config.json');
};

// Ensure subscription config file exists
const ensureSubscriptionConfig = () => {
  const configPath = getSubscriptionConfigPath();
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, JSON.stringify({ rate: 50 }, null, 2));
    console.log('Created subscription-config.json with default rate: 50');
  }
};

// GET subscription config
app.get('/api/admin/subscription-config', (req, res) => {
  try {
    const configPath = getSubscriptionConfigPath();
    
    if (!fs.existsSync(configPath)) {
      return res.json({ rate: 50 });
    }
    
    const data = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    res.json({ rate: data.rate || 50 });
  } catch (error) {
    console.error('Subscription config endpoint error:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST subscription config (admin only)
app.post('/api/admin/subscription-config', verifyJWT, async (req, res) => {
  try {
    const { rate } = req.body;

    if (!rate || rate <= 0) {
      return res.status(400).json({ error: 'Rate must be greater than 0' });
    }

    const configPath = getSubscriptionConfigPath();
    const configData = { rate: parseInt(rate) };
    
    fs.writeFileSync(configPath, JSON.stringify(configData, null, 2));
    
    res.json({ success: true, message: 'Subscription config updated', rate: parseInt(rate) });
  } catch (error) {
    console.error('Subscription config POST endpoint error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET subscription status types (admin only)
app.get('/api/admin/subscription-status-types', verifyJWT, (req, res) => {
  try {
    db.all('SELECT * FROM subscription_status_types ORDER BY display_order ASC', [], (err, rows) => {
      if (err) {
        console.error('Error fetching subscription status types:', err);
        return res.status(500).json({ error: 'Failed to fetch status types' });
      }
      res.json(rows);
    });
  } catch (error) {
    console.error('Get subscription status types error:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST subscription status type (admin only)
app.post('/api/admin/subscription-status-types', verifyJWT, (req, res) => {
  try {
    const { status_name, color, display_order } = req.body;

    if (!status_name || !status_name.trim()) {
      return res.status(400).json({ error: 'Status name is required' });
    }

    // Validate color format (hex color)
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    const validColor = color && hexColorRegex.test(color) ? color : '#6b7280';

    db.run(
      'INSERT INTO subscription_status_types (status_name, color, display_order) VALUES (?, ?, ?)',
      [status_name.trim(), validColor, display_order || 0],
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE')) {
            return res.status(400).json({ error: 'Status name already exists' });
          }
          console.error('Error creating subscription status type:', err);
          return res.status(500).json({ error: 'Failed to create status type' });
        }
        res.status(201).json({
          success: true,
          id: this.lastID,
          status_name: status_name.trim(),
          color: validColor,
          display_order: display_order || 0
        });
      }
    );
  } catch (error) {
    console.error('Create subscription status type error:', error);
    res.status(500).json({ error: error.message });
  }
});

// PUT subscription status type (admin only)
app.put('/api/admin/subscription-status-types/:id', verifyJWT, (req, res) => {
  try {
    const { id } = req.params;
    const { status_name, color, display_order } = req.body;

    if (!status_name || !status_name.trim()) {
      return res.status(400).json({ error: 'Status name is required' });
    }

    // Validate color format (hex color)
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    const validColor = color && hexColorRegex.test(color) ? color : '#6b7280';

    db.run(
      'UPDATE subscription_status_types SET status_name = ?, color = ?, display_order = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [status_name.trim(), validColor, display_order || 0, id],
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE')) {
            return res.status(400).json({ error: 'Status name already exists' });
          }
          console.error('Error updating subscription status type:', err);
          return res.status(500).json({ error: 'Failed to update status type' });
        }
        if (this.changes === 0) {
          return res.status(404).json({ error: 'Status type not found' });
        }
        res.json({
          success: true,
          id: parseInt(id),
          status_name: status_name.trim(),
          color: validColor,
          display_order: display_order || 0
        });
      }
    );
  } catch (error) {
    console.error('Update subscription status type error:', error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE subscription status type (admin only)
app.delete('/api/admin/subscription-status-types/:id', verifyJWT, (req, res) => {
  try {
    const { id } = req.params;

    db.run('DELETE FROM subscription_status_types WHERE id = ?', [id], function(err) {
      if (err) {
        console.error('Error deleting subscription status type:', err);
        return res.status(500).json({ error: 'Failed to delete status type' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Status type not found' });
      }
      res.json({ success: true, message: 'Status type deleted' });
    });
  } catch (error) {
    console.error('Delete subscription status type error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Helper function to get subscriptions file path
const getSubscriptionsPath = () => {
  return path.join(process.cwd(), 'config', 'subscriptions.json');
};

// Ensure subscriptions file exists
const ensureSubscriptionsFile = () => {
  const filePath = getSubscriptionsPath();
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
    console.log('Created subscriptions.json');
  }
};

// POST subscription (public)
app.post('/api/subscription', async (req, res) => {
  try {
    const { name, companyName, email, contactNumber, message, hours, rate, totalAmount } = req.body;

    // Validation
    if (!name || !companyName || !contactNumber || !email) {
      return res.status(400).json({ message: 'Name, company name, contact number, and email are required' });
    }

    if (!hours || hours < 50) {
      return res.status(400).json({ message: 'Minimum subscription hours is 50' });
    }

    // Read existing subscriptions
    const subscriptionsPath = getSubscriptionsPath();
    let subscriptions = [];
    if (fs.existsSync(subscriptionsPath)) {
      subscriptions = JSON.parse(fs.readFileSync(subscriptionsPath, 'utf-8'));
    }

    // Add new subscription
    const newSubscription = {
      id: Date.now(),
      name,
      companyName,
      email,
      contactNumber,
      message: message || '',
      hours,
      rate,
      totalAmount,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    subscriptions.push(newSubscription);
    
    // Save to file
    fs.writeFileSync(subscriptionsPath, JSON.stringify(subscriptions, null, 2));

    // Send emails asynchronously (non-blocking)
    const { sendSubscriptionEmails } = await import('./services/emailService.js');
    sendSubscriptionEmails(newSubscription, email);

    res.status(201).json({ 
      success: true, 
      message: 'Subscription request submitted successfully',
      id: newSubscription.id
    });
  } catch (error) {
    console.error('Subscription endpoint error:', error);
    res.status(500).json({ message: error.message });
  }
});

// GET all subscriptions (admin only)
// Changed from /api/subscriptions to /api/subscription to match POST endpoint
app.get('/api/subscription', verifyJWT, (req, res) => {
  console.log('[GET] /api/subscription called - middleware passed');
  try {
    const subscriptionsPath = getSubscriptionsPath();
    console.log('Subscriptions path:', subscriptionsPath);
    console.log('File exists:', fs.existsSync(subscriptionsPath));
    
    if (!fs.existsSync(subscriptionsPath)) {
      console.log('Subscriptions file not found, returning empty array');
      return res.json([]);
    }
    
    const subscriptions = JSON.parse(fs.readFileSync(subscriptionsPath, 'utf-8'));
    console.log('Returning subscriptions:', subscriptions.length);
    res.json(subscriptions);
  } catch (error) {
    console.error('Get subscriptions endpoint error:', error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE subscription (admin only)
app.delete('/api/subscription/:id', verifyJWT, (req, res) => {
  try {
    const { id } = req.params;
    const subscriptionsPath = getSubscriptionsPath();
    
    if (!fs.existsSync(subscriptionsPath)) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    
    let subscriptions = JSON.parse(fs.readFileSync(subscriptionsPath, 'utf-8'));
    const initialLength = subscriptions.length;
    subscriptions = subscriptions.filter(sub => sub.id !== parseInt(id));
    
    if (subscriptions.length === initialLength) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    
    fs.writeFileSync(subscriptionsPath, JSON.stringify(subscriptions, null, 2));
    res.json({ success: true, message: 'Subscription deleted successfully' });
  } catch (error) {
    console.error('Delete subscription endpoint error:', error);
    res.status(500).json({ error: error.message });
  }
});

// PUT subscription status (admin only) - using /api/subscriptions (plural)
app.put('/api/subscriptions/:id/status', verifyJWT, (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    console.log("PUT /api/subscriptions/:id/status - Incoming ID:", id);
    console.log("PUT /api/subscriptions/:id/status - Incoming Status:", status);
    
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }
    
    const validStatuses = ['Pending', 'Reviewed', 'Rejected'];
    // Normalize status to title case for storage
    const normalizedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    
    if (!validStatuses.includes(normalizedStatus)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }
    
    const subscriptionsPath = getSubscriptionsPath();
    
    if (!fs.existsSync(subscriptionsPath)) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    
    let subscriptions = JSON.parse(fs.readFileSync(subscriptionsPath, 'utf-8'));
    const subscriptionIndex = subscriptions.findIndex(sub => sub.id === parseInt(id));
    
    console.log("PUT /api/subscriptions/:id/status - Subscription Index:", subscriptionIndex);
    console.log("PUT /api/subscriptions/:id/status - Available IDs:", subscriptions.map(s => s.id));
    
    if (subscriptionIndex === -1) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    
    subscriptions[subscriptionIndex].status = normalizedStatus;
    
    fs.writeFileSync(subscriptionsPath, JSON.stringify(subscriptions, null, 2));
    console.log("PUT /api/subscriptions/:id/status - Updated successfully:", subscriptions[subscriptionIndex]);
    res.json({ success: true, message: 'Subscription status updated successfully', subscription: subscriptions[subscriptionIndex] });
  } catch (error) {
    console.error('Update subscription status endpoint error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Ensure subscription config file exists
ensureSubscriptionConfig();
ensureSubscriptionsFile();

// Start server
app.listen(PORT, () => {
  console.log(`Auth server running on http://localhost:${PORT}`);
  console.log('Available API routes:');
  console.log('  POST /api/subscription');
  console.log('  GET /api/subscription');
  console.log('  DELETE /api/subscription/:id');
  console.log('  PUT /api/subscriptions/:id/status');
});
