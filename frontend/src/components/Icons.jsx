// Iconos SVG profesionales para Xóchitl Beauty
const Icon = ({ path, size = 18, className = '' }) => (
  <svg xmlns="https://mx.pinterest.com/pin/1083608360378697625/" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
    strokeLinejoin="round" className={`icon ${className}`}>
    {path}
  </svg>
);

export const FlorIcon = ({ size }) => (
  <Icon size={size} path={
    <>
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 2a3 3 0 0 1 3 3c0 1.5-1 2.5-3 4.5-2-2-3-3-3-4.5a3 3 0 0 1 3-3z" />
      <path d="M22 12a3 3 0 0 1-3 3c-1.5 0-2.5-1-4.5-3 2-2 3-3 4.5-3a3 3 0 0 1 3 3z" />
      <path d="M12 22a3 3 0 0 1-3-3c0-1.5 1-2.5 3-4.5 2 2 3 3 3 4.5a3 3 0 0 1-3 3z" />
      <path d="M2 12a3 3 0 0 1 3-3c1.5 0 2.5 1 4.5 3-2 2-3 3-4.5 3a3 3 0 0 1-3-3z" />
    </>
  } />
);

export const LabialIcon = ({ size }) => (
  <Icon size={size} path={
    <>
      <path d="M9 2h6v4l-1 2v14h-4V8l-1-2z" />
      <path d="M9 6h6" />
    </>
  } />
);

export const EtiquetaIcon = ({ size }) => (
  <Icon size={size} path={
    <>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <circle cx="7" cy="7" r="1.5" />
    </>
  } />
);

export const FlorSimpleIcon = ({ size }) => (
  <Icon size={size} path={
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 9V3M12 21v-6M9 12H3M21 12h-6" />
    </>
  } />
);

export const PersonaIcon = ({ size }) => (
  <Icon size={size} path={
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </>
  } />
);

export const TarjetaIcon = ({ size }) => (
  <Icon size={size} path={
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <path d="M6 15h4" />
    </>
  } />
);

export const CajaIcon = ({ size }) => (
  <Icon size={size} path={
    <>
      <path d="M21 8l-9-5-9 5 9 5 9-5z" />
      <path d="M3 8v8l9 5 9-5V8" />
      <path d="M12 13v8" />
    </>
  } />
);

export const GraficaIcon = ({ size }) => (
  <Icon size={size} path={
    <>
      <path d="M3 3v18h18" />
      <path d="M7 15l4-4 3 3 5-6" />
    </>
  } />
);

export const LupaIcon = ({ size }) => (
  <Icon size={size} path={
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  } />
);

export const ConfigIcon = ({ size }) => (
  <Icon size={size} path={
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
    </>
  } />
);

export const EditIcon = ({ size = 16 }) => (
  <Icon size={size} path={
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4z" />
    </>
  } />
);

export const TrashIcon = ({ size = 16 }) => (
  <Icon size={size} path={
    <>
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    </>
  } />
);

export const PlusIcon = ({ size = 16 }) => (
  <Icon size={size} path={<><path d="M12 5v14M5 12h14" /></>} />
);

export const CloseIcon = ({ size = 16 }) => (
  <Icon size={size} path={<><path d="M18 6L6 18M6 6l12 12" /></>} />
);

export const MenuIcon = ({ size = 22 }) => (
  <Icon size={size} path={<><path d="M3 6h18M3 12h18M3 18h18" /></>} />
);

export const CheckIcon = ({ size = 16 }) => (
  <Icon size={size} path={<><path d="M20 6L9 17l-5-5" /></>} />
);

export const AlertIcon = ({ size = 16 }) => (
  <Icon size={size} path={
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </>
  } />
);