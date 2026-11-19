import { useState } from 'react';

// =========================================================
// PRODUCTO
// =========================================================
export function FormProducto({ datos, marcas, categorias, onSave, onClose }) {
  const [form, setForm] = useState(datos || {
    nombre: '', descripcion: '', tono: '', precio: '', stock: '',
    fecha_caducidad: '', id_marca: '', id_categoria: '', imagen: ''
  });
  const [error, setError] = useState('');
  const h = (c, v) => setForm({ ...form, [c]: v });

  const submit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.precio || !form.id_marca || !form.id_categoria) {
      setError('Completa los campos obligatorios');
      return;
    }
    onSave({ ...form, precio: Number(form.precio), stock: Number(form.stock || 0),
      id_marca: Number(form.id_marca), id_categoria: Number(form.id_categoria) });
  };

  return (
    <form onSubmit={submit} className="modal-form">
      <h3>{datos ? 'Editar' : 'Nuevo'} Producto</h3>
      {error && <div className="form-error">{error}</div>}
      <label>Nombre *<input required value={form.nombre} onChange={e => h('nombre', e.target.value)} /></label>
      <label>Descripción<textarea value={form.descripcion} onChange={e => h('descripcion', e.target.value)} /></label>
      <label>Tono<input value={form.tono} onChange={e => h('tono', e.target.value)} /></label>
      <div className="form-row">
        <label>Precio *<input type="number" step="0.01" required value={form.precio} onChange={e => h('precio', e.target.value)} /></label>
        <label>Stock<input type="number" value={form.stock} onChange={e => h('stock', e.target.value)} /></label>
      </div>
      <label>Fecha de caducidad<input type="date" value={form.fecha_caducidad || ''} onChange={e => h('fecha_caducidad', e.target.value)} /></label>
      <label>Marca *
        <select required value={form.id_marca} onChange={e => h('id_marca', e.target.value)}>
          <option value="">Selecciona...</option>
          {marcas.map(m => <option key={m.id_marca} value={m.id_marca}>{m.nombre}</option>)}
        </select>
      </label>
      <label>Categoría *
        <select required value={form.id_categoria} onChange={e => h('id_categoria', e.target.value)}>
          <option value="">Selecciona...</option>
          {categorias.map(c => <option key={c.id_categoria} value={c.id_categoria}>{c.nombre}</option>)}
        </select>
      </label>
      <label>Ruta de imagen<input value={form.imagen} onChange={e => h('imagen', e.target.value)} placeholder="/img/producto.png" /></label>
      <div className="modal-actions">
        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
        <button type="submit" className="btn btn-primary">Guardar</button>
      </div>
    </form>
  );
}

// =========================================================
// MARCA
// =========================================================
export function FormMarca({ datos, onSave, onClose }) {
  const [form, setForm] = useState(datos || { nombre: '', pais_origen: '', descripcion: '' });
  const h = (c, v) => setForm({ ...form, [c]: v });
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (!form.nombre) return; onSave(form); }} className="modal-form">
      <h3>{datos ? 'Editar' : 'Nueva'} Marca</h3>
      <label>Nombre *<input required value={form.nombre} onChange={e => h('nombre', e.target.value)} /></label>
      <label>País de origen<input value={form.pais_origen} onChange={e => h('pais_origen', e.target.value)} /></label>
      <label>Descripción<textarea value={form.descripcion} onChange={e => h('descripcion', e.target.value)} /></label>
      <div className="modal-actions">
        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
        <button type="submit" className="btn btn-primary">Guardar</button>
      </div>
    </form>
  );
}

// =========================================================
// CATEGORIA
// =========================================================
export function FormCategoria({ datos, onSave, onClose }) {
  const [form, setForm] = useState(datos || { nombre: '', descripcion: '' });
  const h = (c, v) => setForm({ ...form, [c]: v });
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (!form.nombre) return; onSave(form); }} className="modal-form">
      <h3>{datos ? 'Editar' : 'Nueva'} Categoría</h3>
      <label>Nombre *<input required value={form.nombre} onChange={e => h('nombre', e.target.value)} /></label>
      <label>Descripción<textarea value={form.descripcion} onChange={e => h('descripcion', e.target.value)} /></label>
      <div className="modal-actions">
        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
        <button type="submit" className="btn btn-primary">Guardar</button>
      </div>
    </form>
  );
}

