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
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
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
app.post('/api/enquiries', (req, res) => {
  try {
    const { name, email, phone, company, service, message } = req.body;

    if (!name || !email || !phone || !company || !service || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    db.run(
      'INSERT INTO enquiries (name, email, phone, company, service, message, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, phone, company, service, message, 'new'],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to submit enquiry' });
        }
        res.status(201).json({
          success: true,
          message: 'Enquiry submitted successfully',
          enquiry: {
            id: this.lastID,
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
app.post('/api/job-applications', cvUpload.single('cv'), (req, res) => {
  try {
    const { firstName, lastName, mobileNumber, coverLetter, jobTitle } = req.body;

    if (!firstName || !lastName || !mobileNumber) {
      return res.status(400).json({ error: 'First name, last name, and mobile number are required' });
    }

    const cvFilePath = req.file ? `/uploads/cv/${req.file.filename}` : null;

    db.run(
      'INSERT INTO job_applications (firstName, lastName, mobileNumber, coverLetter, cvFilePath, jobTitle) VALUES (?, ?, ?, ?, ?, ?)',
      [firstName, lastName, mobileNumber, coverLetter || '', cvFilePath, jobTitle || ''],
      function(err) {
        if (err) {
          console.error('Error inserting job application:', err);
          return res.status(500).json({ error: 'Failed to submit application' });
        }
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

// Start server
app.listen(PORT, () => {
  console.log(`Auth server running on http://localhost:${PORT}`);
});
