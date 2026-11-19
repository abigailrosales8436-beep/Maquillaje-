import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// Productos por categoría
router.get('/reportes/productos-por-categoria', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT c.nombre AS categoria, COUNT(p.id_producto) AS total_productos, SUM(p.stock) AS stock_total
      FROM categorias c
      LEFT JOIN productos p ON c.id_categoria = p.id_categoria
      GROUP BY c.id_categoria, c.nombre
      ORDER BY c.nombre
    `);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Productos por marca
router.get('/reportes/productos-por-marca', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT m.nombre AS marca, COUNT(p.id_producto) AS total_productos, AVG(p.precio) AS precio_promedio
      FROM marcas m
      LEFT JOIN productos p ON m.id_marca = p.id_marca
      GROUP BY m.id_marca, m.nombre
      ORDER BY m.nombre
    `);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Productos por rango de precio
router.get('/reportes/productos-por-precio', async (req, res) => {
  try {
    const { min, max } = req.query;
    const [rows] = await pool.query(
      `SELECT nombre, tono, precio, stock FROM productos
       WHERE precio BETWEEN ? AND ? ORDER BY precio`,
      [Number(min || 0), Number(max || 99999)]
    );
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Productos con poco stock
router.get('/reportes/stock-bajo', async (req, res) => {
  try {
    const limite = Number(req.query.limite || 10);
    const [rows] = await pool.query(
      `SELECT id_producto, nombre, stock, precio FROM productos
       WHERE stock <= ? AND stock > 0 ORDER BY stock ASC`,
      [limite]
    );
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Productos agotados
router.get('/reportes/agotados', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id_producto, nombre, precio FROM productos WHERE stock = 0 ORDER BY nombre`
    );
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Ventas por fecha
router.get('/reportes/ventas-por-fecha', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT DATE(fecha_venta) AS fecha, COUNT(*) AS total_ventas, SUM(total) AS ingresos
      FROM ventas
      GROUP BY DATE(fecha_venta)
      ORDER BY fecha DESC
    `);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Ventas por cliente
router.get('/reportes/ventas-por-cliente', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT c.nombre AS cliente, COUNT(v.id_venta) AS total_compras, SUM(v.total) AS total_gastado
      FROM clientes c
      LEFT JOIN ventas v ON c.id_cliente = v.id_cliente
      GROUP BY c.id_cliente, c.nombre
      ORDER BY total_gastado DESC
    `);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Productos más vendidos
router.get('/reportes/mas-vendidos', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.nombre, SUM(dv.cantidad) AS unidades_vendidas, SUM(dv.subtotal) AS total_ingresado
      FROM detalle_venta dv
      JOIN productos p ON dv.id_producto = p.id_producto
      GROUP BY p.id_producto, p.nombre
      ORDER BY unidades_vendidas DESC
      LIMIT 10
    `);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Métodos de pago
router.get('/reportes/metodos-pago', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT metodo_pago, COUNT(*) AS total_usos, SUM(total) AS total_monto
      FROM ventas
      GROUP BY metodo_pago
      ORDER BY total_monto DESC
    `);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Resumen general
router.get('/reportes/resumen', async (req, res) => {
  try {
    const [[prod]] = await pool.query('SELECT COUNT(*) AS total FROM productos');
    const [[cli]] = await pool.query('SELECT COUNT(*) AS total FROM clientes');
    const [[ven]] = await pool.query('SELECT COUNT(*) AS total, COALESCE(SUM(total),0) AS ingresos FROM ventas');
    const [bajo] = await pool.query('SELECT COUNT(*) AS total FROM productos WHERE stock <= 5 AND stock > 0');
    const [ago] = await pool.query('SELECT COUNT(*) AS total FROM productos WHERE stock = 0');
    res.json({
      totalProductos: prod.total,
      totalClientes: cli.total,
      totalVentas: ven.total,
      ingresos: ven.ingresos,
      productosStockBajo: bajo[0].total,
      productosAgotados: ago[0].total
    });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// =========================================================
// CONSULTAS (filtros interactivos)
// =========================================================

// Productos por marca (filtro)
router.get('/consultas/productos-por-marca', async (req, res) => {
  try {
    const { id_marca } = req.query;
    if (id_marca) {
      const [rows] = await pool.query(`
        SELECT p.id_producto, p.nombre, p.tono, p.precio, p.stock, m.nombre AS marca
        FROM productos p
        JOIN marcas m ON p.id_marca = m.id_marca
        WHERE p.id_marca = ?
        ORDER BY p.nombre
      `, [id_marca]);
      return res.json(rows);
    }
    // Sin filtro: agrupar por marca
    const [rows] = await pool.query(`
      SELECT m.nombre AS marca, COUNT(p.id_producto) AS total_productos, SUM(p.stock) AS stock_total
      FROM marcas m
      LEFT JOIN productos p ON m.id_marca = p.id_marca
      GROUP BY m.id_marca, m.nombre
      ORDER BY total_productos DESC
    `);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Productos por categoría (filtro)
router.get('/consultas/productos-por-categoria', async (req, res) => {
  try {
    const { id_categoria } = req.query;
    if (id_categoria) {
      const [rows] = await pool.query(`
        SELECT p.id_producto, p.nombre, p.tono, p.precio, p.stock, c.nombre AS categoria
        FROM productos p
        JOIN categorias c ON p.id_categoria = c.id_categoria
        WHERE p.id_categoria = ?
        ORDER BY p.nombre
      `, [id_categoria]);
      return res.json(rows);
    }
    const [rows] = await pool.query(`
      SELECT c.nombre AS categoria, COUNT(p.id_producto) AS total_productos, SUM(p.stock) AS stock_total
      FROM categorias c
      LEFT JOIN productos p ON c.id_categoria = p.id_categoria
      GROUP BY c.id_categoria, c.nombre
      ORDER BY total_productos DESC
    `);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Productos por rango de precio (ya existe, la reutilizamos)
// router.get('/reportes/productos-por-precio', ...)

// Productos con fecha de caducidad próxima
router.get('/consultas/caducidad-proxima', async (req, res) => {
  try {
    const dias = Number(req.query.dias || 90);
    const [rows] = await pool.query(`
      SELECT id_producto, nombre, precio, stock, fecha_caducidad,
             DATEDIFF(fecha_caducidad, CURDATE()) AS dias_restantes
      FROM productos
      WHERE fecha_caducidad IS NOT NULL
        AND fecha_caducidad BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL ? DAY)
      ORDER BY fecha_caducidad ASC
    `, [dias]);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Productos por stock (filtro: mayor/menor que)
router.get('/consultas/por-stock', async (req, res) => {
  try {
    const { tipo, cantidad } = req.query;
    const cant = Number(cantidad || 10);
    let query = 'SELECT id_producto, nombre, stock, precio FROM productos WHERE ';
    if (tipo === 'mayor') {
      query += `stock > ${cant}`;
    } else if (tipo === 'menor') {
      query += `stock < ${cant} AND stock > 0`;
    } else {
      query += `stock = ${cant}`;
    }
    query += ' ORDER BY stock ASC';
    const [rows] = await pool.query(query);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Clientes registrados en rango de fechas
router.get('/consultas/clientes-por-fecha', async (req, res) => {
  try {
    const { desde, hasta } = req.query;
    if (desde && hasta) {
      const [rows] = await pool.query(`
        SELECT id_cliente, nombre, correo, telefono, fecha_registro
        FROM clientes
        WHERE DATE(fecha_registro) BETWEEN ? AND ?
        ORDER BY fecha_registro DESC
      `, [desde, hasta]);
      return res.json(rows);
    }
    // Sin filtro: agrupar por mes
    const [rows] = await pool.query(`
      SELECT DATE_FORMAT(fecha_registro, '%Y-%m') AS mes, COUNT(*) AS total_clientes
      FROM clientes
      GROUP BY DATE_FORMAT(fecha_registro, '%Y-%m')
      ORDER BY mes DESC
    `);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Ventas por método de pago (filtro)
router.get('/consultas/ventas-por-metodo', async (req, res) => {
  try {
    const { metodo } = req.query;
    if (metodo) {
      const [rows] = await pool.query(`
        SELECT v.id_venta, v.fecha_venta, v.total, v.estado, c.nombre AS cliente
        FROM ventas v
        JOIN clientes c ON v.id_cliente = c.id_cliente
        WHERE v.metodo_pago = ?
        ORDER BY v.fecha_venta DESC
      `, [metodo]);
      return res.json(rows);
    }
    const [rows] = await pool.query(`
      SELECT metodo_pago, COUNT(*) AS total_ventas, SUM(total) AS total_monto, AVG(total) AS promedio
      FROM ventas
      GROUP BY metodo_pago
      ORDER BY total_monto DESC
    `);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Top productos más caros / más baratos
router.get('/consultas/top-precio', async (req, res) => {
  try {
    const { tipo, limite } = req.query;
    const lim = Number(limite || 5);
    const orden = tipo === 'baratos' ? 'ASC' : 'DESC';
    const [rows] = await pool.query(`
      SELECT id_producto, nombre, tono, precio, stock
      FROM productos
      ORDER BY precio ${orden}
      LIMIT ?
    `, [lim]);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;