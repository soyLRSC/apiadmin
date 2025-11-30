const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/jwt");
const JsonResponse = require("../utils/JsonResponse");

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(404).json(JsonResponse(false, "Usuario no encontrado", null));

    // Validar contraseña
    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) return res.status(401).json(JsonResponse(false, "Contraseña incorrecta", null));

    // Generar token
    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol, email: usuario.email },
      config.secret,
      { expiresIn: config.expiresIn }
    );

    return res.json(JsonResponse(true, "Login exitoso", { token }));
  } catch (error) {
    return res.status(500).json(JsonResponse(false, "Error en login", error.message));
  }
};