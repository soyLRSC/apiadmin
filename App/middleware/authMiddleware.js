const jwt = require("jsonwebtoken");
const config = require("../config/jwt");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ estado: false, mensaje: "Token no proporcionado" });

  const token = authHeader.split(" ")[1]; // formato: Bearer <token>
  if (!token) return res.status(401).json({ estado: false, mensaje: "Token inválido" });

  try {
    const decoded = jwt.verify(token, config.secret);
    req.user = decoded; // guardamos info del usuario en la request
    next();
  } catch (error) {
    return res.status(403).json({ estado: false, mensaje: "Token inválido o expirado" });
  }
};