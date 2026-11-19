import { useState, useEffect } from 'react';
import * as api from './api.js';
import { Navbar, Footer, Modal, Toast } from './components/Layout.jsx';
import { Inicio, Productos, Marcas, Categorias, Clientes, Ventas, Inventario, Reportes, Consultas, Configuracion } from './components/Sections.jsx';
import { FormProducto, FormMarca, FormCategoria, FormCliente, FormVenta, FormMovimiento } from './components/Forms.jsx';
import {
  FlorIcon, LabialIcon, EtiquetaIcon, FlorSimpleIcon, PersonaIcon,
  TarjetaIcon, CajaIcon, GraficaIcon, LupaIcon, ConfigIcon
} from './components/Icons.jsx';

const SECCIONES = [
  { id: 'inicio', label: 'Inicio', icon: FlorIcon },
  { id: 'productos', label: 'Productos', icon: LabialIcon },
  { id: 'marcas', label: 'Marcas', icon: EtiquetaIcon },
  { id: 'categorias', label: 'Categorías', icon: FlorSimpleIcon },
  { id: 'clientes', label: 'Clientes', icon: PersonaIcon },
  { id: 'ventas', label: 'Ventas', icon: TarjetaIcon },
  { id: 'inventario', label: 'Inventario', icon: CajaIcon },
  { id: 'reportes', label: 'Reportes', icon: GraficaIcon },
  { id: 'consultas', label: 'Consultas', icon: LupaIcon },
  { id: 'configuracion', label: 'Configuración', icon: ConfigIcon }
];

