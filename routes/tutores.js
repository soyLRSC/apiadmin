

router.get("/tutores", async (req, res) => {
  try {
    const tutores = await Usuario.find({ rol: "tutor" })
      .select("_id nombre ap_paterno ap_materno correo");

    res.status(200).json(tutores);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener tutores", error });
  }
});