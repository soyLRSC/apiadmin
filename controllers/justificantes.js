const justificantes = require('../models/justificantes');

const Usuario = require('../models/Usuario');
//OBTENER TODOS 

exports.ObtenerJustificantes = async(req, res) =>{
    const data = await justificantes.find().populate('usuario',  '_id nombre gradogrupo id_tutor');
    if (!data) return res.json({mensaje: "no hay justificantes"});
    res.json(data);
};



// Alumno: solo sus justificantes
exports.obtenerMisJustificantes = async (req, res) => {
  try {
    const justificantes = await justificantes
      .find({ usuario: req.user.id }) // 👈 aquí se filtra por el usuario del token
      .populate('usuario', '_id nombre gradogrupo id_tutor');
    res.json(justificantes);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener justificantes", error });
  }
};


// Médico: todos
exports.obtenerTodos = async (req, res) => {
  try {
    const justificantes = await justificantes.find().populate("usuario", "_id nombre gradogrupo id_tutor");
    res.json(justificantes);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener todos los justificantes", error });
  }
};

// Tutor: justificantes filtrados por grado/grupo del tutor
exports.obtenerPorGrupoTutor = async (req, res) => {
  try {
    // El tutor logueado tiene su gradogrupo en el token o en su modelo Usuario
    const grupoTutor = req.user.gradogrupo; 

    // Buscar justificantes de alumnos que coincidan con ese grupo
    const justificantes = await justificantes
      .find()
      .populate({
        path: "usuario",
        match: { gradogrupo: grupoTutor }, // 👈 filtro por grupo
        select: "_id nombre gradogrupo"
      });

    // Filtrar los que sí tienen usuario populado
    const filtrados = justificantes.filter(j => j.usuario);

    res.json(filtrados);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener justificantes por grupo", error });
  }
};

//OBTENER POR ID 
exports.ObtenrJustificantesId = async(req, res)=>{
    const justificanteid = await justificantes.findById(req.params.id);
    if (!justificanteid) return res.json({mensaje: "no hay justificantes con ese id"});
    res.json(justificanteid);
};

//CREAR JUSTIFICANTE 
exports.CrearJustificante = async(req,res)=>{
    const nuevo = new justificantes({
        usuario : req.body.usuario,
        documento : req.file ? req.file.filename : null,
        imagen: req.file ? req.file.filename: null,
        fechaInicio : req.body.fechaInicio,
        fechaFin : req.body.fechaFin,

    });
    await nuevo.save(),
    res.json({mensaje: "justificante creado con exito", data: nuevo});
    if (!nuevo) return res.json({mensaje: "no se pudo crear el justificante"});
};

//ACTUALIZAR JUSTIFICANTE 

exports.ActualizarJustificante = async(req,res)=>{
    const actualizado = await justificantes.findByIdAndUpdate(
        req.params.id,
        {...req.body, documento: req.file ? req.file.filename : undefined},
        {new:true}
        
    );
    res.json({mensaje: "justificante actualizado", data: actualizado});
    if (!actualizado) return res.json({mensaje: "no se pudo actualizar el justificante"});
};

//ELIMINAR JUSTIFICANTE 

exports.EliminarJustificante = async(req,res)=>{
    const eliminado = await justificantes.findByIdAndDelete(req.params.id);
if (!eliminado) return res.json({ mensaje: "no se pudo eliminar el justificante" });
res.json({ mensaje: "justificante eliminado" });
}; 


