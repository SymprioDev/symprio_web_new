import { sql, ensureTables } from '../_lib/db.js';
import { verify } from '../_lib/auth.js';
import { readBody } from '../_lib/body.js';

export default async function handler(req, res) {
  await ensureTables();
  
  if (req.method === 'GET') {
    try {
      const result = await sql`SELECT * FROM client_stories WHERE is_active = 1 ORDER BY created_at DESC`;
      res.json(result.rows || []);
    } catch {
      res.status(500).json({ error: 'Database error' });
    }
    return;
  }
  
  if (req.method === 'POST') {
    const decoded = verify(req);
    if (!decoded) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }
    
    const { client_name, company, role, quote, avatar_url, rating, industry } = await readBody(req);
    
    if (!client_name || !company || !role || !quote) {
      res.status(400).json({ error: 'Client name, company, role, and quote are required' });
      return;
    }
    
    try {
      const result = await sql`INSERT INTO client_stories (client_name, company, role, quote, avatar_url, rating, industry, created_by) VALUES (${client_name}, ${company}, ${role}, ${quote}, ${avatar_url || null}, ${rating || 5}, ${industry || null}, ${decoded.id}) RETURNING id`;
      const id = result.rows[0].id;
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
    } catch {
      res.status(500).json({ error: 'Failed to create client story' });
    }
    return;
  }
  
  if (req.method === 'PUT') {
    const decoded = verify(req);
    if (!decoded) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }
    
    const { id, client_name, company, role, quote, avatar_url, rating, industry, is_active } = await readBody(req);
    
    if (!id) {
      res.status(400).json({ error: 'Client story ID is required' });
      return;
    }
    
    try {
      await sql`UPDATE client_stories SET client_name = ${client_name}, company = ${company}, role = ${role}, quote = ${quote}, avatar_url = ${avatar_url || null}, rating = ${rating || 5}, industry = ${industry || null}, is_active = ${is_active !== undefined ? is_active : 1} WHERE id = ${id}`;
      res.json({ success: true, message: 'Client story updated' });
    } catch {
      res.status(500).json({ error: 'Failed to update client story' });
    }
    return;
  }
  
  res.status(405).json({ error: 'Method not allowed' });
}
