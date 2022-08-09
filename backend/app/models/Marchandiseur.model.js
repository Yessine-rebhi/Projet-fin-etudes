const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const MarchandiseurSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [false],
    },
    email: {
      type: String,
      unique: [true, "The email is unique"],
    },
    tel: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    idSoc: {
      type: String,
    },
    tache: 
      [{type: mongoose.Schema.Types.ObjectId ,
      ref:'taches',
      sparse:true ,
      unique: [true]}]
    
  },
  {
    timestamps: true,
  }
);

const Marchandiseur = mongoose.model("Marchandiseur", MarchandiseurSchema);

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required().label("Name"),
    idSoc: Joi.string().label("idSoc"),
    email: Joi.string().email().required().label("Email"),
    tel: Joi.number().required().label("tel"),
    password: passwordComplexity().required().label("Password"),
    repeat_password: Joi.any().valid(Joi.ref("password")).required().messages({
      "any.only": "Le mot de passe ne correspond pas",
    }),
  });
  return schema.validate(data);
};

module.exports = { Marchandiseur, validate };