// =========================================================
// CLIENTE
// =========================================================
export function FormCliente({ datos, onSave, onClose }) {
  const [form, setForm] = useState(datos || { nombre: '', correo: '', telefono: '' });
  const h = (c, v) => setForm({ ...form, [c]: v });
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (!form.nombre) return; onSave(form); }} className="modal-form">
      <h3>{datos ? 'Editar' : 'Nuevo'} Cliente</h3>
      <label>Nombre *<input required value={form.nombre} onChange={e => h('nombre', e.target.value)} /></label>
      <label>Correo<input type="email" value={form.correo} onChange={e => h('correo', e.target.value)} /></label>
      <label>Teléfono<input value={form.telefono} onChange={e => h('telefono', e.target.value)} /></label>
      <div className="modal-actions">
        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
        <button type="submit" className="btn btn-primary">Guardar</button>
      </div>
    </form>
  );
}

// =========================================================
// VENTA
// =========================================================
export function FormVenta({ clientes, productos, onSave, onClose }) {
  const [id_cliente, setIdCliente] = useState('');
  const [metodo_pago, setMetodo] = useState('Tarjeta');
  const [items, setItems] = useState([{ id_producto: '', cantidad: 1, precio_unitario: 0 }]);

  const addItem = () => setItems([...items, { id_producto: '', cantidad: 1, precio_unitario: 0 }]);
  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));
  const updateItem = (i, campo, valor) => {
    const copy = [...items];
    copy[i][campo] = campo === 'id_producto' ? valor : Number(valor);
    if (campo === 'id_producto') {
      const prod = productos.find(p => p.id_producto === Number(valor));
      if (prod) copy[i].precio_unitario = Number(prod.precio);
    }
    setItems(copy);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!id_cliente || items.some(i => !i.id_producto || i.cantidad < 1)) return;
    onSave({ id_cliente: Number(id_cliente), metodo_pago, items });
  };

  return (
    <form onSubmit={submit} className="modal-form">
      <h3>Nueva Venta</h3>
      <label>Cliente *
        <select required value={id_cliente} onChange={e => setIdCliente(e.target.value)}>
          <option value="">Selecciona...</option>
          {clientes.map(c => <option key={c.id_cliente} value={c.id_cliente}>{c.nombre}</option>)}
        </select>
      </label>
      <label>Método de pago
        <select value={metodo_pago} onChange={e => setMetodo(e.target.value)}>
          <option>Tarjeta</option><option>Efectivo</option><option>Transferencia</option>
        </select>
      </label>
      <div className="venta-items">
        <strong>Productos</strong>
        {items.map((it, i) => (
          <div key={i} className="venta-item">
            <select value={it.id_producto} onChange={e => updateItem(i, 'id_producto', e.target.value)}>
              <option value="">Producto...</option>
              {productos.map(p => <option key={p.id_producto} value={p.id_producto}>{p.nombre} - ${p.precio}</option>)}
            </select>
            <input type="number" min="1" value={it.cantidad} onChange={e => updateItem(i, 'cantidad', e.target.value)} placeholder="Cant." />
            <input type="number" step="0.01" value={it.precio_unitario} onChange={e => updateItem(i, 'precio_unitario', e.target.value)} placeholder="Precio" />
            <button type="button" className="btn-icon" onClick={() => removeItem(i)}>×</button>
          </div>
        ))}
        <button type="button" className="btn btn-secondary" onClick={addItem}>+ Agregar producto</button>
      </div>
      <div className="modal-actions">
        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
        <button type="submit" className="btn btn-primary">Registrar venta</button>
      </div>
    </form>
  );
}

// =========================================================
// MOVIMIENTO DE INVENTARIO
// =========================================================
export function FormMovimiento({ productos, onSave, onClose }) {
  const [form, setForm] = useState({ id_producto: '', tipo_movimiento: 'Entrada', cantidad: '', motivo: '' });
  const h = (c, v) => setForm({ ...form, [c]: v });
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      if (!form.id_producto || !form.cantidad) return;
      onSave({ ...form, id_producto: Number(form.id_producto), cantidad: Number(form.cantidad) });
    }} className="modal-form">
      <h3>Nuevo Movimiento</h3>
      <label>Producto *
        <select required value={form.id_producto} onChange={e => h('id_producto', e.target.value)}>
          <option value="">Selecciona...</option>
          {productos.map(p => <option key={p.id_producto} value={p.id_producto}>{p.nombre}</option>)}
        </select>
      </label>
      <label>Tipo *
        <select value={form.tipo_movimiento} onChange={e => h('tipo_movimiento', e.target.value)}>
          <option>Entrada</option><option>Salida</option><option>Ajuste</option>
        </select>
      </label>
      <label>Cantidad *<input type="number" min="1" required value={form.cantidad} onChange={e => h('cantidad', e.target.value)} /></label>
      <label>Motivo<input value={form.motivo} onChange={e => h('motivo', e.target.value)} /></label>
      <div className="modal-actions">
        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
        <button type="submit" className="btn btn-primary">Guardar</button>
      </div>
    </form>
  );
}