function App() {
  const [seccion, setSeccion] = useState('inicio');
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [dbStatus, setDbStatus] = useState('checking');

  const [productos, setProductos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [inventario, setInventario] = useState([]);
  const [resumen, setResumen] = useState({});

  useEffect(() => {
    api.healthCheck().then(() => setDbStatus('ok')).catch(() => setDbStatus('error'));
  }, []);

  const showToast = (mensaje, tipo = 'success') => {
    setToast({ mensaje, tipo });
    setTimeout(() => setToast(null), 3000);
  };

  const cargarDatos = async (s) => {
    try {
      if (s === 'productos') setProductos((await api.getProductos()).data);
      if (s === 'marcas') setMarcas((await api.getMarcas()).data);
      if (s === 'categorias') setCategorias((await api.getCategorias()).data);
      if (s === 'clientes') setClientes((await api.getClientes()).data);
      if (s === 'ventas') setVentas((await api.getVentas()).data);
      if (s === 'inventario') setInventario((await api.getInventario()).data);
      if (s === 'inicio') {
        const [p, m, c, v, r] = await Promise.all([
          api.getProductos(), api.getMarcas(), api.getCategorias(),
          api.getVentas(), api.getResumen()
        ]);
        setProductos(p.data); setMarcas(m.data); setCategorias(c.data);
        setVentas(v.data); setResumen(r.data);
      }
    } catch {
      showToast('Error al cargar datos', 'error');
    }
  };

  useEffect(() => { cargarDatos(seccion); }, [seccion]);

  const handleGuardar = async (tipo, datos, idEditando) => {
    try {
      if (tipo === 'producto') idEditando ? await api.updateProducto(idEditando, datos) : await api.createProducto(datos);
      else if (tipo === 'marca') idEditando ? await api.updateMarca(idEditando, datos) : await api.createMarca(datos);
      else if (tipo === 'categoria') idEditando ? await api.updateCategoria(idEditando, datos) : await api.createCategoria(datos);
      else if (tipo === 'cliente') idEditando ? await api.updateCliente(idEditando, datos) : await api.createCliente(datos);
      else if (tipo === 'venta') await api.createVenta(datos);
      else if (tipo === 'movimiento') await api.createMovimiento(datos);
      showToast('Guardado correctamente');
      setModal(null);
      cargarDatos(seccion);
    } catch (err) {
      showToast(err.response?.data?.error || 'Error al guardar', 'error');
    }
  };

  const handleEliminar = async (tipo, id) => {
    if (!window.confirm('¿Eliminar este registro?')) return;
    try {
      if (tipo === 'producto') await api.deleteProducto(id);
      else if (tipo === 'marca') await api.deleteMarca(id);
      else if (tipo === 'categoria') await api.deleteCategoria(id);
      else if (tipo === 'cliente') await api.deleteCliente(id);
      else if (tipo === 'venta') await api.deleteVenta(id);
      else if (tipo === 'movimiento') await api.deleteMovimiento(id);
      showToast('Eliminado correctamente');
      cargarDatos(seccion);
    } catch (err) {
      showToast(err.response?.data?.error || 'No se puede eliminar', 'error');
    }
  };

  const getIdEditando = () => {
    const d = modal?.datos;
    return d?.id_producto || d?.id_marca || d?.id_categoria || d?.id_cliente;
  };

  const renderForm = () => {
    const props = { onSave: (datos) => handleGuardar(modal.tipo, datos, getIdEditando()), onClose: () => setModal(null) };
    switch (modal.tipo) {
      case 'producto': return <FormProducto datos={modal.datos} marcas={marcas} categorias={categorias} {...props} />;
      case 'marca': return <FormMarca datos={modal.datos} {...props} />;
      case 'categoria': return <FormCategoria datos={modal.datos} {...props} />;
      case 'cliente': return <FormCliente datos={modal.datos} {...props} />;
      case 'venta': return <FormVenta clientes={clientes} productos={productos} {...props} />;
      case 'movimiento': return <FormMovimiento productos={productos} {...props} />;
      default: return null;
    }
  };

  return (
    <div className="app">
      <Navbar seccion={seccion} onChange={setSeccion} SECCIONES={SECCIONES} />

      <main className="main-content">
        {seccion === 'inicio' && <Inicio resumen={resumen} productos={productos} categorias={categorias} />}
        {seccion === 'productos' && <Productos data={productos} onEdit={(p) => setModal({ tipo: 'producto', datos: p })} onDelete={(id) => handleEliminar('producto', id)} onAdd={() => setModal({ tipo: 'producto', datos: null })} />}
        {seccion === 'marcas' && <Marcas data={marcas} onEdit={(m) => setModal({ tipo: 'marca', datos: m })} onDelete={(id) => handleEliminar('marca', id)} onAdd={() => setModal({ tipo: 'marca', datos: null })} />}
        {seccion === 'categorias' && <Categorias data={categorias} onEdit={(c) => setModal({ tipo: 'categoria', datos: c })} onDelete={(id) => handleEliminar('categoria', id)} onAdd={() => setModal({ tipo: 'categoria', datos: null })} />}
        {seccion === 'clientes' && <Clientes data={clientes} onEdit={(c) => setModal({ tipo: 'cliente', datos: c })} onDelete={(id) => handleEliminar('cliente', id)} onAdd={() => setModal({ tipo: 'cliente', datos: null })} />}
        {seccion === 'ventas' && <Ventas data={ventas} onAdd={() => setModal({ tipo: 'venta', datos: null })} onDelete={(id) => handleEliminar('venta', id)} />}
        {seccion === 'inventario' && <Inventario data={inventario} onAdd={() => setModal({ tipo: 'movimiento', datos: null })} onDelete={(id) => handleEliminar('movimiento', id)} />}
        {seccion === 'reportes' && <Reportes />}
        {seccion === 'consultas' && <Consultas />}
        {seccion === 'configuracion' && <Configuracion dbStatus={dbStatus} />}
      </main>

      <Footer />

      {modal && (
        <Modal onClose={() => setModal(null)}>
          {renderForm()}
        </Modal>
      )}

      {toast && <Toast mensaje={toast.mensaje} tipo={toast.tipo} />}
    </div>
  );
}

export default App;