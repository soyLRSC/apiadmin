const mongoose = require ('mongoose');

const justificantesSchema = new mongoose.Schema({
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    },
    documento:{
        type: String,
        required: true,
    },
    imagen:{
        type: String
    },
    fechaInicio:{
        type: Date,
        required: true,
    },
    fechaFin:{
        type:Date,
    },
    estatus:{
        type: String,
        enum:["pendiente","aceptado","rechazado"],
        default: "pendiente"
    },
},{
    timestamps:true,

});

module.exports = mongoose.model('justificante', justificantesSchema);
