const mongoose = require("mongoose");

const accesoSchema = new mongoose.Schema({
  usuario: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Usuario", 
    required: true 
},
  consultorio: { 
    type: String, 
    required: true 
},
  horaEntrada: { 
    type: Date, 
    default: Date.now 
},
  horaSalida: { 
    type: Date 
}

}, { timestamps: true });

module.exports = mongoose.model("Acceso", accesoSchema);
