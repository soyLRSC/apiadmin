const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.baseUrl.split('/').pop(); // ejemplo: "administradores"
    const uploadPath = path.join(__dirname, `../uploads/${folder}`);

    // 🔧 Crear la carpeta si no existe
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // evita nombres repetidos
  }
});

const upload = multer({ storage });

module.exports = upload;