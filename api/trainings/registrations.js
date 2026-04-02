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

  // GET /api/trainings/registrations - Get all training registrations
  if (req.method === 'GET') {
    try {
      // Get all registrations with training details
      const result = await sql`
        SELECT 
          tr.id,
          tr.training_id,
          tr.full_name,
          tr.email,
          tr.phone,
          tr.organisation,
          tr.heard_from,
          tr.registered_at,
          t.title as training_title,
          t.date as training_date
        FROM training_registrations tr
        JOIN trainings t ON t.id = tr.training_id
        ORDER BY tr.registered_at DESC
      `;
      res.json(result.rows || []);
    } catch (error) {
      console.error('Error fetching training registrations:', error);
      res.status(500).json({ error: 'Database error' });
    }
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
