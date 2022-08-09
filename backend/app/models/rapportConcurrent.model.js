const mongoose = require("mongoose");

const RapportConcurrentSchema = mongoose.Schema({
  Marchandiseur: {
    type: String,
  },
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



const RapportConcurrent = mongoose.model("RapportConcurrent", RapportConcurrentSchema);


module.exports = { RapportConcurrent};
