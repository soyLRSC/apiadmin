const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: { 
    type: String,
    required: true
  },                                                                                                                                                                                                                                                             
  nombre:{
    type: String,
    required:true    
   },
   ap_paterno: {
    type:String,
    required:true,
   },
   ap_materno:{
    type:String,
    required:true
   },
  rol: {
    type: String,
    enum: ["superadmin", "medico", "tutor", "alumno"],
    required: true
  },
  imagen:{
    type: String,
  },
  gradogrupo:{ // solo tutores
      type:String,
     

   },
   turno:{ //solo medicos
    type: String,
    
   },
   //solo para alumnos 
     id_tutor: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Usuario",  // El tutor también es un usuario con rol = tutor
       
     },

     carrera: {
        type: String,
     },
      sede: {
        type: String,

      },
   
     curp: {
       type: String,
      
     },
   
     alergia: [
       {
         type: String
       }
     ],
   
     sangre: {
       type: String
     },
   
     telefono: {
       type: String 
     },
   
     segurosocial: {
       type: String,
       
     },
     nfc_uid: { 
      type: String, 
      unique: true 
    } 

   
},
 {
  timestamps: true
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
