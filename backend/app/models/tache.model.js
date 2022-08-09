const mongoose = require("mongoose");

const TacheSchema = mongoose.Schema(
  {
    marchandiseur : {
      type: mongoose.Schema.Types.ObjectId ,
      ref:'marchandiseurs',
      sparse:true
    },
    TitreT: {
      type: String,
      required: true,
    },
    dateT: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    idSoc: {
      type: String,
    },
    rapport : {
      type: mongoose.Schema.Types.ObjectId ,
      ref:'rapports',
      sparse:true
    },
  },
  {
    timestamps: true,
  }
);

const Tache = mongoose.model("Tache", TacheSchema);



module.exports = { Tache };
