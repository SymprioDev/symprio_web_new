import express from 'express';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { Mistral } from '@mistralai/mistralai';
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// PostgreSQL connection pool
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// ElevenLabs client for webhook verification
const elevenlabs = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY });

// Middleware
app.use(cors());
// Capture raw body for webhook signature verification
// Increase limit for ElevenLabs audio webhooks (base64 MP3 can be large)
app.use(express.json({
  limit: '50mb',
  verify: (req, _res, buf) => {
    if (req.url === '/api/webhooks/elevenlabs') {
      req.rawBody = buf.toString('utf-8');
    }
  }
}));

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

// Initialize database tables
async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
  console.log('Users table ready');

  await pool.query(`
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      date TEXT NOT NULL,
      location TEXT NOT NULL,
      type TEXT DEFAULT 'event',
      link TEXT,
      registration_link TEXT,
      banner_image TEXT,
      created_by INTEGER,
      created_at TIMESTAMP DEFAULT NOW(),
      FOREIGN KEY (created_by) REFERENCES users(id)
    )
  `);
  // Add columns for existing tables
  await pool.query(`ALTER TABLE events ADD COLUMN IF NOT EXISTS registration_link TEXT`);
  await pool.query(`ALTER TABLE events ADD COLUMN IF NOT EXISTS banner_image TEXT`);
  console.log('Events table ready');

  await pool.query(`
    CREATE TABLE IF NOT EXISTS trainings (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      date TEXT NOT NULL,
      duration TEXT NOT NULL,
      instructor TEXT NOT NULL,
      capacity INTEGER DEFAULT 50,
      enrolled INTEGER DEFAULT 0,
      link TEXT,
      created_by INTEGER,
      created_at TIMESTAMP DEFAULT NOW(),
      FOREIGN KEY (created_by) REFERENCES users(id)
    )
  `);
  console.log('Trainings table ready');

  await pool.query(`
    CREATE TABLE IF NOT EXISTS jobs (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      department TEXT NOT NULL,
      type TEXT NOT NULL,
      description TEXT NOT NULL,
      location TEXT DEFAULT 'Remote',
      status TEXT DEFAULT 'active',
      created_by INTEGER,
      created_at TIMESTAMP DEFAULT NOW(),
      FOREIGN KEY (created_by) REFERENCES users(id)
    )
  `);
  console.log('Jobs table ready');

  // Seed default jobs if table is empty
  const { rows: jobCountRows } = await pool.query('SELECT COUNT(*) as count FROM jobs');
  if (parseInt(jobCountRows[0].count) === 0) {
    const seedJobs = [
      ['Senior RPA Developer', 'Engineering', 'Full-time', 'Design and deploy enterprise RPA solutions using UiPath and Power Automate. Lead bot development, testing, and go-live support.', 'Kuala Lumpur, Malaysia'],
      ['AI Solution Architect', 'Consulting', 'Full-time', 'Architect AI-powered applications including chatbots, RAG systems, and LLM pipelines for enterprise clients.', 'Singapore / Remote'],
      ['Oracle Cloud Consultant', 'Consulting', 'Contract', 'Lead Oracle Cloud ERP implementations and migrations for APAC and Middle East clients.', 'India'],
      ['Business Development Manager', 'Sales', 'Full-time', 'Drive new business in APAC by identifying prospects and closing AI & automation deals.', 'Kuala Lumpur, Malaysia'],
      ['Digital Marketing Specialist', 'Marketing', 'Full-time', "Own Symprio's digital presence across LinkedIn, Google, and content channels.", 'Remote'],
      ['UiPath RPA Trainer', 'Consulting', 'Contract', 'Deliver hands-on UiPath and Power Automate training to enterprise clients across APAC.', 'Remote / On-site']
    ];
    for (const j of seedJobs) {
      await pool.query(
        'INSERT INTO jobs (title, department, type, description, location, status) VALUES ($1, $2, $3, $4, $5, $6)',
        [...j, 'active']
      );
    }
    console.log('Seeded 6 default jobs');
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      company TEXT NOT NULL,
      service TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'new',
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
  console.log('Enquiries table ready');

  await pool.query(`
    CREATE TABLE IF NOT EXISTS locations (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      image_url TEXT,
      created_by INTEGER,
      created_at TIMESTAMP DEFAULT NOW(),
      FOREIGN KEY (created_by) REFERENCES users(id)
    )
  `);
  console.log('Locations table ready');

  await pool.query(`
    CREATE TABLE IF NOT EXISTS job_applications (
      id SERIAL PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      mobile_number TEXT NOT NULL,
      email TEXT,
      cover_letter TEXT,
      cv_file_path TEXT,
      job_title TEXT,
      status TEXT DEFAULT 'pending',
      submitted_date TIMESTAMP DEFAULT NOW()
    )
  `);
  console.log('Job applications table ready');

  await pool.query('CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status)');
  await pool.query('CREATE INDEX IF NOT EXISTS idx_job_applications_job_title ON job_applications(job_title)');
  await pool.query('CREATE INDEX IF NOT EXISTS idx_job_applications_submitted_date ON job_applications(submitted_date)');

  // Mail Configuration table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS mail_config (
      id SERIAL PRIMARY KEY,
      mailersend_api_key TEXT,
      mailersend_domain TEXT,
      company_email TEXT,
      last_updated TIMESTAMP DEFAULT NOW()
    )
  `);
  console.log('Mail config table ready');

  // Subscription config table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS subscription_config (
      id SERIAL PRIMARY KEY,
      rate INTEGER DEFAULT 50,
      last_updated TIMESTAMP DEFAULT NOW()
    )
  `);
  // Insert default rate if not exists
  await pool.query('INSERT INTO subscription_config (id, rate) VALUES (1, 50) ON CONFLICT DO NOTHING');
  console.log('Subscription config table ready');

  // Subscriptions table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS subscriptions (
      id SERIAL PRIMARY KEY,
      name TEXT,
      company_name TEXT,
      email TEXT,
      contact_number TEXT,
      message TEXT,
      hours INTEGER,
      rate INTEGER,
      total_amount INTEGER,
      status TEXT DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
  console.log('Subscriptions table ready');

  await pool.query('CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status)');
  await pool.query('CREATE INDEX IF NOT EXISTS idx_subscriptions_created_at ON subscriptions(created_at)');

  await pool.query(`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      source TEXT DEFAULT 'footer',
      status TEXT DEFAULT 'active',
      subscribed_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `);
  console.log('Newsletter subscribers table ready');

  await pool.query('CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status ON newsletter_subscribers(status)');
  await pool.query('CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_subscribed_at ON newsletter_subscribers(subscribed_at)');

  // Subscription Status Types table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS subscription_status_types (
      id SERIAL PRIMARY KEY,
      status_name TEXT NOT NULL UNIQUE,
      color TEXT NOT NULL DEFAULT '#6b7280',
      display_order INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `);
  console.log('Subscription status types table ready');

  // Insert default status types if table is empty
  const { rows: statusCountRows } = await pool.query('SELECT COUNT(*) as count FROM subscription_status_types');
  if (parseInt(statusCountRows[0].count) === 0) {
    const defaultStatuses = [
      { name: 'Pending', color: '#f59e0b', order: 1 },
      { name: 'Reviewed', color: '#10b981', order: 2 },
      { name: 'Approved', color: '#3b82f6', order: 3 },
      { name: 'Rejected', color: '#ef4444', order: 4 }
    ];
    for (const status of defaultStatuses) {
      await pool.query(
        'INSERT INTO subscription_status_types (status_name, color, display_order) VALUES ($1, $2, $3)',
        [status.name, status.color, status.order]
      );
    }
    console.log('Default subscription status types created');
  }

  // AI Conversations table (ElevenLabs webhook data)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS ai_conversations (
      id SERIAL PRIMARY KEY,
      conversation_id TEXT UNIQUE,
      agent_id TEXT,
      status TEXT DEFAULT 'completed',
      transcript TEXT,
      summary TEXT,
      user_language TEXT,
      duration_seconds INTEGER DEFAULT 0,
      audio_url TEXT,
      metadata JSONB DEFAULT '{}',
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
  // Add audio_url column if it doesn't exist (for existing tables)
  await pool.query(`ALTER TABLE ai_conversations ADD COLUMN IF NOT EXISTS audio_url TEXT`);
  console.log('AI Conversations table ready');

  // Client Stories table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS client_stories (
      id SERIAL PRIMARY KEY,
      client_name TEXT NOT NULL,
      company TEXT NOT NULL,
      role TEXT NOT NULL,
      quote TEXT NOT NULL,
      avatar_url TEXT,
      rating INTEGER DEFAULT 5,
      industry TEXT,
      is_active INTEGER DEFAULT 1,
      created_by INTEGER,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
  console.log('Client Stories table ready');
}

// Initialize database on startup
initializeDatabase()
  .then(() => console.log('Database initialized'))
  .catch(err => console.error('Database initialization error:', err));

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validation
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    // Only allow @symprio.com email addresses
    if (!email.toLowerCase().endsWith('@symprio.com')) {
      return res.status(403).json({ error: 'Registration is restricted to @symprio.com email addresses only' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const result = await pool.query(
      'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id',
      [email, hashedPassword, name]
    );

    const userId = result.rows[0].id;

    // Generate JWT
    const token = jwt.sign({ id: userId, email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({
      success: true,
      token,
      user: { id: userId, email, name }
    });
  } catch (error) {
    if (error.code === '23505') { // unique_violation
      return res.status(400).json({ error: 'Email already registered' });
    }
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = rows[0];

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
app.get('/api/auth/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const { rows } = await pool.query('SELECT id, email, name, created_at FROM users WHERE id = $1', [decoded.id]);
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
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
app.get('/api/events', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM events ORDER BY date DESC');
    res.json(rows || []);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Generate hybrid event banner: Mistral AI background + Canvas text overlay
async function generateEventBanner(eventId, title, description, date, location) {
  const { createCanvas, loadImage } = await import('canvas');
  const bannerDir = path.join(__dirname, 'public', 'uploads', 'event-banners');
  if (!fs.existsSync(bannerDir)) fs.mkdirSync(bannerDir, { recursive: true });
  const bannerFile = `event_${eventId}.png`;
  const bannerPath = path.join(bannerDir, bannerFile);
  const bannerUrl = `/uploads/event-banners/${bannerFile}`;

  const WIDTH = 1200;
  const HEIGHT = 630;

  try {
    // Step 1: Generate AI background with Mistral
    let bgBuffer = null;
    if (process.env.MISTRAL_API_KEY) {
      try {
        const mistralImg = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });
        const agent = await mistralImg.beta.agents.create({
          model: 'mistral-medium-latest',
          name: 'Banner BG',
          instructions: 'Generate abstract, cinematic background images for tech event banners. No text. Use dramatic lighting, bokeh, particles, geometric shapes, and rich color gradients.',
          tools: [{ type: 'image_generation' }],
          completionArgs: { temperature: 0.5, topP: 0.95 }
        });

        const prompt = `Create an abstract cinematic background for a "${title}" event. Style: dramatic lighting with golden/warm particles and bokeh effects, deep navy blue to teal gradient, floating geometric shapes, lens flares, premium feel. Absolutely NO text or letters.`;

        const conversation = await mistralImg.beta.conversations.start({
          agentId: agent.id,
          inputs: prompt
        });

        let fileId = null;
        if (conversation.outputs) {
          for (const output of conversation.outputs) {
            if (output.type === 'message.output' && output.content) {
              for (const chunk of output.content) {
                if (chunk.type === 'tool_file' && chunk.fileId) {
                  fileId = chunk.fileId;
                  break;
                }
              }
            }
            if (fileId) break;
          }
        }

        if (fileId) {
          const fileStream = await mistralImg.files.download({ fileId });
          const chunks = [];
          for await (const chunk of fileStream) {
            chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
          }
          bgBuffer = Buffer.concat(chunks);
          console.log('[EventBanner] AI background generated');
        }
        try { await mistralImg.beta.agents.delete({ agentId: agent.id }); } catch (e) {}
      } catch (aiErr) {
        console.warn('[EventBanner] AI background failed:', aiErr.message);
      }
    }

    // Step 2: Create canvas and composite
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext('2d');

    // Draw AI background or fallback gradient
    if (bgBuffer) {
      try {
        const bgImg = await loadImage(bgBuffer);
        // Cover-fit the AI image
        const scale = Math.max(WIDTH / bgImg.width, HEIGHT / bgImg.height);
        const sw = WIDTH / scale;
        const sh = HEIGHT / scale;
        const sx = (bgImg.width - sw) / 2;
        const sy = (bgImg.height - sh) / 2;
        ctx.drawImage(bgImg, sx, sy, sw, sh, 0, 0, WIDTH, HEIGHT);
      } catch (imgErr) {
        console.warn('[EventBanner] Failed to load AI image, using fallback');
        bgBuffer = null;
      }
    }

    if (!bgBuffer) {
      // Fallback: rich gradient background
      const grad = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
      grad.addColorStop(0, '#010B1D');
      grad.addColorStop(0.4, '#0A1E3F');
      grad.addColorStop(0.7, '#112D5A');
      grad.addColorStop(1, '#0D3B4F');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      // Add particle dots
      for (let i = 0; i < 80; i++) {
        const x = Math.random() * WIDTH;
        const y = Math.random() * HEIGHT;
        const r = Math.random() * 3 + 0.5;
        const alpha = Math.random() * 0.5 + 0.1;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 100, ${alpha})`;
        ctx.fill();
      }

      // Add subtle geometric shapes
      ctx.strokeStyle = 'rgba(24, 90, 219, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        const cx = Math.random() * WIDTH;
        const cy = Math.random() * HEIGHT;
        const size = Math.random() * 120 + 40;
        ctx.beginPath();
        ctx.arc(cx, cy, size, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // Step 3: Dark overlay for text readability
    const overlay = ctx.createLinearGradient(0, 0, 0, HEIGHT);
    overlay.addColorStop(0, 'rgba(1, 11, 29, 0.3)');
    overlay.addColorStop(0.4, 'rgba(1, 11, 29, 0.5)');
    overlay.addColorStop(0.7, 'rgba(1, 11, 29, 0.7)');
    overlay.addColorStop(1, 'rgba(1, 11, 29, 0.85)');
    ctx.fillStyle = overlay;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Step 4: Accent line at top
    const accentGrad = ctx.createLinearGradient(0, 0, WIDTH, 0);
    accentGrad.addColorStop(0, '#185ADB');
    accentGrad.addColorStop(0.5, '#0D9488');
    accentGrad.addColorStop(1, '#185ADB');
    ctx.fillStyle = accentGrad;
    ctx.fillRect(0, 0, WIDTH, 5);

    // Step 5: "SYMPRIO PRESENTS" tag
    ctx.font = '600 14px "Arial"';
    ctx.fillStyle = '#0D9488';
    ctx.letterSpacing = '4px';
    const tagText = 'SYMPRIO PRESENTS';
    ctx.fillText(tagText, 60, 80);

    // Accent dot before tag
    ctx.beginPath();
    ctx.arc(48, 76, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#185ADB';
    ctx.fill();

    // Step 6: Event title (large, bold)
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 52px "Arial"';
    // Word wrap title
    const words = title.split(' ');
    let lines = [];
    let currentLine = '';
    const maxWidth = WIDTH - 120;
    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine);

    let titleY = 140;
    for (const line of lines) {
      ctx.fillText(line, 60, titleY);
      titleY += 64;
    }

    // Step 7: Description (truncated, smaller)
    const descY = titleY + 20;
    ctx.font = '400 18px "Arial"';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    const descTruncated = description.length > 140 ? description.substring(0, 140) + '...' : description;
    // Word wrap description
    const descWords = descTruncated.split(' ');
    let descLines = [];
    let descLine = '';
    for (const word of descWords) {
      const testLine = descLine ? `${descLine} ${word}` : word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && descLine) {
        descLines.push(descLine);
        descLine = word;
      } else {
        descLine = testLine;
      }
    }
    descLines.push(descLine);
    // Max 3 lines
    descLines = descLines.slice(0, 3);

    let dy = descY;
    for (const line of descLines) {
      ctx.fillText(line, 60, dy);
      dy += 26;
    }

    // Step 8: Date & Location bar at bottom
    const barY = HEIGHT - 100;

    // Date box
    ctx.fillStyle = 'rgba(24, 90, 219, 0.9)';
    roundRect(ctx, 60, barY, 220, 50, 8);
    ctx.fill();
    ctx.font = 'bold 16px "Arial"';
    ctx.fillStyle = '#FFFFFF';
    // Calendar icon text
    ctx.fillText(`📅  ${date}`, 78, barY + 32);

    // Location box
    ctx.fillStyle = 'rgba(13, 148, 136, 0.9)';
    roundRect(ctx, 300, barY, 280, 50, 8);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(`📍  ${location}`, 318, barY + 32);

    // Step 9: "Register Now" CTA
    const ctaGrad = ctx.createLinearGradient(WIDTH - 260, barY, WIDTH - 60, barY + 50);
    ctaGrad.addColorStop(0, '#185ADB');
    ctaGrad.addColorStop(1, '#0D9488');
    ctx.fillStyle = ctaGrad;
    roundRect(ctx, WIDTH - 260, barY, 200, 50, 25);
    ctx.fill();
    ctx.font = 'bold 16px "Arial"';
    ctx.fillStyle = '#FFFFFF';
    const ctaText = 'Register Now →';
    const ctaWidth = ctx.measureText(ctaText).width;
    ctx.fillText(ctaText, WIDTH - 260 + (200 - ctaWidth) / 2, barY + 32);

    // Step 10: Symprio logo/watermark bottom right
    ctx.font = '600 13px "Arial"';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fillText('symprio.com', WIDTH - 130, HEIGHT - 20);

    // Save
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(bannerPath, buffer);
    console.log('[EventBanner] Hybrid banner generated:', bannerUrl, `(${(buffer.length / 1024).toFixed(0)}KB)`);
    return bannerUrl;

  } catch (error) {
    console.error('[EventBanner] Generation error:', error.message);

    // Ultimate fallback: simple gradient banner
    try {
      const canvas = createCanvas(WIDTH, HEIGHT);
      const ctx = canvas.getContext('2d');
      const grad = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
      grad.addColorStop(0, '#010B1D');
      grad.addColorStop(1, '#185ADB');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 48px "Arial"';
      ctx.fillText(title, 60, HEIGHT / 2);
      ctx.font = '20px "Arial"';
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.fillText(`${date}  •  ${location}`, 60, HEIGHT / 2 + 50);
      const buffer = canvas.toBuffer('image/png');
      fs.writeFileSync(bannerPath, buffer);
      console.log('[EventBanner] Fallback banner generated');
      return bannerUrl;
    } catch (fbErr) {
      console.error('[EventBanner] Fallback also failed:', fbErr.message);
      return null;
    }
  }
}

