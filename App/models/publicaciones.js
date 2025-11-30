const mongoose = require('mongoose');

const publicacionesSchema = new mongoose.Schema({
  imagen: { 
    type: String, 
    required: true },
  recurso: { 
    type: String, 
    required: true },
  titulo:{ 
    type: String,
    required: true },
  descripcion:{
    type: String,
    required: true },
fecha: {
  type: Date,
  required: true,
  default: Date.now
}

  
}, 


)



module.exports = mongoose.model('publicaciones', publicacionesSchema);
