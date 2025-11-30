const xprs = require("express");
const router = xprs.Router();
const usuariosController = require ("../constrollers/usuarios");
const upload = require("../midleware/upload");


//rutas 

router.get("/", usuariosController.ObtenerUsuarios);
router.get("/:id", usuariosController.ObtenerUsuariosid);
router.post("/", usuariosController.CrearUsuario);
router.put("/:id", usuariosController.actualizarUsuario);
router.delete("/:id", usuariosController.EliminarUsuario);

module.exports = router; 
