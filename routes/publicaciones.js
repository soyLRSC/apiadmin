const express = require('express');
const router = express.Router();
const publicacionesController = require('../controllers/publicaciones');
const upload = require('../middleware/upload');

// Rutas CRUD REST
router.get('/', publicacionesController.obtenerPublicaciones);
router.get('/:id', publicacionesController.obtenerPublicacionid);
router.post('/', upload.single('imagen'), publicacionesController.crearPublicacion);
router.put('/:id', upload.single('imagen'), publicacionesController.actualizarPublicacion);
router.delete('/:id', publicacionesController.eliminarPublicacion);

module.exports = router;