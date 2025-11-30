const justificantes = require('../models/justificantes');


//OBTENER TODOS 

exports.ObtenerJustificantes = async(req, res) =>{
    const data = await justificantes.find().populate('usuario');
    if (!data) return res.json({mensaje: "no hay justificantes"});
    res.json(data);
};

//OBTENER POR ID 
exports.ObtenrJustificantesId = async(req, res)=>{
    const justificanteid = await justificantes.findById(req.parems.id);
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
    await justificantes.findByIdAndDelete(req.params.id);
    res.json({mensaje: "justificante eliminado"});
    if (!justificantes) return res.json({mensaje: "no se pudo eliminar el jsutificante "})
}; 

