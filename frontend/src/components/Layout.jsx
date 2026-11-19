import { useState } from 'react';
import { FlorIcon, EditIcon, TrashIcon, PlusIcon, CloseIcon, MenuIcon, CheckIcon, AlertIcon } from './Icons.jsx';

// =========================================================
// NAVBAR
// =========================================================
export function Navbar({ seccion, onChange, SECCIONES }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-brand" onClick={() => onChange('inicio')}>
        <FlorIcon size={26} />
        <span className="brand-text">ABBY <span className="brand-accent">Beauty</span></span>
      </div>
      <button className="hamburger" onClick={() => setMenuAbierto(!menuAbierto)} aria-label="Menú">
        <MenuIcon />
      </button>
      <nav className={`nav-links ${menuAbierto ? 'open' : ''}`}>
        {SECCIONES.map(s => (
          <button
            key={s.id}
            className={`nav-link ${seccion === s.id ? 'active' : ''}`}
            onClick={() => { onChange(s.id); setMenuAbierto(false); }}
          >
            <s.icon size={16} />
            <span className="nav-label">{s.label}</span>
          </button>
        ))}
      </nav>
    </header>
  );
}

// =========================================================
// FOOTER
// =========================================================
export function Footer() {
  return (
    <footer className="footer">
      <p>ABBY Beauty © 2026 — Belleza inspirada en flores mexicanas</p>
      <p className="creditos">Desarrollado por: Abi Rosales</p>
    </footer>
  );
}

// =========================================================
// MODAL
// =========================================================
export function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  );
}

// =========================================================
// TOAST
// =========================================================
export function Toast({ mensaje, tipo = 'success' }) {
  return (
    <div className={`toast ${tipo}`}>
      {tipo === 'success' ? <CheckIcon /> : <AlertIcon />}
      <span>{mensaje}</span>
    </div>
  );
}

// =========================================================
// TABLA
// =========================================================
export function Tabla({ columns, data, onEdit, onDelete, keyField }) {
  if (!data || data.length === 0) return <p className="empty">No hay registros.</p>;
  return (
    <div className="table-wrap">
      <table className="tabla">
        <thead>
          <tr>{columns.map(c => <th key={c.key}>{c.label}</th>)}<th>Acciones</th></tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row[keyField]}>
              {columns.map(c => <td key={c.key}>{row[c.key]}</td>)}
              <td className="acciones">
                {onEdit && (
                  <button className="btn-icon" onClick={() => onEdit(row)} title="Editar">
                    <EditIcon />
                  </button>
                )}
                {onDelete && (
                  <button className="btn-icon danger" onClick={() => onDelete(row[keyField])} title="Eliminar">
                    <TrashIcon />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// =========================================================
// STAT CARD
// =========================================================
export function StatCard({ icon: IconComp, label, value, color }) {
  return (
    <div className={`stat-card ${color || ''}`}>
      <div className="stat-icon"><IconComp size={28} /></div>
      <div className="stat-info">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
}

// =========================================================
// SECCION HEADER
// =========================================================
export function SeccionHeader({ titulo, onAdd }) {
  return (
    <div className="seccion-header">
      <h2>{titulo}</h2>
      {onAdd && (
        <button className="btn btn-primary" onClick={onAdd}>
          <PlusIcon /> Agregar
        </button>
      )}
    </div>
  );
}