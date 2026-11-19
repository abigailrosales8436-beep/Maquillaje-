import { Router } from 'express';
import pool from '../db.js';

import crudRoutes from './crud.js';
import ventasRoutes from './ventas.js';
import reportesRoutes from './reportes.js';

const router = Router();

// Health check
router.get('/health', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok');
    res.json({ status: 'ok', db: 'connected', data: rows[0] });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Montar routers
router.use(crudRoutes);
router.use(ventasRoutes);
router.use(reportesRoutes);

export default router;