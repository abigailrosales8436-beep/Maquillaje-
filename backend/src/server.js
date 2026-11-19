import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Ruta de verificación para probar el dominio en Railway
app.get('/', (req, res) => {
  res.send('🌸 Xóchitl Beauty API funcionando en producción');
});

// Rutas de la API
app.use('/api', apiRouter);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌸 Xóchitl Beauty API corriendo en el puerto ${PORT}`);
});