const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.baseUrl.split('/').pop();
    const uploadPath = path.join(__dirname, `../uploads/${folder}`);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// 🔥 NOTA: Ahora la imagen es opcional, pero si viene, debe ser válida
const fileFilter = (req, file, cb) => {
  if (!file) cb(null, true); // 🔥 agregado: permite no enviar archivo

  const allowedTypes = /jpeg|jpg|png|gif/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype.toLowerCase();
  if (allowedTypes.test(ext) && allowedTypes.test(mime)) cb(null, true);
  else cb(new Error("Solo se permiten imágenes (jpg, jpeg, png, gif)"));
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
