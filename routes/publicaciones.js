// App/routes/publicaciones.js
const express = require('express');
const router = express.Router();
const publicacionesController = require('../controllers/publicaciones');
const upload = require('../middleware/upload');

// recibir múltiples imágenes en el campo 'imagenes'
router.get('/', publicacionesController.obtenerPublicaciones);
router.get('/:id', publicacionesController.obtenerPublicacionid);
router.post('/', upload.array('imagenes', 20), publicacionesController.crearPublicacion);
router.put('/:id', upload.array('imagenes', 20), publicacionesController.actualizarPublicacion);
router.delete('/:id', publicacionesController.eliminarPublicacion);

module.exports = router;
