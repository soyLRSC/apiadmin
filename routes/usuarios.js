const xprs = require("express");
const router = xprs.Router();
const usuariosController = require ("../controllers/usuarios");
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");
const Usuario = require("../models/Usuario");

//rutas 

router.get("/",  usuariosController.ObtenerUsuarios);
router.get("/tutores", async (req, res) => {
  try {
    const tutores = await Usuario.find({ rol: "tutor" })
      .select("_id nombre ap_paterno ap_materno");

    res.status(200).json(tutores);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener tutores", error });
  }
});
router.get("/:id",  usuariosController.ObtenerUsuariosid);
router.post("/", upload.single("imagen"), usuariosController.CrearUsuario);
router.put("/:id", upload.single("imagen"), usuariosController.ActualizarUsuario);
router.delete("/:id", usuariosController.EliminarUsuario);







module.exports = router; 
