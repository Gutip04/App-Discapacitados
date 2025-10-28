import express from 'express'
import barrioRoutes from './routes/BarrioRoutes.js';
import epsRoutes from './routes/EpsRoutes.js'
import pacienteRoutes from './routes/PacienteRoutes.js'
import veredaRoutes from './routes/VeredaRoutes.js'
import authRoutes from "./routes/authRoutes.js"
import tablasRoutes from "./routes/TablasRouter.js"
import estadisticasRoutes from "./routes/estadisticasRoutes.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cookieParser())
app.use(express.json())

// CORS mejorado para producción
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL_PROD!] 
    : ["http://localhost:5173", "http://localhost:4173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

const PORT = process.env.PORT || 3000

// Rutas 
app.use('/api/barrios', barrioRoutes);
app.use('/api/veredas', veredaRoutes)
app.use('/api/eps', epsRoutes);
app.use('/api/pacientes', pacienteRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/tablas', tablasRoutes)
app.use('/api/estadisticas', estadisticasRoutes)

// Ruta de salud para verificar que el servidor funciona
app.get('/api/health', (_req, res) => {
  res.json({ 
    status: 'OK', 
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () =>{
    console.log(` Servidor funcionando en puerto: ${PORT}`);
    console.log(` Entorno: ${process.env.NODE_ENV || 'development'}`);
    console.log(` URL: http://localhost:${PORT}`);
    console.log(`  Health check: http://localhost:${PORT}/api/health`);
})