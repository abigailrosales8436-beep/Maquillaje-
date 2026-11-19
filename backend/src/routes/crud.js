import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// =========================================================
// MARCAS
// =========================================================
router.get('/marcas', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM marcas ORDER BY nombre');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/marcas/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM marcas WHERE id_marca = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Marca no encontrada' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/marcas', async (req, res) => {
  try {
    const { nombre, pais_origen, descripcion } = req.body;
    const [result] = await pool.query(
      'INSERT INTO marcas (nombre, pais_origen, descripcion) VALUES (?, ?, ?)',
      [nombre, pais_origen, descripcion]
    );
    res.status(201).json({ id: result.insertId, nombre, pais_origen, descripcion });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/marcas/:id', async (req, res) => {
  try {
    const { nombre, pais_origen, descripcion } = req.body;
    const [result] = await pool.query(
      'UPDATE marcas SET nombre = ?, pais_origen = ?, descripcion = ? WHERE id_marca = ?',
      [nombre, pais_origen, descripcion, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Marca no encontrada' });
    res.json({ message: 'Marca actualizada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/marcas/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM marcas WHERE id_marca = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Marca no encontrada o tiene productos asociados' });
    res.json({ message: 'Marca eliminada' });
  } catch (err) {
    if (err.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(409).json({ error: 'No se puede eliminar: la marca tiene productos asociados.' });
    }
    res.status(500).json({ error: err.message });
  }
});

// =========================================================
// CATEGORIAS
// =========================================================
router.get('/categorias', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categorias ORDER BY nombre');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/categorias/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categorias WHERE id_categoria = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/categorias', async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const [result] = await pool.query(
      'INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)',
      [nombre, descripcion]
    );
    res.status(201).json({ id: result.insertId, nombre, descripcion });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/categorias/:id', async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const [result] = await pool.query(
      'UPDATE categorias SET nombre = ?, descripcion = ? WHERE id_categoria = ?',
      [nombre, descripcion, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json({ message: 'Categoría actualizada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/categorias/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM categorias WHERE id_categoria = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Categoría no encontrada o tiene productos asociados' });
    res.json({ message: 'Categoría eliminada' });
  } catch (err) {
    if (err.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(409).json({ error: 'No se puede eliminar: la categoría tiene productos asociados.' });
    }
    res.status(500).json({ error: err.message });
  }
});

// =========================================================
// PRODUCTOS
// =========================================================
router.get('/productos', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, m.nombre AS marca, c.nombre AS categoria
      FROM productos p
      JOIN marcas m ON p.id_marca = m.id_marca
      JOIN categorias c ON p.id_categoria = c.id_categoria
      ORDER BY p.nombre
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/productos/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, m.nombre AS marca, c.nombre AS categoria
      FROM productos p
      JOIN marcas m ON p.id_marca = m.id_marca
      JOIN categorias c ON p.id_categoria = c.id_categoria
      WHERE p.id_producto = ?
    `, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/productos', async (req, res) => {
  try {
    const { nombre, descripcion, tono, precio, stock, fecha_caducidad, id_marca, id_categoria, imagen } = req.body;
    const [result] = await pool.query(
      `INSERT INTO productos (nombre, descripcion, tono, precio, stock, fecha_caducidad, id_marca, id_categoria, imagen)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre, descripcion, tono, precio, stock, fecha_caducidad || null, id_marca, id_categoria, imagen || '/img/producto-default.png']
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/productos/:id', async (req, res) => {
  try {
    const { nombre, descripcion, tono, precio, stock, fecha_caducidad, id_marca, id_categoria, imagen } = req.body;
    const [result] = await pool.query(
      `UPDATE productos SET nombre=?, descripcion=?, tono=?, precio=?, stock=?,
       fecha_caducidad=?, id_marca=?, id_categoria=?, imagen=?
       WHERE id_producto=?`,
      [nombre, descripcion, tono, precio, stock, fecha_caducidad || null, id_marca, id_categoria, imagen, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/productos/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM productos WHERE id_producto = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Producto no encontrado o tiene ventas asociadas' });
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    if (err.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(409).json({ error: 'No se puede eliminar: el producto tiene ventas o movimientos asociados.' });
    }
    res.status(500).json({ error: err.message });
  }
});

// =========================================================
// CLIENTES
// =========================================================
router.get('/clientes', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clientes ORDER BY nombre');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/clientes/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clientes WHERE id_cliente = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/clientes', async (req, res) => {
  try {
    const { nombre, correo, telefono } = req.body;
    const [result] = await pool.query(
      'INSERT INTO clientes (nombre, correo, telefono) VALUES (?, ?, ?)',
      [nombre, correo, telefono]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'El correo ya está registrado.' });
    }
    res.status(500).json({ error: err.message });
  }
});

router.put('/clientes/:id', async (req, res) => {
  try {
    const { nombre, correo, telefono } = req.body;
    const [result] = await pool.query(
      'UPDATE clientes SET nombre=?, correo=?, telefono=? WHERE id_cliente=?',
      [nombre, correo, telefono, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json({ message: 'Cliente actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/clientes/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM clientes WHERE id_cliente = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Cliente no encontrado o tiene ventas asociadas' });
    res.json({ message: 'Cliente eliminado' });
  } catch (err) {
    if (err.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(409).json({ error: 'No se puede eliminar: el cliente tiene ventas registradas.' });
    }
    res.status(500).json({ error: err.message });
  }
});

export default router;