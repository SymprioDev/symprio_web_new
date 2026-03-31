import { sql, ensureTables } from '../_lib/db.js';
import { verify } from '../_lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  
  await ensureTables();
  
  const decoded = verify(req);
  if (!decoded) {
    res.status(401).json({ error: 'Invalid token' });
    return;
  }
  
  const { id } = req.query;
  
  try {
    await sql`DELETE FROM client_stories WHERE id = ${id}`;
    res.json({ success: true, message: 'Client story deleted' });
  } catch {
    res.status(500).json({ error: 'Failed to delete client story' });
  }
}
