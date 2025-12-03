// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require('path');

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '../App/uploads')));


// Importar rutas
const publiRoute = require("../App/routes/publicaciones");
const justificanteRoute = require("../App/routes/justificantes");
const usuarioRoute = require("../App/routes/usuarios");
const authRoutes = require('../App/routes/authRoutes');
const nfcRoutes = require("./routes/nfcRoutes");


// Usar rutas
app.use("/api/nfc", nfcRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/publicaciones", publiRoute);
app.use("/api/justificantes", justificanteRoute);
app.use("/api/usuarios", usuarioRoute);


// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error al conectar:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Servidor corriendo en puerto ${PORT}`));