// App/controllers/publicaciones.js
const publicacionesModel = require('../models/publicaciones');
const path = require('path');

const uploadsBaseUrl = '/uploads/publicaciones'; // asegúrate en index.js servir /uploads

// Obtener todos
exports.obtenerPublicaciones = async (req, res) => {
  try {
    const data = await publicacionesModel.find();
    res.json({ datos: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener publicaciones' });
  }
};

// Obtener uno
exports.obtenerPublicacionid = async (req, res) => {
  try {
    const publi = await publicacionesModel.findById(req.params.id);
    if (!publi) return res.status(404).json({ mensaje: "Publicacion no encontrada" });
    res.json(publi);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener publicación' });
  }
};

// Crear
exports.crearPublicacion = async (req, res) => {
  try {
    // textos y videos pueden venir en body
    const texto = req.body.texto || '';
    const videos = req.body.videos ? JSON.parse(req.body.videos) : [];

    // imagenesKeep: imágenes que ya existen y quieres mantener (desde UI)
    const imagenesKeep = req.body.imagenesKeep ? JSON.parse(req.body.imagenesKeep) : [];

    // imagenesMeta: array JSON con metadata para los archivos subidos (en el mismo orden)
    const imagenesMeta = req.body.imagenesMeta ? JSON.parse(req.body.imagenesMeta) : [];

    const imagenes = [];

    // primero, agrega las imagenes "keep" (si las hay)
    if (Array.isArray(imagenesKeep)) {
      imagenesKeep.forEach(i => {
        // cada 'i' debería tener { id, title, caption, src }
        imagenes.push(i);
      });
    }

    // luego, procesa los archivos nuevos subidos (req.files)
    if (req.files && req.files.length > 0) {
      req.files.forEach((file, idx) => {
        const meta = Array.isArray(imagenesMeta) ? imagenesMeta[idx] || {} : {};
        imagenes.push({
          id: meta.id || Date.now().toString() + '-' + idx,
          title: meta.title || '',
          caption: meta.caption || '',
          src: path.posix.join(uploadsBaseUrl, file.filename) // /uploads/publicaciones/<filename>
        });
      });
    }

    const nueva = new publicacionesModel({
      texto,
      imagenes,
      videos
    });

    await nueva.save();
    res.json({ mensaje: "Publicación creada correctamente", datos: nueva });

  } catch (err) {
    console.error('Error crearPublicacion:', err);
    res.status(500).json({ error: 'Error al crear publicación' });
  }
};

// Actualizar
exports.actualizarPublicacion = async (req, res) => {
  try {
    const texto = req.body.texto || '';
    const videos = req.body.videos ? JSON.parse(req.body.videos) : [];
    const imagenesKeep = req.body.imagenesKeep ? JSON.parse(req.body.imagenesKeep) : [];
    const imagenesMeta = req.body.imagenesMeta ? JSON.parse(req.body.imagenesMeta) : [];

    const imagenes = [];

    if (Array.isArray(imagenesKeep)) {
      imagenesKeep.forEach(i => imagenes.push(i));
    }

    if (req.files && req.files.length > 0) {
      req.files.forEach((file, idx) => {
        const meta = Array.isArray(imagenesMeta) ? imagenesMeta[idx] || {} : {};
        imagenes.push({
          id: meta.id || Date.now().toString() + '-' + idx,
          title: meta.title || '',
          caption: meta.caption || '',
          src: path.posix.join(uploadsBaseUrl, file.filename)
        });
      });
    }

    const updateData = { texto, imagenes, videos };

    const actualizado = await publicacionesModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ mensaje: "Publicación actualizada", datos: actualizado });

  } catch (err) {
    console.error('Error actualizarPublicacion:', err);
    res.status(500).json({ error: 'Error al actualizar publicación' });
  }
};

// Eliminar
exports.eliminarPublicacion = async (req, res) => {
  try {
    await publicacionesModel.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Publicación eliminada" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar publicación' });
  }
};
