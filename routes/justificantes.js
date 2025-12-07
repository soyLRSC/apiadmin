const xprs = require("express");
const router = xprs.Router();
const justificantesController = require("../controllers/justificantes");
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");
//rutras
router.get('/alumnos', authMiddleware, justificantesController.obtenerMisJustificantes);

router.get("/",justificantesController.ObtenerJustificantes);
router.get("/:id",justificantesController.ObtenrJustificantesId);
router.post("/",upload.single('documento'), justificantesController.CrearJustificante);
router.put("/:id",upload.single('documento'), justificantesController.ActualizarJustificante);
router.delete("/:id", justificantesController.EliminarJustificante);

module.exports = router;
