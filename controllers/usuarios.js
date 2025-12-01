const usuarios = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const JsonResponse = require('../utils/JsonResponse');


//OBTENER TODOS 
exports.ObtenerUsuarios = async(req, res) =>{
    const data = await usuarios.find();
    res.json(data);
};


exports.ObtenerUsuariosid = async(req, res) =>{
    const usuarioid = await usuarios.findById(req.params.id);
    if (!usuarioid) return res.json({mensaje: "Usuario no encontrado"});
    res.json(usuarioid);

}

//crear 
exports.CrearUsuario = async(req,res) =>{
    try {
    const {
      nfc_uid,
      email,
      password,
      nombre,
      ap_paterno,
      ap_materno,
      rol,
      imagen,
      carrera,
      sede,
      gradogrupo,
      turno,
      id_tutor,
      curp,
      alergia,
      sangre,
      telefono,
      segurosocial
    } = req.body;

    // Validaciones generales
    if (!email || !password || !nombre || !ap_paterno || !ap_materno || !rol ) {
      return res.status(400).json(JsonResponse(false, "Faltan campos obligatorios", null));
    }

    // Validaciones específicas por rol
    if (rol === "tutor" && !gradogrupo) {
      return res.status(400).json(JsonResponse(false, "El tutor debe tener grado/grupo", null));
    }

    if (rol === "medico" && !turno) {
      return res.status(400).json(JsonResponse(false, "El médico debe tener turno", null));
    }

    if (rol === "alumno") {
      if (!id_tutor || !curp || !segurosocial || !carrera || !sede) {
        return res.status(400).json(JsonResponse(false, "El alumno debe tener tutor, CURP y seguro social", null));
      }
    }

    // Verificar si el email ya existe
    const existeUsuario = await usuarios.findOne({ email });
    if (existeUsuario) {
      return res.status(400).json(JsonResponse(false, "El email ya está registrado", null));
    }

    const existeNfc = await usuarios.findOne({ nfc_uid });
    if (existeNfc){
      return res.status(400).json(JsonResponse(false, "La tarjeta NFC esta registrada en otra persona", null));
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario
    const usuario = new usuarios({
      nfc_uid,
      email,
      password: hashedPassword,
      nombre,
      ap_paterno,
      ap_materno,
      rol,
      imagen: req.file ? req.file.filename : null,
      gradogrupo,
      carrera,
      sede,
      turno,
      id_tutor,
      curp,
      alergia,
      sangre,
      telefono,
      segurosocial
    });

     await usuario.save();

    return res.status(201).json(JsonResponse(true, "Usuario creado correctamente", usuario));
  } catch (error) {
    return res.status(500).json(JsonResponse(false, "Error al crear usuario", error.message));
  }
};

//actualizar 
exports.ActualizarUsuario = async(req,res) =>{
    
    try {
    const { id } = req.params;
    const {
      nfc_uid,
      email,
      password,
      nombre,
      ap_paterno,
      ap_materno,
      rol,
      carrera,
      sede,
      gradogrupo,
      turno,
      id_tutor,
      curp,
      alergia,
      sangre,
      telefono,
      segurosocial
    } = req.body;

    // Buscar usuario
    const usuario = await usuarios.findById(id);
    if (!usuario) {
      return res.status(404).json(JsonResponse(false, "Usuario no encontrado", null));
    }

    // Validaciones generales
    if (!rol) {
      return res.status(400).json(JsonResponse(false, "Faltan campos obligatorios", null));
    }

    // Validaciones específicas por rol
    if (rol === "tutor" && !gradogrupo) {
      return res.status(400).json(JsonResponse(false, "El tutor debe tener grado/grupo", null));
    }

    if (rol === "medico" && !turno) {
      return res.status(400).json(JsonResponse(false, "El médico debe tener turno", null));
    }

    if (rol === "alumno") {
      if (!id_tutor || !curp || !segurosocial || !carrera || !sede) {
        return res.status(400).json(JsonResponse(false, "El alumno debe tener tutor, CURP y seguro social", null));
      }
    }

    
     // Verificar si el email ya existe en otro usuario
    if (email) {
      const existeUsuario = await usuarios.findOne({ email, _id: { $ne: id } });
      if (existeUsuario) {
        return res.status(400).json(JsonResponse(false, "El email ya está registrado por otro usuario", null));
      }
      usuario.email = email;
    }

    if(nfc_uid){
      const existeNfc = await usuarios.findOne({ nfc_uid, _id: { $ne:id}});
      if (existeNfc){
        return res.status(400).json(JsonResponse(false,"La tarjeta esta registrada en otra persona", null));

      }
      usuario.nfc_uid = nfc_uid;
    }

     // Si envía nueva contraseña, la encriptamos
    if (password) {
      const salt = await bcrypt.genSalt(10);
      usuario.password = await bcrypt.hash(password, salt);
    }


    // Actualizar campos
    usuario.nfc_uid = nfc_uid;
    usuario.email = email || usuario.email;
    usuario.nombre = nombre;
    usuario.ap_paterno = ap_paterno;
    usuario.ap_materno = ap_materno;
    usuario.rol = rol;
    usuario.gradogrupo = gradogrupo;
    usuario.carrera = carrera;
    usuario.sede = sede;
    usuario.turno = turno;
    usuario.id_tutor = id_tutor;
    usuario.curp = curp;
    usuario.alergia = alergia;
    usuario.sangre = sangre;
    usuario.telefono = telefono;
    usuario.segurosocial = segurosocial;

    await usuario.save();

    return res.status(200).json(JsonResponse(true, "Usuario actualizado correctamente", usuario));
  } catch (error) {
    return res.status(500).json(JsonResponse(false, "Error al actualizar usuario", error.message));
  }
};

//eliminar
exports.EliminarUsuario = async(req,res) =>{
   await usuarios.findByIdAndDelete(req.params.id);
   res.json({mensaje:"Usuario eliminado"}); 
}
