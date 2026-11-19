# 🌸 Xóchitl Beauty

Aplicación web dinámica y responsiva para una tienda ficticia de maquillaje inspirada en las flores mexicanas.

## 🛠 Tecnologías

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Base de datos:** MySQL (mysql2)
- **Comunicación:** Axios
- **Estilos:** CSS puro con diseño responsivo

## 📂 Estructura

```
PAGINA_XOCHITL/
├── backend/
│   ├── database/xochitl_beauty.sql
│   ├── src/
│   │   ├── routes/api.js
│   │   ├── db.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── public/img/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── api.js
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## 🚀 Instalación

### 1. Base de datos

1. Abre MySQL Workbench.
2. Abre una nueva consulta y ejecuta `backend/database/xochitl_beauty.sql`.
3. Verifica que se creen las 7 tablas.

### 2. Backend

```bash
cd backend
npm install
copy .env.example .env
# Edita .env con tu contraseña de MySQL
npm run dev
```

El backend corre en `http://localhost:4000`.
Prueba el health check: `http://localhost:4000/api/health`

### 3. Frontend

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

El frontend corre en `http://localhost:4000`.

## 🧪 Pruebas

- **CRUD completo** en productos, marcas, categorías, clientes.
- **Registro de ventas** con actualización automática de stock.
- **Movimientos de inventario** (entrada, salida, ajuste).
- **Reportes** desde la sección Reportes.
- **Consultas** por rango de precio.
- **Responsive** en móvil, tablet y escritorio.

## 🌐 Despliegue

### Frontend → Netlify

1. Ejecuta `npm run build` en `frontend/`.
2. Sube la carpeta `dist/` a Netlify.
3. Configura la variable `VITE_API_URL` apuntando a tu backend en Railway.

### Backend → Railway

1. Sube la carpeta `backend/` a un repositorio de GitHub.
2. Conecta el repo en Railway.
3. Configura las variables de entorno: `PORT`, `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.
4. Asegúrate de tener un proveedor MySQL (Railway, PlanetScale, Aiven, etc.).
5. Cambia el `start` script a `node src/server.js`.

## 👩‍💻 Créditos

Desarrollado por: Abi
