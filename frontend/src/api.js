import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Health
export const healthCheck = () => api.get('/health');

// Marcas
export const getMarcas = () => api.get('/marcas');
export const getMarca = (id) => api.get(`/marcas/${id}`);
export const createMarca = (data) => api.post('/marcas', data);
export const updateMarca = (id, data) => api.put(`/marcas/${id}`, data);
export const deleteMarca = (id) => api.delete(`/marcas/${id}`);

// Categorías
export const getCategorias = () => api.get('/categorias');
export const createCategoria = (data) => api.post('/categorias', data);
export const updateCategoria = (id, data) => api.put(`/categorias/${id}`, data);
export const deleteCategoria = (id) => api.delete(`/categorias/${id}`);

// Productos
export const getProductos = () => api.get('/productos');
export const getProducto = (id) => api.get(`/productos/${id}`);
export const createProducto = (data) => api.post('/productos', data);
export const updateProducto = (id, data) => api.put(`/productos/${id}`, data);
export const deleteProducto = (id) => api.delete(`/productos/${id}`);

// Clientes
export const getClientes = () => api.get('/clientes');
export const createCliente = (data) => api.post('/clientes', data);
export const updateCliente = (id, data) => api.put(`/clientes/${id}`, data);
export const deleteCliente = (id) => api.delete(`/clientes/${id}`);

// Ventas
export const getVentas = () => api.get('/ventas');
export const getVentaDetalle = (id) => api.get(`/ventas/${id}`);
export const createVenta = (data) => api.post('/ventas', data);
export const deleteVenta = (id) => api.delete(`/ventas/${id}`);

// Inventario
export const getInventario = () => api.get('/inventario');
export const createMovimiento = (data) => api.post('/inventario', data);
export const deleteMovimiento = (id) => api.delete(`/inventario/${id}`);

// Reportes
export const getReporteProductosCategoria = () => api.get('/reportes/productos-por-categoria');
export const getReporteProductosMarca = () => api.get('/reportes/productos-por-marca');
export const getReporteProductosPrecio = (min, max) => api.get(`/reportes/productos-por-precio?min=${min}&max=${max}`);
export const getReporteStockBajo = (limite = 10) => api.get(`/reportes/stock-bajo?limite=${limite}`);
export const getReporteAgotados = () => api.get('/reportes/agotados');
export const getReporteVentasFecha = () => api.get('/reportes/ventas-por-fecha');
export const getReporteVentasCliente = () => api.get('/reportes/ventas-por-cliente');
export const getReporteMasVendidos = () => api.get('/reportes/mas-vendidos');
export const getReporteMetodosPago = () => api.get('/reportes/metodos-pago');
export const getResumen = () => api.get('/reportes/resumen');

// Consultas (filtros interactivos)
export const getConsultaProductosMarca = (id_marca) => 
  id_marca ? api.get(`/consultas/productos-por-marca?id_marca=${id_marca}`) : api.get('/consultas/productos-por-marca');

export const getConsultaProductosCategoria = (id_categoria) => 
  id_categoria ? api.get(`/consultas/productos-por-categoria?id_categoria=${id_categoria}`) : api.get('/consultas/productos-por-categoria');

export const getConsultaCaducidadProxima = (dias) => 
  api.get(`/consultas/caducidad-proxima?dias=${dias || 90}`);

export const getConsultaPorStock = (tipo, cantidad) => 
  api.get(`/consultas/por-stock?tipo=${tipo}&cantidad=${cantidad || 10}`);

export const getConsultaClientesFecha = (desde, hasta) => 
  desde && hasta ? api.get(`/consultas/clientes-por-fecha?desde=${desde}&hasta=${hasta}`) : api.get('/consultas/clientes-por-fecha');

export const getConsultaVentasMetodo = (metodo) => 
  metodo ? api.get(`/consultas/ventas-por-metodo?metodo=${metodo}`) : api.get('/consultas/ventas-por-metodo');

export const getConsultaTopPrecio = (tipo, limite) => 
  api.get(`/consultas/top-precio?tipo=${tipo || 'caros'}&limite=${limite || 5}`);

export default api;