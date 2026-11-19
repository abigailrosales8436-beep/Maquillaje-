import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`🌸 Xóchitl Beauty API corriendo en http://localhost:${PORT}`);
});