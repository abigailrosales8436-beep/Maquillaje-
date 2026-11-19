import { useState, useEffect } from 'react';
import { Tabla, StatCard, SeccionHeader } from './Layout.jsx';
import { LabialIcon, PersonaIcon, TarjetaIcon, CajaIcon, GraficaIcon, AlertIcon } from './Icons.jsx';
import * as api from '../api.js';

// =========================================================
// INICIO
// =========================================================
export function Inicio({ resumen, productos, categorias }) {
  const destacados = productos.slice(0, 4);
  return (
    <section className="seccion">
      <div className="hero">
        <h1>Bienvenidos a <span className="accent">ABBY Beauty</span></h1>
        <p className="hero-sub">Maquillaje inspirado en la belleza de las flores mexicanas</p>
        <p>Descubre una colección delicada, moderna y femenina que realza tu esencia natural.</p>
      </div>

      <div className="stats-grid">
        <StatCard icon={LabialIcon} label="Productos" value={resumen.totalProductos || 0} />
        <StatCard icon={PersonaIcon} label="Clientes" value={resumen.totalClientes || 0} />
        <StatCard icon={TarjetaIcon} label="Ventas" value={resumen.totalVentas || 0} />
        <StatCard icon={GraficaIcon} label="Ingresos" value={`$${Number(resumen.ingresos || 0).toLocaleString()}`} />
        <StatCard icon={AlertIcon} label="Stock bajo" value={resumen.productosStockBajo || 0} color="warn" />
        <StatCard icon={CajaIcon} label="Agotados" value={resumen.productosAgotados || 0} color="danger" />
      </div>

      <h2 className="section-title">Productos destacados</h2>
      <div className="productos-grid">
        {destacados.map(p => (
          <div key={p.id_producto} className="producto-card">
            <div className="producto-img">
              <img src={p.imagen} alt={p.nombre}
                onError={(e) => { e.target.src = 'https://i.pinimg.com/736x/27/6e/f3/276ef331f2dfa51b1cb35ebaed5cb42d.jpg'; }} />
            </div>
            <div className="producto-info">
              <h4>{p.nombre}</h4>
              <p className="producto-tono">{p.tono}</p>
              <p className="producto-precio">${Number(p.precio).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="section-title">Categorías</h2>
      <div className="categorias-grid">
        {categorias.map(c => (
          <div key={c.id_categoria} className="categoria-card">
            <h4>{c.nombre}</h4>
            <p>{c.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// =========================================================
// PRODUCTOS
// =========================================================
export function Productos({ data, onEdit, onDelete, onAdd }) {
  return (
    <section className="seccion">
      <SeccionHeader titulo="Productos" onAdd={onAdd} />
      <Tabla
        columns={[
          { key: 'id_producto', label: 'ID' },
          { key: 'nombre', label: 'Nombre' },
          { key: 'tono', label: 'Tono' },
          { key: 'precio', label: 'Precio' },
          { key: 'stock', label: 'Stock' },
          { key: 'marca', label: 'Marca' },
          { key: 'categoria', label: 'Categoría' }
        ]}
        data={data} onEdit={onEdit} onDelete={onDelete} keyField="id_producto"
      />
    </section>
  );
}

// =========================================================
// MARCAS
// =========================================================
export function Marcas({ data, onEdit, onDelete, onAdd }) {
  return (
    <section className="seccion">
      <SeccionHeader titulo="Marcas" onAdd={onAdd} />
      <Tabla
        columns={[
          { key: 'id_marca', label: 'ID' },
          { key: 'nombre', label: 'Nombre' },
          { key: 'pais_origen', label: 'País' },
          { key: 'descripcion', label: 'Descripción' }
        ]}
        data={data} onEdit={onEdit} onDelete={onDelete} keyField="id_marca"
      />
    </section>
  );
}

// =========================================================
// CATEGORIAS
// =========================================================
export function Categorias({ data, onEdit, onDelete, onAdd }) {
  return (
    <section className="seccion">
      <SeccionHeader titulo="Categorías" onAdd={onAdd} />
      <Tabla
        columns={[
          { key: 'id_categoria', label: 'ID' },
          { key: 'nombre', label: 'Nombre' },
          { key: 'descripcion', label: 'Descripción' }
        ]}
        data={data} onEdit={onEdit} onDelete={onDelete} keyField="id_categoria"
      />
    </section>
  );
}

// =========================================================
// CLIENTES
// =========================================================
export function Clientes({ data, onEdit, onDelete, onAdd }) {
  return (
    <section className="seccion">
      <SeccionHeader titulo="Clientes" onAdd={onAdd} />
      <Tabla
        columns={[
          { key: 'id_cliente', label: 'ID' },
          { key: 'nombre', label: 'Nombre' },
          { key: 'correo', label: 'Correo' },
          { key: 'telefono', label: 'Teléfono' },
          { key: 'fecha_registro', label: 'Registro' }
        ]}
        data={data} onEdit={onEdit} onDelete={onDelete} keyField="id_cliente"
      />
    </section>
  );
}

// =========================================================
// VENTAS
// =========================================================
export function Ventas({ data, onAdd, onDelete }) {
  return (
    <section className="seccion">
      <SeccionHeader titulo="Ventas" onAdd={onAdd} />
      <Tabla
        columns={[
          { key: 'id_venta', label: 'ID' },
          { key: 'cliente', label: 'Cliente' },
          { key: 'fecha_venta', label: 'Fecha' },
          { key: 'total', label: 'Total' },
          { key: 'metodo_pago', label: 'Método' },
          { key: 'estado', label: 'Estado' }
        ]}
        data={data} onDelete={onDelete} keyField="id_venta"
      />
    </section>
  );
}

// =========================================================
// INVENTARIO
// =========================================================
export function Inventario({ data, onAdd, onDelete }) {
  return (
    <section className="seccion">
      <SeccionHeader titulo="Movimientos de Inventario" onAdd={onAdd} />
      <Tabla
        columns={[
          { key: 'id_movimiento', label: 'ID' },
          { key: 'producto', label: 'Producto' },
          { key: 'tipo_movimiento', label: 'Tipo' },
          { key: 'cantidad', label: 'Cantidad' },
          { key: 'fecha_movimiento', label: 'Fecha' },
          { key: 'motivo', label: 'Motivo' }
        ]}
        data={data} onDelete={onDelete} keyField="id_movimiento"
      />
    </section>
  );
}

// =========================================================
// REPORTES
// =========================================================
export function Reportes() {
  const [tipo, setTipo] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const ejecutar = async (t, fn) => {
    setLoading(true);
    try {
      const res = await fn();
      setData(res.data);
      setTipo(t);
    } catch (err) {
      setData({ error: err.message });
      setTipo(t);
    }
    setLoading(false);
  };

  return (
    <section className="seccion">
      <h2>Reportes</h2>
      <div className="reportes-grid">
        <button className="btn btn-primary" onClick={() => ejecutar('resumen', api.getResumen)}>Resumen general</button>
        <button className="btn btn-primary" onClick={() => ejecutar('cat', api.getReporteProductosCategoria)}>Productos por categoría</button>
        <button className="btn btn-primary" onClick={() => ejecutar('marca', api.getReporteProductosMarca)}>Productos por marca</button>
        <button className="btn btn-primary" onClick={() => ejecutar('bajo', () => api.getReporteStockBajo(10))}>Stock bajo</button>
        <button className="btn btn-primary" onClick={() => ejecutar('ago', api.getReporteAgotados)}>Agotados</button>
        <button className="btn btn-primary" onClick={() => ejecutar('vf', api.getReporteVentasFecha)}>Ventas por fecha</button>
        <button className="btn btn-primary" onClick={() => ejecutar('vc', api.getReporteVentasCliente)}>Ventas por cliente</button>
        <button className="btn btn-primary" onClick={() => ejecutar('mv', api.getReporteMasVendidos)}>Más vendidos</button>
        <button className="btn btn-primary" onClick={() => ejecutar('mp', api.getReporteMetodosPago)}>Métodos de pago</button>
      </div>
      {loading && <p>Cargando...</p>}
      {data && <ReporteView tipo={tipo} data={data} />}
    </section>
  );
}

function ReporteView({ tipo, data }) {
  if (data.error) return <div className="form-error">{data.error}</div>;

  if (tipo === 'resumen') {
    return (
      <div className="stats-grid">
        <StatCard icon={LabialIcon} label="Productos" value={data.totalProductos} />
        <StatCard icon={PersonaIcon} label="Clientes" value={data.totalClientes} />
        <StatCard icon={TarjetaIcon} label="Ventas" value={data.totalVentas} />
        <StatCard icon={GraficaIcon} label="Ingresos" value={`$${Number(data.ingresos).toLocaleString()}`} />
      </div>
    );
  }

  if (!Array.isArray(data)) return <pre>{JSON.stringify(data, null, 2)}</pre>;
  if (data.length === 0) return <p className="empty">Sin resultados.</p>;

  const keys = Object.keys(data[0]);
  return (
    <div className="table-wrap">
      <table className="tabla">
        <thead><tr>{keys.map(k => <th key={k}>{k}</th>)}</tr></thead>
        <tbody>{data.map((row, i) => <tr key={i}>{keys.map(k => <td key={k}>{row[k]}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

// =========================================================
// CONSULTAS (mejorado con múltiples filtros)
// =========================================================
export function Consultas() {
  const [consultaActiva, setConsultaActiva] = useState('marca');
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);

  // Estados de filtros
  const [marcaId, setMarcaId] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [precioMin, setPrecioMin] = useState(0);
  const [precioMax, setPrecioMax] = useState(1000);
  const [diasCaducidad, setDiasCaducidad] = useState(90);
  const [stockTipo, setStockTipo] = useState('menor');
  const [stockCantidad, setStockCantidad] = useState(10);
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [topTipo, setTopTipo] = useState('caros');
  const [topLimite, setTopLimite] = useState(5);

  // Datos para selects
  const [marcas, setMarcas] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    api.getMarcas().then(r => setMarcas(r.data)).catch(() => {});
    api.getCategorias().then(r => setCategorias(r.data)).catch(() => {});
  }, []);

  const ejecutar = async () => {
    setLoading(true);
    try {
      let res;
      switch (consultaActiva) {
        case 'marca':
          res = await api.getConsultaProductosMarca(marcaId);
          break;
        case 'categoria':
          res = await api.getConsultaProductosCategoria(categoriaId);
          break;
        case 'precio':
          res = await api.getReporteProductosPrecio(precioMin, precioMax);
          break;
        case 'caducidad':
          res = await api.getConsultaCaducidadProxima(diasCaducidad);
          break;
        case 'stock':
          res = await api.getConsultaPorStock(stockTipo, stockCantidad);
          break;
        case 'clientes':
          res = await api.getConsultaClientesFecha(fechaDesde, fechaHasta);
          break;
        case 'ventas':
          res = await api.getConsultaVentasMetodo(metodoPago);
          break;
        case 'top':
          res = await api.getConsultaTopPrecio(topTipo, topLimite);
          break;
        default:
          res = { data: [] };
      }
      setResultados(res.data);
    } catch (err) {
      setResultados([]);
    }
    setLoading(false);
  };

  return (
    <section className="seccion">
      <h2>Consultas</h2>
      <p className="hero-sub">Realiza búsquedas específicas con filtros personalizados</p>

      {/* Selector de tipo de consulta */}
      <div className="consultas-selector">
        <button className={`btn ${consultaActiva === 'marca' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => { setConsultaActiva('marca'); setResultados([]); }}>Por marca</button>
        <button className={`btn ${consultaActiva === 'categoria' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => { setConsultaActiva('categoria'); setResultados([]); }}>Por categoría</button>
        <button className={`btn ${consultaActiva === 'precio' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => { setConsultaActiva('precio'); setResultados([]); }}>Por precio</button>
        <button className={`btn ${consultaActiva === 'caducidad' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => { setConsultaActiva('caducidad'); setResultados([]); }}>Caducidad próxima</button>
        <button className={`btn ${consultaActiva === 'stock' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => { setConsultaActiva('stock'); setResultados([]); }}>Por stock</button>
        <button className={`btn ${consultaActiva === 'clientes' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => { setConsultaActiva('clientes'); setResultados([]); }}>Clientes por fecha</button>
        <button className={`btn ${consultaActiva === 'ventas' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => { setConsultaActiva('ventas'); setResultados([]); }}>Ventas por método</button>
        <button className={`btn ${consultaActiva === 'top' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => { setConsultaActiva('top'); setResultados([]); }}>Top precios</button>
      </div>

      {/* Filtros dinámicos */}
      <div className="consulta-box">
        {consultaActiva === 'marca' && (
          <>
            <h3>Productos por marca</h3>
            <div className="form-row">
              <label>Selecciona una marca (opcional)
                <select value={marcaId} onChange={e => setMarcaId(e.target.value)}>
                  <option value="">Todas las marcas (resumen)</option>
                  {marcas.map(m => <option key={m.id_marca} value={m.id_marca}>{m.nombre}</option>)}
                </select>
              </label>
              <button className="btn btn-primary" onClick={ejecutar}>Buscar</button>
            </div>
          </>
        )}

        {consultaActiva === 'categoria' && (
          <>
            <h3>Productos por categoría</h3>
            <div className="form-row">
              <label>Selecciona una categoría (opcional)
                <select value={categoriaId} onChange={e => setCategoriaId(e.target.value)}>
                  <option value="">Todas las categorías (resumen)</option>
                  {categorias.map(c => <option key={c.id_categoria} value={c.id_categoria}>{c.nombre}</option>)}
                </select>
              </label>
              <button className="btn btn-primary" onClick={ejecutar}>Buscar</button>
            </div>
          </>
        )}

        {consultaActiva === 'precio' && (
          <>
            <h3>Productos por rango de precio</h3>
            <div className="form-row">
              <label>Precio mínimo<input type="number" value={precioMin} onChange={e => setPrecioMin(e.target.value)} /></label>
              <label>Precio máximo<input type="number" value={precioMax} onChange={e => setPrecioMax(e.target.value)} /></label>
              <button className="btn btn-primary" onClick={ejecutar}>Buscar</button>
            </div>
          </>
        )}

        {consultaActiva === 'caducidad' && (
          <>
            <h3>Productos con caducidad próxima</h3>
            <div className="form-row">
              <label>Días a considerar<input type="number" value={diasCaducidad} onChange={e => setDiasCaducidad(e.target.value)} /></label>
              <button className="btn btn-primary" onClick={ejecutar}>Buscar</button>
            </div>
          </>
        )}

        {consultaActiva === 'stock' && (
          <>
            <h3>Productos por nivel de stock</h3>
            <div className="form-row">
              <label>Tipo de filtro
                <select value={stockTipo} onChange={e => setStockTipo(e.target.value)}>
                  <option value="menor">Menor que</option>
                  <option value="mayor">Mayor que</option>
                  <option value="igual">Igual a</option>
                </select>
              </label>
              <label>Cantidad<input type="number" value={stockCantidad} onChange={e => setStockCantidad(e.target.value)} /></label>
              <button className="btn btn-primary" onClick={ejecutar}>Buscar</button>
            </div>
          </>
        )}

        {consultaActiva === 'clientes' && (
          <>
            <h3>Clientes registrados en rango de fechas</h3>
            <div className="form-row">
              <label>Desde<input type="date" value={fechaDesde} onChange={e => setFechaDesde(e.target.value)} /></label>
              <label>Hasta<input type="date" value={fechaHasta} onChange={e => setFechaHasta(e.target.value)} /></label>
              <button className="btn btn-primary" onClick={ejecutar}>Buscar</button>
            </div>
          </>
        )}

        {consultaActiva === 'ventas' && (
          <>
            <h3>Ventas por método de pago</h3>
            <div className="form-row">
              <label>Selecciona un método (opcional)
                <select value={metodoPago} onChange={e => setMetodoPago(e.target.value)}>
                  <option value="">Todos los métodos (resumen)</option>
                  <option>Tarjeta</option>
                  <option>Efectivo</option>
                  <option>Transferencia</option>
                </select>
              </label>
              <button className="btn btn-primary" onClick={ejecutar}>Buscar</button>
            </div>
          </>
        )}

        {consultaActiva === 'top' && (
          <>
            <h3>Top productos por precio</h3>
            <div className="form-row">
              <label>Tipo
                <select value={topTipo} onChange={e => setTopTipo(e.target.value)}>
                  <option value="caros">Más caros</option>
                  <option value="baratos">Más baratos</option>
                </select>
              </label>
              <label>Cantidad a mostrar<input type="number" min="1" max="20" value={topLimite} onChange={e => setTopLimite(e.target.value)} /></label>
              <button className="btn btn-primary" onClick={ejecutar}>Buscar</button>
            </div>
          </>
        )}
      </div>

      {/* Resultados */}
      {loading && <p className="empty">Cargando...</p>}
      {!loading && resultados.length > 0 && (
        <div className="table-wrap">
          <table className="tabla">
            <thead>
              <tr>{Object.keys(resultados[0]).map(k => <th key={k}>{k}</th>)}</tr>
            </thead>
            <tbody>
              {resultados.map((row, i) => (
                <tr key={i}>
                  {Object.keys(row).map(k => <td key={k}>{row[k]}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!loading && resultados.length === 0 && consultaActiva && (
        <p className="empty">Sin resultados. Ajusta los filtros y vuelve a buscar.</p>
      )}
    </section>
  );
}
// =========================================================
// CONFIGURACION
// =========================================================
export function Configuracion({ dbStatus }) {
  return (
    <section className="seccion">
      <h2>Configuración</h2>
      <div className="config-card">
        <div className="config-row"><strong>Tienda:</strong><span>Xóchitl Beauty</span></div>
        <div className="config-row"><strong>Contacto:</strong><span>hola@xochitlbeauty.com</span></div>
        <div className="config-row"><strong>Teléfono:</strong><span>555 123 4567</span></div>
        <div className="config-row"><strong>Versión:</strong><span>1.0.0</span></div>
        <div className="config-row">
          <strong>Estado del backend:</strong>
          <span className={`status-badge ${dbStatus}`}>
            {dbStatus === 'ok' ? 'Conectado' : dbStatus === 'error' ? 'Sin conexión' : 'Verificando...'}
          </span>
        </div>
      </div>
    </section>
  );
}