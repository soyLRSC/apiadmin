const publicaciones = require('../models/publicaciones');


// OBTENER TODOS
exports.obtenerPublicaciones = async (req, res) => {
  const data = await publicaciones.find();
  res.json(data);
};

// OBTENER UNO
exports.obtenerPublicacionid = async (req, res) => {
  const publi = await publicaciones.findById(req.params.id);
  if (!publi) return res.status(404).json({ mensaje: "Publicacion no encontrada" });
  res.json(publi);
};

// CREAR
exports.crearPublicacion = async (req, res) => {
  const nuevo = new publicaciones({
    descripcion: req.body.descripcion,
    recurso: req.body.recurso,
    titulo: req.body.titulo,
    fecha: req.body.fecha,
    imagen: req.file ? req.file.filename : null
  });
  await nuevo.save();
  res.json({ mensaje: "Publicacion creada", data: nuevo });
};

// ACTUALIZAR
exports.actualizarPublicacion = async (req, res) => {
  const actualizado = await publicaciones.findByIdAndUpdate(
    req.params.id,
    { ...req.body, imagen: req.file ? req.file.filename : undefined },
    { new: true }
  );
  res.json({ mensaje: "Publicacion actualizada", data: actualizado });
};

// ELIMINAR
exports.eliminarPublicacion = async (req, res) => {
  await publicaciones.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Publicacion eliminada" });
};