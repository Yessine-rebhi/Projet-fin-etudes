const mongoose = require('mongoose');
const Joi = require("joi");


const ProductsSchema = mongoose.Schema({
   
    name: String,
    description: String,
    categorie: String,
    Prix: Number,
    image: String,
    idSoc:String

    


}, {
    timestamps: true
});

const Products = mongoose.model("products", ProductsSchema);

const validate = (data) => {
    const schema = Joi.object({
    name: Joi.string().min(2).required().label("name"),
    idSoc: Joi.string().label("idSoc"),
    description:Joi.string().required().label("description"),
    categorie:Joi.string().required().label("description"),
    Prix:Joi.number().required().label("Prix"),
    image: Joi.string().required().label("Prix") });
    
    return schema.validate(data);

};

module.exports = { Products, validate };