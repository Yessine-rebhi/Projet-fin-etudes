const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken");

const ResponsableSchema = mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: [true, "The email is unique"],
  },
  adress: {
    type: String,
    required: true,
  },
  tel: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  domaine: {
    type: String,
    required: true,
  },
  papier: {
    type: String,
    required: true,
  },
  profileImage:{
    type: String,
  },
  etat:{
    type: Boolean,
  }
});

ResponsableSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};


const Responsable = mongoose.model("responsable", ResponsableSchema);

const validate = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(2).required().label("First Name"),
    adress: Joi.string().required().label("adress"),
    email: Joi.string().email().required().label("Email"),
    tel: Joi.number().required().label("telehpone"),
    password: passwordComplexity().required().label("Password"),
    repeat_password: Joi.any().valid(Joi.ref("password")).required().messages({
      "any.only": "Le mot de passe ne correspond pas"}),
    domaine: Joi.string().required().label("domaine").messages({
      "string.empty": "Veuillez sélectionner le domaine"}),
    papier: Joi.string().required().label("papier").messages({
      "string.empty": "Veuillez sélectionner le papier"}),
      etat: Joi.boolean().required().label("etat")
  });
  return schema.validate(data);
};

module.exports = { Responsable, validate };
