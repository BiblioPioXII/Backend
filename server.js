const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const seedAdmin = require('./utils/seedAdmin');

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos y crear admin si no existe
connectDB().then(() => seedAdmin());

// Inicializar app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir carpeta de uploads (temporal, útil para debug si lo necesitas)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/libros', require('./routes/bookRoutes'));
app.use('/api/prestamos', require('./routes/loanRoutes'));
app.use('/api/repositorio', require('./routes/repositoryRoutes'));
app.use('/api/galeria', require('./routes/galleryRoutes'));
app.use('/api/proxy', require('./routes/proxyRoutes'));


// Ruta base
app.get('/', (req, res) => {
  res.send('API de Biblioteca PIO XII');
});

// Levantar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
