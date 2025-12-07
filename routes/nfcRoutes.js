const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");
const Acceso = require("../models/acceso");

// Recibir UID desde la ESP32
router.post("/uid", async (req, res) => {
  try {
    const { uid } = req.body;


    // Buscar usuario por UID
    const usuario = await Usuario.findOne({ nfc_uid: uid });
    if (!usuario) {
      return res.status(404).json({ estado: false, mensaje: "Usuario no encontrado" });
    }

    // Verificar si ya tiene un acceso abierto (sin horaSalida)
    let acceso = await Acceso.findOne({ usuario: usuario._id, horaSalida: null }).populate('usuario');

    if (!acceso) {
      // Registrar entrada
      acceso = new Acceso({ usuario: usuario._id, consultorio: "CCD" });
      await acceso.save();
      return res.json({ estado: true, mensaje: "Entrada registrada", acceso });
    } else {
      // Registrar salida
      acceso.horaSalida = new Date();
      await acceso.save();
      return res.json({ estado: true, mensaje: "Salida registrada", acceso });
    }

  } catch (error) {
    return res.status(500).json({ estado: false, mensaje: "Error en el servidor", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const accesos = await Acceso.find().populate("usuario");
    res.json(accesos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;