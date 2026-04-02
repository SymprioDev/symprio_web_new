import { sql, ensureTables } from '../_lib/db.js';
import { verify } from '../_lib/auth.js';

export default async function handler(req, res) {
  await ensureTables();
  
  // Verify admin authentication
  const decoded = verify(req);
  if (!decoded) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  // GET /api/events/registrations - Get all event registrations
  if (req.method === 'GET') {
    try {
      // Get all registrations with event details
      const result = await sql`
        SELECT 
          er.id,
          er.event_id,
          er.full_name,
          er.email,
          er.phone,
          er.organisation,
          er.heard_from,
          er.interested_in_speaking,
          NULL as questions,
          er.registered_at,
          e.title as event_title,
          e.date as event_date,
          e.type as event_type
        FROM event_registrations er
        JOIN events e ON e.id = er.event_id
        ORDER BY er.registered_at DESC
      `;
      res.json(result.rows || []);
    } catch (error) {
      console.error('Error fetching event registrations:', error);
      res.status(500).json({ error: 'Database error' });
    }
    return;
  }

  // GET /api/events/registrations?event_id=X - Get registrations for a specific event
  // POST /api/events/registrations - Create new registration (handled by /api/events/:slug/register)

  res.status(405).json({ error: 'Method not allowed' });
}
