const xprs = require("express");
const router = xprs.Router();
const usuariosController = require ("../controllers/usuarios");
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");


//rutas 

router.get("/", authMiddleware, usuariosController.ObtenerUsuarios);
router.get("/:id", authMiddleware, usuariosController.ObtenerUsuariosid);
router.post("/", authMiddleware, upload.single("imagen"), usuariosController.CrearUsuario);
router.put("/:id", authMiddleware, upload.single("imagen"), usuariosController.ActualizarUsuario);
router.delete("/:id", authMiddleware, usuariosController.EliminarUsuario);

module.exports = router; 
