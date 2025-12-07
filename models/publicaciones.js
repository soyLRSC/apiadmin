const mongoose = require('mongoose');

const publicacionesSchema = new mongoose.Schema({
  texto: {
    type: String,
    required: false
  },

  imagenes: [{
    id: { type: String, required: true },
    title: { type: String, required: false },
    caption: { type: String, required: false },
    src: { type: String, required: true } // base64 o URL
  }],

  videos: [{
    id: { type: String, required: true },
    title: { type: String, required: false },
    caption: { type: String, required: false },
    url: { type: String, required: true }
  }],

  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('publicaciones', publicacionesSchema);
