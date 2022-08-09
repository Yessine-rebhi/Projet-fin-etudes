const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken");

const AdminSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: [true, "The email is unique"],
    },
    password: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

AdminSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const Admin = mongoose.model("admin", AdminSchema);


const validate = (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required().label("Email"),
      password: passwordComplexity().required().label("Password")
    });
    return schema.validate(data);
  };
  


module.exports = { Admin, validate };
