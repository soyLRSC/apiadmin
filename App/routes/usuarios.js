const xprs = require("express");
const router = xprs.Router();
const usuariosController = require ("../constrollers/usuarios");
const upload = require("../midleware/upload");
const authMiddleware = require("../middleware/authMiddleware");


//rutas 

router.get("/", authMiddleware, usuariosController.ObtenerUsuarios);
router.get("/:id", authMiddleware, usuariosController.ObtenerUsuariosid);
router.post("/", authMiddleware, upload.single("imagen"), usuariosController.CrearUsuario);
router.put("/:id", authMiddleware, upload.single("imagen"), usuariosController.actualizarUsuario);
router.delete("/:id", authMiddleware, usuariosController.EliminarUsuario);

module.exports = router; 
