const fs = require('fs');
const path = require('path');

const estructura = [
  'controllers',
  'models',
  'routes',
  'middlewares',
  'config',
  'uploads'
];

// Archivos base
const archivos = {
  'app.js': `
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' Conectado a MongoDB'))
  .catch(err => console.error(' Error de conexión:', err));

// Importar rutas
// const ejemploRoutes = require('./routes/ejemploRoutes');
// app.use('/api/ejemplo', ejemploRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(' Servidor en puerto', PORT));
`,

  '.env': `
PORT=3000
MONGO_URI=mongodb://localhost:27017/mi_base
`,

  'models/.gitkeep': '',
  'controllers/.gitkeep': '',
  'routes/.gitkeep': '',
  'middlewares/.gitkeep': '',
  'config/.gitkeep': '',
  'uploads/.gitkeep': '',
  '.gitignore': `
node_modules
.env
uploads
`
};

// Crear carpetas
estructura.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(' Carpeta creada:', dir);
  }
});

// Crear archivos base
for (const [nombre, contenido] of Object.entries(archivos)) {
  fs.writeFileSync(path.join(__dirname, nombre), contenido.trim());
  console.log(' Archivo creado:', nombre);
}

console.log('\n Estructura base del framework creada con éxito.');