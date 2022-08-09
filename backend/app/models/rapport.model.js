const mongoose = require("mongoose");

const RapportSchema = mongoose.Schema({
  
  titreR: {
    type: String,
  },
  heure: {
    type: String,
  },
  idSoc: {
    type: String,
  },
  rapportInfo: {
    type: Array,
  },
  tache: 
      {type: mongoose.Schema.Types.ObjectId ,
      ref:'taches',
      sparse:true ,
      unique: [true]}
  
});



const Rapport = mongoose.model("Rapport", RapportSchema);


module.exports = { Rapport};