// Helper: rounded rectangle
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// Add new event (admin only)
app.post('/api/events', verifyJWT, async (req, res) => {
  try {
    const { title, description, date, location, type, link, registration_link } = req.body;

    if (!title || !description || !date || !location) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await pool.query(
      'INSERT INTO events (title, description, date, location, type, link, registration_link, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      [title, description, date, location, type || 'event', link || null, registration_link || null, req.user.id]
    );

    const eventId = result.rows[0].id;

    // Generate banner image in background
    generateEventBanner(eventId, title, description, date, location).then(async (bannerUrl) => {
      if (bannerUrl) {
        await pool.query('UPDATE events SET banner_image = $1 WHERE id = $2', [bannerUrl, eventId]);
      }
    });

    res.status(201).json({
      success: true,
      event: {
        id: eventId,
        title,
        description,
        date,
        location,
        type: type || 'event',
        link: link || null,
        registration_link: registration_link || null,
        banner_image: null // Will be generated async
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete event (admin only)
app.delete('/api/events/:id', verifyJWT, async (req, res) => {
  try {
    await pool.query('DELETE FROM events WHERE id = $1 AND created_by = $2', [req.params.id, req.user.id]);
    res.json({ success: true, message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Regenerate event banner (admin only)
app.post('/api/events/:id/regenerate-banner', verifyJWT, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM events WHERE id = $1', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Event not found' });
    const event = rows[0];
    const bannerUrl = await generateEventBanner(event.id, event.title, event.description, event.date, event.location);
    if (bannerUrl) {
      await pool.query('UPDATE events SET banner_image = $1 WHERE id = $2', [bannerUrl, event.id]);
      res.json({ success: true, banner_image: bannerUrl });
    } else {
      res.status(500).json({ error: 'Banner generation failed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== TRAININGS ENDPOINTS ==========

// Get all trainings
app.get('/api/trainings', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM trainings ORDER BY date DESC');
    res.json(rows || []);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Add new training (admin only)
app.post('/api/trainings', verifyJWT, async (req, res) => {
  try {
    const { title, description, date, duration, instructor, capacity, link } = req.body;

    if (!title || !description || !date || !duration || !instructor) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await pool.query(
      'INSERT INTO trainings (title, description, date, duration, instructor, capacity, link, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      [title, description, date, duration, instructor, capacity || 50, link || null, req.user.id]
    );

    res.status(201).json({
      success: true,
      training: {
        id: result.rows[0].id,
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete training (admin only)
app.delete('/api/trainings/:id', verifyJWT, async (req, res) => {
  try {
    await pool.query('DELETE FROM trainings WHERE id = $1 AND created_by = $2', [req.params.id, req.user.id]);
    res.json({ success: true, message: 'Training deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== JOBS ENDPOINTS ==========

// Get all active jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM jobs WHERE status = 'active' ORDER BY created_at DESC");
    res.json(rows || []);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Post new job (admin only)
app.post('/api/jobs', verifyJWT, async (req, res) => {
  try {
    const { title, department, type, description, location } = req.body;

    if (!title || !department || !type || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await pool.query(
      'INSERT INTO jobs (title, department, type, description, location, status, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      [title, department, type, description, location || 'Remote', 'active', req.user.id]
    );

    res.status(201).json({
      success: true,
      job: {
        id: result.rows[0].id,
        title,
        department,
        type,
        description,
        location: location || 'Remote',
        status: 'active'
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete job (admin only)
app.delete('/api/jobs/:id', verifyJWT, async (req, res) => {
  try {
    await pool.query('DELETE FROM jobs WHERE id = $1 AND created_by = $2', [req.params.id, req.user.id]);
    res.json({ success: true, message: 'Job deleted' });
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

    const result = await pool.query(
      'INSERT INTO enquiries (name, email, phone, company, service, message, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      [name, email, phone, company, service, message, 'new']
    );

    const enquiryId = result.rows[0].id;

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
      const { rows: mailRows } = await pool.query('SELECT mailersend_api_key, mailersend_domain, company_email FROM mail_config ORDER BY id DESC LIMIT 1');
      const mailConfig = mailRows[0];
      if (mailConfig) {
        sendEnquiryEmails(enquiryData, { apiKey: mailConfig.mailersend_api_key, domain: mailConfig.mailersend_domain }, mailConfig.company_email);
      }
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all enquiries (admin only)
app.get('/api/enquiries', verifyJWT, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM enquiries ORDER BY created_at DESC');
    res.json({ enquiries: rows || [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update enquiry status (admin only)
app.patch('/api/enquiries/:id', verifyJWT, async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    await pool.query('UPDATE enquiries SET status = $1 WHERE id = $2', [status, req.params.id]);
    res.json({ success: true, message: 'Enquiry status updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete enquiry (admin only)
app.delete('/api/enquiries/:id', verifyJWT, async (req, res) => {
  try {
    await pool.query('DELETE FROM enquiries WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Enquiry deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== LOCATIONS ENDPOINTS ==========

// Get all locations (public)
app.get('/api/locations', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM locations ORDER BY created_at DESC');
    res.json(rows || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});

// Add new location (admin only)
app.post('/api/locations', verifyJWT, upload.single('image'), async (req, res) => {
  try {
    const { name, address, phone, email, imageUrl } = req.body;
    const filePath = req.file ? `/uploads/${req.file.filename}` : null;
    const finalImageUrl = filePath || (imageUrl ? imageUrl.trim() : null);

    if (!name || !address || !phone) {
      return res.status(400).json({ error: 'Name, address, and phone are required' });
    }

    const result = await pool.query(
      'INSERT INTO locations (name, address, phone, email, image_url, created_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [name, address, phone, email || null, finalImageUrl, req.user.id]
    );

    res.status(201).json({
      success: true,
      location: {
        id: result.rows[0].id,
        name,
        address,
        phone,
        email: email || null,
        image_url: finalImageUrl
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete location (admin only)
app.delete('/api/locations/:id', verifyJWT, async (req, res) => {
  try {
    await pool.query('DELETE FROM locations WHERE id = $1 AND created_by = $2', [req.params.id, req.user.id]);
    res.json({ success: true, message: 'Location deleted' });
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

    const result = await pool.query(
      'INSERT INTO job_applications (first_name, last_name, mobile_number, email, cover_letter, cv_file_path, job_title) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      [firstName, lastName, mobileNumber, email, coverLetter || '', cvFilePath, jobTitle || '']
    );

    const applicationId = result.rows[0].id;

    // Send emails asynchronously (won't block response)
    // First fetch the mail config from database
    try {
      const { rows: mailRows } = await pool.query('SELECT mailersend_api_key, mailersend_domain, company_email FROM mail_config ORDER BY id DESC LIMIT 1');
      const mailConfig = mailRows[0];
      const application = { firstName, lastName, mobileNumber, coverLetter, jobTitle, cvFilePath };
      const config = mailConfig ? {
        apiKey: mailConfig.mailersend_api_key,
        domain: mailConfig.mailersend_domain
      } : null;
      sendJobApplicationEmails(application, email, config, mailConfig?.company_email);
    } catch (emailErr) {
      console.error('Email sending error:', emailErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      id: applicationId
    });
  } catch (error) {
    console.error('Job application error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET all job applications (admin)
app.get('/api/job-applications', verifyJWT, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id,
              first_name AS "firstName",
              last_name AS "lastName",
              mobile_number AS "mobileNumber",
              email,
              cover_letter AS "coverLetter",
              cv_file_path AS "cvFilePath",
              job_title AS "jobTitle",
              status,
              submitted_date AS "submittedDate"
       FROM job_applications ORDER BY submitted_date DESC`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE job application (admin)
app.delete('/api/job-applications/:id', verifyJWT, async (req, res) => {
  try {
    // First get the application to delete the file
    const { rows } = await pool.query('SELECT cv_file_path FROM job_applications WHERE id = $1', [req.params.id]);
    const row = rows[0];

    // Delete the file if exists
    if (row && row.cv_file_path) {
      const filePath = path.join(__dirname, 'public', row.cv_file_path);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Delete from database
    await pool.query('DELETE FROM job_applications WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Application deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH job application status (admin)
app.patch('/api/job-applications/:id/status', verifyJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status value
    const validStatuses = ['pending', 'reviewed', 'rejected'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value. Must be: pending, reviewed, or rejected' });
    }

    const result = await pool.query('UPDATE job_applications SET status = $1 WHERE id = $2', [status, id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json({ success: true, message: 'Status updated successfully' });
  } catch (error) {
    console.error('Status update error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ========== MAIL CONFIG ENDPOINTS ==========

// Get mail config (admin only)
app.get('/api/admin/mail-config', verifyJWT, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM mail_config ORDER BY id DESC LIMIT 1');
    const row = rows[0];

    if (!row) {
      return res.json({
        MAILERSEND_API_KEY: '',
        MAILERSEND_DOMAIN: '',
        COMPANY_EMAIL: '',
        lastUpdated: null
      });
    }
    res.json({
      MAILERSEND_API_KEY: row.mailersend_api_key || '',
      MAILERSEND_DOMAIN: row.mailersend_domain || '',
      COMPANY_EMAIL: row.company_email || '',
      lastUpdated: row.last_updated
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
    const { rows: existingRows } = await pool.query('SELECT id FROM mail_config ORDER BY id DESC LIMIT 1');
    const existing = existingRows[0];

    const now = new Date().toISOString();

    if (existing) {
      // Only update API key if a new one is provided (not empty string from masking)
      if (MAILERSEND_API_KEY && MAILERSEND_API_KEY.trim() !== '') {
        await pool.query(
          'UPDATE mail_config SET mailersend_api_key = $1, mailersend_domain = $2, company_email = $3, last_updated = $4 WHERE id = $5',
          [MAILERSEND_API_KEY, MAILERSEND_DOMAIN, COMPANY_EMAIL, now, existing.id]
        );
      } else {
        await pool.query(
          'UPDATE mail_config SET mailersend_domain = $1, company_email = $2, last_updated = $3 WHERE id = $4',
          [MAILERSEND_DOMAIN, COMPANY_EMAIL, now, existing.id]
        );
      }
      res.json({ success: true, message: 'Mail config updated', lastUpdated: now });
    } else {
      // Insert new config
      await pool.query(
        'INSERT INTO mail_config (mailersend_api_key, mailersend_domain, company_email, last_updated) VALUES ($1, $2, $3, $4)',
        [MAILERSEND_API_KEY || '', MAILERSEND_DOMAIN, COMPANY_EMAIL, now]
      );
      res.json({ success: true, message: 'Mail config created', lastUpdated: now });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Test email (admin only)
app.post('/api/admin/mail-config/test', verifyJWT, async (req, res) => {
  try {
    // Get current config
    const { rows } = await pool.query('SELECT * FROM mail_config ORDER BY id DESC LIMIT 1');
    const config = rows[0];

    if (!config || !config.mailersend_api_key || !config.mailersend_domain || !config.company_email) {
      return res.status(400).json({ message: 'Please configure mail settings first. API key, domain, and company email are required.' });
    }

    try {
      // Import email service
      const { sendTestEmail } = await import('./services/emailService.js');

      console.log('Sending test email with domain:', config.mailersend_domain);
      console.log('Sending test email to:', config.company_email);

      const result = await sendTestEmail(config.mailersend_api_key, config.mailersend_domain, config.company_email);

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
  } catch (error) {
    console.error('Test email endpoint error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET subscription config
app.get('/api/admin/subscription-config', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT rate FROM subscription_config ORDER BY id ASC LIMIT 1');
    const row = rows[0];
    res.json({ rate: row ? row.rate : 50 });
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

    const parsedRate = parseInt(rate);

    // Upsert: update existing row or insert
    const { rows: existingRows } = await pool.query('SELECT id FROM subscription_config ORDER BY id ASC LIMIT 1');
    if (existingRows.length > 0) {
      await pool.query('UPDATE subscription_config SET rate = $1, last_updated = NOW() WHERE id = $2', [parsedRate, existingRows[0].id]);
    } else {
      await pool.query('INSERT INTO subscription_config (rate) VALUES ($1)', [parsedRate]);
    }

    res.json({ success: true, message: 'Subscription config updated', rate: parsedRate });
  } catch (error) {
    console.error('Subscription config POST endpoint error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET subscription status types (admin only)
app.get('/api/admin/subscription-status-types', verifyJWT, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM subscription_status_types ORDER BY display_order ASC');
    res.json(rows);
  } catch (error) {
    console.error('Get subscription status types error:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST subscription status type (admin only)
app.post('/api/admin/subscription-status-types', verifyJWT, async (req, res) => {
  try {
    const { status_name, color, display_order } = req.body;

    if (!status_name || !status_name.trim()) {
      return res.status(400).json({ error: 'Status name is required' });
    }

    // Validate color format (hex color)
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    const validColor = color && hexColorRegex.test(color) ? color : '#6b7280';

    const result = await pool.query(
      'INSERT INTO subscription_status_types (status_name, color, display_order) VALUES ($1, $2, $3) RETURNING id',
      [status_name.trim(), validColor, display_order || 0]
    );

    res.status(201).json({
      success: true,
      id: result.rows[0].id,
      status_name: status_name.trim(),
      color: validColor,
      display_order: display_order || 0
    });
  } catch (error) {
    if (error.code === '23505') { // unique_violation
      return res.status(400).json({ error: 'Status name already exists' });
    }
    console.error('Create subscription status type error:', error);
    res.status(500).json({ error: error.message });
  }
});

// PUT subscription status type (admin only)
app.put('/api/admin/subscription-status-types/:id', verifyJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const { status_name, color, display_order } = req.body;

    if (!status_name || !status_name.trim()) {
      return res.status(400).json({ error: 'Status name is required' });
    }

    // Validate color format (hex color)
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    const validColor = color && hexColorRegex.test(color) ? color : '#6b7280';

    const result = await pool.query(
      'UPDATE subscription_status_types SET status_name = $1, color = $2, display_order = $3, updated_at = NOW() WHERE id = $4',
      [status_name.trim(), validColor, display_order || 0, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Status type not found' });
    }
    res.json({
      success: true,
      id: parseInt(id),
      status_name: status_name.trim(),
      color: validColor,
      display_order: display_order || 0
    });
  } catch (error) {
    if (error.code === '23505') { // unique_violation
      return res.status(400).json({ error: 'Status name already exists' });
    }
    console.error('Update subscription status type error:', error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE subscription status type (admin only)
app.delete('/api/admin/subscription-status-types/:id', verifyJWT, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM subscription_status_types WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Status type not found' });
    }
    res.json({ success: true, message: 'Status type deleted' });
  } catch (error) {
    console.error('Delete subscription status type error:', error);
    res.status(500).json({ error: error.message });
  }
});

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

    const result = await pool.query(
      'INSERT INTO subscriptions (name, company_name, email, contact_number, message, hours, rate, total_amount, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      [name, companyName, email, contactNumber, message || '', hours, rate, totalAmount, 'pending']
    );

    const newId = result.rows[0].id;

    // Send emails asynchronously (non-blocking)
    try {
      const { sendSubscriptionEmails } = await import('./services/emailService.js');
      const { rows: mailRows } = await pool.query('SELECT mailersend_api_key, mailersend_domain, company_email FROM mail_config ORDER BY id DESC LIMIT 1');
      const mailConfig = mailRows[0];
      if (mailConfig) {
        sendSubscriptionEmails({ id: newId, name, companyName, email, contactNumber, message: message || '', hours, rate, totalAmount, status: 'pending' }, email, { apiKey: mailConfig.mailersend_api_key, domain: mailConfig.mailersend_domain }, mailConfig.company_email);
      }
    } catch (emailErr) {
      console.error('Subscription email error:', emailErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Subscription request submitted successfully',
      id: newId
    });
  } catch (error) {
    console.error('Subscription endpoint error:', error);
    res.status(500).json({ message: error.message });
  }
});

// POST newsletter subscriber (public)
app.post('/api/newsletter-subscribers', async (req, res) => {
  try {
    const email = (req.body.email || '').trim().toLowerCase();
    const source = (req.body.source || 'footer').trim() || 'footer';

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    const { rows } = await pool.query(
      `INSERT INTO newsletter_subscribers (email, source, status)
       VALUES ($1, $2, 'active')
       ON CONFLICT (email)
       DO UPDATE SET
         source = EXCLUDED.source,
         status = 'active',
         updated_at = NOW()
       RETURNING id, email, source, status, subscribed_at, updated_at`,
      [email, source]
    );

    res.status(201).json({
      success: true,
      message: 'Subscribed successfully',
      subscriber: rows[0]
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ message: 'Failed to subscribe. Please try again.' });
  }
});

// GET newsletter subscribers (admin only)
app.get('/api/admin/newsletter-subscribers', verifyJWT, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, email, source, status, subscribed_at, updated_at
       FROM newsletter_subscribers
       ORDER BY subscribed_at DESC`
    );
    res.json(rows || []);
  } catch (error) {
    console.error('Get newsletter subscribers error:', error);
    res.status(500).json({ message: 'Failed to fetch newsletter subscribers' });
  }
});

// PATCH newsletter subscriber status (admin only)
app.patch('/api/admin/newsletter-subscribers/:id/status', verifyJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const status = (req.body.status || '').trim().toLowerCase();
    const allowedStatuses = ['active', 'unsubscribed'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const { rows } = await pool.query(
      `UPDATE newsletter_subscribers
       SET status = $1, updated_at = NOW()
       WHERE id = $2
       RETURNING id, email, source, status, subscribed_at, updated_at`,
      [status, id]
    );

    if (!rows.length) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }

    res.json({ success: true, subscriber: rows[0] });
  } catch (error) {
    console.error('Update newsletter subscriber status error:', error);
    res.status(500).json({ message: 'Failed to update subscriber status' });
  }
});

// DELETE newsletter subscriber (admin only)
app.delete('/api/admin/newsletter-subscribers/:id', verifyJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM newsletter_subscribers WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Delete newsletter subscriber error:', error);
    res.status(500).json({ message: 'Failed to delete subscriber' });
  }
});

// GET all subscriptions (admin only)
app.get('/api/subscription', verifyJWT, async (req, res) => {
  console.log('[GET] /api/subscription called - middleware passed');
  try {
    const { rows } = await pool.query(
      `SELECT id,
              name,
              company_name AS "companyName",
              email,
              contact_number AS "contactNumber",
              message,
              hours,
              rate,
              total_amount AS "totalAmount",
              status,
              created_at AS "createdAt"
       FROM subscriptions ORDER BY created_at DESC`
    );
    console.log('Returning subscriptions:', rows.length);
    res.json(rows);
  } catch (error) {
    console.error('Get subscriptions endpoint error:', error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE subscription (admin only)
app.delete('/api/subscription/:id', verifyJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM subscriptions WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    res.json({ success: true, message: 'Subscription deleted successfully' });
  } catch (error) {
    console.error('Delete subscription endpoint error:', error);
    res.status(500).json({ error: error.message });
  }
});

// PUT subscription status (admin only) - using /api/subscriptions (plural)
app.put('/api/subscriptions/:id/status', verifyJWT, async (req, res) => {
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

    const result = await pool.query('UPDATE subscriptions SET status = $1 WHERE id = $2', [normalizedStatus, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    // Fetch updated subscription to return
    const { rows } = await pool.query(
      `SELECT id,
              name,
              company_name AS "companyName",
              email,
              contact_number AS "contactNumber",
              message,
              hours,
              rate,
              total_amount AS "totalAmount",
              status,
              created_at AS "createdAt"
       FROM subscriptions WHERE id = $1`,
      [id]
    );

    console.log("PUT /api/subscriptions/:id/status - Updated successfully:", rows[0]);
    res.json({ success: true, message: 'Subscription status updated successfully', subscription: rows[0] });
  } catch (error) {
    console.error('Update subscription status endpoint error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing pool...');
  pool.end();
});
process.on('SIGINT', () => {
  console.log('SIGINT received, closing pool...');
  pool.end();
});

// AI Mode — Symprio AI Chat via Mistral
const SYMPRIO_SYSTEM = `You are Symprio AI — the intelligent virtual assistant for Symprio. You speak in a confident, warm, and slightly futuristic tone — like JARVIS from Iron Man. Keep responses concise (2-4 sentences). Always respond in the same language the user speaks.

ABOUT SYMPRIO: Global AI & automation consultancy. HQ: Kuala Lumpur, Malaysia. Offices: Silicon Valley, Singapore, India. 45+ clients, 400+ bots deployed, 15+ countries, 50+ consultants. Partners: UiPath, Microsoft, Oracle, Salesforce, Google, Meta.

SERVICES: 1) RPA (UiPath, Power Automate) 2) AI App Development (chatbots, RAG, LLM) 3) Agentic AI & LLM Solutions 4) Process Assessment & Consultancy 5) Digital Transformation 6) ERP & Oracle Services 7) Custom Software Development 8) Digital Workforce & Staff Augmentation.

TRAINING: RPA Training, AI & GenAI Training, Corporate Workshops. Certified training partner.

TEAM: Vilhelm Bjermeland (COO, USA), Prabin Vijay (Practice Lead, APAC), Vivek Krishna (Director, Automation Services), Ramalingam Dushyanth (Practice Head, Automation).

CONTACT: contact@symprio.com | +60 13 880 2574 | Tower B, 8-05, KL, Malaysia. Support: $50/hr, min 50hrs.

Guide users toward the right Symprio service. End with a follow-up question when appropriate.`;

app.post('/api/ai-chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'AI service not configured' });
    }

    const mistral = new Mistral({ apiKey });

    const messages = [
      { role: 'system', content: SYMPRIO_SYSTEM },
      ...history.slice(-10).map(h => ({ role: h.role, content: h.content })),
      { role: 'user', content: message }
    ];

    const response = await mistral.chat.complete({
      model: 'mistral-small-latest',
      messages,
      maxTokens: 300,
      temperature: 0.7
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('AI chat error:', error.message);
    res.status(500).json({ error: 'AI service temporarily unavailable' });
  }
});

// ElevenLabs — get signed URL for conversational agent
app.get('/api/elevenlabs/signed-url', async (req, res) => {
  try {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    const agentId = process.env.ELEVENLABS_AGENT_ID || 'agent_7501kmmfax02fycs40pezcevmfx6';
    if (!apiKey) return res.status(500).json({ error: 'ElevenLabs not configured' });

    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`,
      { headers: { 'xi-api-key': apiKey } }
    );
    if (!response.ok) {
      const err = await response.text();
      console.error('ElevenLabs signed URL error:', err);
      return res.status(500).json({ error: 'Failed to get signed URL' });
    }
    const data = await response.json();
    res.json({ signedUrl: data.signed_url });
  } catch (error) {
    console.error('ElevenLabs signed URL error:', error.message);
    res.status(500).json({ error: 'Failed to get signed URL' });
  }
});

// ElevenLabs Webhook — receives conversation transcriptions
app.post('/api/webhooks/elevenlabs', async (req, res) => {
  try {
    const webhookSecret = process.env.ELEVENLABS_WEBHOOK_SECRET;
    const signature = req.headers['elevenlabs-signature'] || '';
    const rawBody = req.rawBody || JSON.stringify(req.body);

    let event = null;
    if (webhookSecret && signature) {
      try {
        event = await elevenlabs.webhooks.constructEvent(rawBody, signature, webhookSecret);
        console.log('[ElevenLabs Webhook] Signature verified. Type:', event.type);
      } catch (verifyErr) {
        console.warn('[ElevenLabs Webhook] Signature verification failed:', verifyErr.message);
        // Still process the webhook but log the warning
        event = req.body;
      }
    } else {
      console.log('[ElevenLabs Webhook] No secret or signature, processing without verification');
      event = req.body;
    }

    // ElevenLabs wraps data in { type, event_timestamp, data }
    const eventType = event.type || 'unknown';
    const data = event.data || event;

    // Handle audio webhook — save MP3 file and link to conversation
    if (eventType === 'post_call_audio') {
      const conversationId = data.conversation_id;
      const base64Audio = data.full_audio;
      if (conversationId && base64Audio) {
        const audioDir = path.join(__dirname, 'public', 'uploads', 'ai-audio');
        if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });
        const audioFile = `${conversationId}.mp3`;
        const audioPath = path.join(audioDir, audioFile);
        fs.writeFileSync(audioPath, Buffer.from(base64Audio, 'base64'));
        const audioUrl = `/uploads/ai-audio/${audioFile}`;
        await pool.query(
          `UPDATE ai_conversations SET audio_url = $1 WHERE conversation_id = $2`,
          [audioUrl, conversationId]
        );
        console.log('[ElevenLabs Webhook] Audio saved:', audioUrl, `(${(Buffer.from(base64Audio, 'base64').length / 1024).toFixed(0)}KB)`);
      }
      return res.json({ success: true, type: 'audio' });
    }

    // Handle transcription webhook
    console.log('[ElevenLabs Webhook] Received:', JSON.stringify(data).substring(0, 200));

    const conversationId = data.conversation_id || data.id || `conv_${Date.now()}`;
    const agentId = data.agent_id || 'agent_7501kmmfax02fycs40pezcevmfx6';
    const status = data.status || 'completed';

    // Build transcript from ElevenLabs transcript array or messages
    let transcript = '';
    if (data.transcript && Array.isArray(data.transcript)) {
      transcript = data.transcript.map(m =>
        `${m.role === 'agent' ? 'Symprio AI' : 'User'}: ${m.message || m.content || ''}`
      ).join('\n');
    } else if (data.transcript && typeof data.transcript === 'string') {
      transcript = data.transcript;
    } else if (data.messages && Array.isArray(data.messages)) {
      transcript = data.messages.map(m =>
        `${m.role === 'agent' ? 'Symprio AI' : 'User'}: ${m.message || m.content || ''}`
      ).join('\n');
    } else if (data.conversation) {
      transcript = typeof data.conversation === 'string' ? data.conversation :
        JSON.stringify(data.conversation);
    }

    const summary = data.summary || data.analysis?.summary || '';
    const language = data.metadata?.language || data.language || 'en';
    const duration = data.metadata?.duration_seconds || data.duration || 0;
    const metadata = JSON.stringify(data.metadata || data.analysis || {});

    await pool.query(
      `INSERT INTO ai_conversations (conversation_id, agent_id, status, transcript, summary, user_language, duration_seconds, metadata)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       ON CONFLICT (conversation_id) DO UPDATE SET
         transcript = EXCLUDED.transcript,
         summary = EXCLUDED.summary,
         status = EXCLUDED.status,
         metadata = EXCLUDED.metadata`,
      [conversationId, agentId, status, transcript, summary, language, duration, metadata]
    );

    console.log('[ElevenLabs Webhook] Saved conversation:', conversationId);
    res.json({ success: true, conversation_id: conversationId });
  } catch (error) {
    console.error('[ElevenLabs Webhook] Error:', error.message);
    res.status(500).json({ error: 'Failed to process webhook' });
  }
});

// AI Conversations — Admin endpoints
app.get('/api/ai-conversations', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET);

    const { rows } = await pool.query(
      'SELECT * FROM ai_conversations ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (error) {
    if (error.name === 'JsonWebTokenError') return res.status(401).json({ error: 'Invalid token' });
    res.status(500).json({ error: 'Database error' });
  }
});

app.delete('/api/ai-conversations/:id', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET);

    await pool.query('DELETE FROM ai_conversations WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Conversation deleted' });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') return res.status(401).json({ error: 'Invalid token' });
    res.status(500).json({ error: 'Database error' });
  }
});

// ===================== CLIENT STORIES =====================

// GET all active client stories (public)
app.get('/api/client-stories', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM client_stories WHERE is_active = 1 ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching client stories:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST new client story (admin only)
app.post('/api/client-stories', verifyJWT, async (req, res) => {
  try {
    const { client_name, company, role, quote, avatar_url, rating, industry } = req.body;
    
    if (!client_name || !company || !role || !quote) {
      return res.status(400).json({ error: 'Client name, company, role, and quote are required' });
    }
    
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const { rows } = await pool.query(
      `INSERT INTO client_stories (client_name, company, role, quote, avatar_url, rating, industry, created_by) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
      [client_name, company, role, quote, avatar_url || null, rating || 5, industry || null, decoded.id]
    );
    
    const id = rows[0].id;
    res.status(201).json({ 
      success: true, 
      clientStory: { 
        id, 
        client_name, 
        company, 
        role, 
        quote, 
        avatar_url: avatar_url || null, 
        rating: rating || 5, 
        industry: industry || null,
        is_active: 1 
      } 
    });
  } catch (error) {
    console.error('Error creating client story:', error);
    if (error.name === 'JsonWebTokenError') return res.status(401).json({ error: 'Invalid token' });
    res.status(500).json({ error: 'Failed to create client story: ' + error.message });
  }
});

// PUT update client story (admin only)
app.put('/api/client-stories/:id', verifyJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const { client_name, company, role, quote, avatar_url, rating, industry, is_active } = req.body;
    
    if (!client_name || !company || !role || !quote) {
      return res.status(400).json({ error: 'Client name, company, role, and quote are required' });
    }
    
    await pool.query(
      `UPDATE client_stories SET 
        client_name = $1, company = $2, role = $3, quote = $4, 
        avatar_url = $5, rating = $6, industry = $7, is_active = $8 
       WHERE id = $9`,
      [client_name, company, role, quote, avatar_url || null, rating || 5, industry || null, is_active !== undefined ? is_active : 1, id]
    );
    
    res.json({ success: true, message: 'Client story updated' });
  } catch (error) {
    console.error('Error updating client story:', error);
    if (error.name === 'JsonWebTokenError') return res.status(401).json({ error: 'Invalid token' });
    res.status(500).json({ error: 'Failed to update client story' });
  }
});

// DELETE client story (admin only)
app.delete('/api/client-stories/:id', verifyJWT, async (req, res) => {
  try {
    await pool.query('DELETE FROM client_stories WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Client story deleted' });
  } catch (error) {
    console.error('Error deleting client story:', error);
    if (error.name === 'JsonWebTokenError') return res.status(401).json({ error: 'Invalid token' });
    res.status(500).json({ error: 'Failed to delete client story' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Auth server running on http://localhost:${PORT}`);
  console.log('Available API routes:');
  console.log('  POST /api/webhooks/elevenlabs (webhook)');
  console.log('  GET /api/ai-conversations (admin)');
  console.log('  GET /api/client-stories (public)');
  console.log('  POST /api/client-stories (admin)');
  console.log('  PUT /api/client-stories/:id (admin)');
  console.log('  DELETE /api/client-stories/:id (admin)');
});
