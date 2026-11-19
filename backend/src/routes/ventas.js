import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// =========================================================
// VENTAS
// =========================================================
router.get('/ventas', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT v.*, c.nombre AS cliente
      FROM ventas v
      JOIN clientes c ON v.id_cliente = c.id_cliente
      ORDER BY v.fecha_venta DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/ventas/:id', async (req, res) => {
  try {
    const [venta] = await pool.query(`
      SELECT v.*, c.nombre AS cliente
      FROM ventas v JOIN clientes c ON v.id_cliente = c.id_cliente
      WHERE v.id_venta = ?
    `, [req.params.id]);
    if (venta.length === 0) return res.status(404).json({ error: 'Venta no encontrada' });

    const [detalle] = await pool.query(`
      SELECT dv.*, p.nombre AS producto
      FROM detalle_venta dv
      JOIN productos p ON dv.id_producto = p.id_producto
      WHERE dv.id_venta = ?
    `, [req.params.id]);

    res.json({ venta: venta[0], detalle });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear venta con detalle y actualizar stock (transacción)
router.post('/ventas', async (req, res) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const { id_cliente, metodo_pago, estado, items } = req.body;
    let total = 0;
    for (const it of items) {
      total += Number(it.cantidad) * Number(it.precio_unitario);
    }

    const [ventaRes] = await conn.query(
      `INSERT INTO ventas (id_cliente, total, metodo_pago, estado) VALUES (?, ?, ?, ?)`,
      [id_cliente, total, metodo_pago, estado || 'Completada']
    );
    const id_venta = ventaRes.insertId;

    for (const it of items) {
      const subtotal = Number(it.cantidad) * Number(it.precio_unitario);
      await conn.query(
        `INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario, subtotal)
         VALUES (?, ?, ?, ?, ?)`,
        [id_venta, it.id_producto, it.cantidad, it.precio_unitario, subtotal]
      );
      await conn.query(
        `UPDATE productos SET stock = stock - ? WHERE id_producto = ?`,
        [it.cantidad, it.id_producto]
      );
      await conn.query(
        `INSERT INTO movimientos_inventario (id_producto, tipo_movimiento, cantidad, motivo)
         VALUES (?, 'Salida', ?, ?)`,
        [it.id_producto, it.cantidad, `Venta #${id_venta}`]
      );
    }

    await conn.commit();
    conn.release();
    res.status(201).json({ id: id_venta, total });
  } catch (err) {
    await conn.rollback();
    conn.release();
    res.status(500).json({ error: err.message });
  }
});

router.delete('/ventas/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM ventas WHERE id_venta = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Venta no encontrada' });
    res.json({ message: 'Venta eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =========================================================
// INVENTARIO (movimientos)
// =========================================================
router.get('/inventario', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT mi.*, p.nombre AS producto
      FROM movimientos_inventario mi
      JOIN productos p ON mi.id_producto = p.id_producto
      ORDER BY mi.fecha_movimiento DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/inventario', async (req, res) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const { id_producto, tipo_movimiento, cantidad, motivo } = req.body;

    await conn.query(
      `INSERT INTO movimientos_inventario (id_producto, tipo_movimiento, cantidad, motivo)
       VALUES (?, ?, ?, ?)`,
      [id_producto, tipo_movimiento, cantidad, motivo]
    );

    if (tipo_movimiento === 'Entrada' || tipo_movimiento === 'Ajuste') {
      await conn.query(`UPDATE productos SET stock = stock + ? WHERE id_producto = ?`, [cantidad, id_producto]);
    } else if (tipo_movimiento === 'Salida') {
      await conn.query(`UPDATE productos SET stock = stock - ? WHERE id_producto = ?`, [cantidad, id_producto]);
    }

    await conn.commit();
    conn.release();
    res.status(201).json({ message: 'Movimiento registrado' });
  } catch (err) {
    await conn.rollback();
    conn.release();
    res.status(500).json({ error: err.message });
  }
});

router.delete('/inventario/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM movimientos_inventario WHERE id_movimiento = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Movimiento no encontrado' });
    res.json({ message: 'Movimiento eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;