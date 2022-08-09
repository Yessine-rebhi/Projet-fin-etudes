const {ProductsConcurrent,validate} = require('../models/ProductsConcurrent.model');

// Create and Save a new Products
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "products content can not be empty"
        });
    }
   /*  const { error } = validate(req.body);
    if (error)
        return res.status(400).send({ message: error.details[0].message }); */

  
    


    // Create a products
    const productsConcurrent = new ProductsConcurrent({
        name: req.body.name,
        description: req.body.description,
        categorie: req.body.categorie,
        Prix: req.body.Prix,
        image: req.body.image,
        idSoc:req.body.idSoc
    });

    // Save products in the database
    productsConcurrent.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the products."
            });
        });
};

exports.stats = function (req, res) {
    ProductsConcurrent.find({idSoc: req.params.idSoc}).countDocuments().then(productss => {
        res.status(200).json({'success' : true, 'result': productss})
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving productss."
        });
    });
};

exports.findProduitById = function(req , res) {
  
    ProductsConcurrent.find({idSoc: req.params.idSoc}).then(productss => {
        res.send(productss);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving productss."
        });
    });
};

// Find a single products with a products
exports.findOne = (req, res) => {
    ProductsConcurrent.findById(req.params.productssId)
        .then(products => {
            if (!products) {
                return res.status(404).send({
                    message: "products not found with id " + req.params.productssId
                });
            }
            res.send(products);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "products not found with id " + req.params.productssId
                });
            }
            return res.status(500).send({
                message: "Error retrieving products with id " + req.params.productssId
            });
        });
};

// Update a products identified by the productsId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "products content can not be empty"
        });
    }

    // Find products and update it with the request body
    ProductsConcurrent.findByIdAndUpdate(req.params.productssId, {
        name: req.body.name,
        description: req.body.description,
        categorie: req.body.categorie,
        Prix: req.body.Prix,
        image: req.body.image,

            
        }, { new: true })
        .then(products => {
            if (!products) {
                return res.status(404).send({
                    message: "products not found with id " + req.params.productssId
                });
            }
            res.send(products);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "products not found with id " + req.params.productssId
                });
            }
            return res.status(500).send({
                message: "Error updating products with id " + req.params.productssId
            });
        });
};

// Delete a products with the specified productsId in the request
exports.delete = (req, res) => {
    ProductsConcurrent.findByIdAndRemove(req.params.productssId)
        .then(products => {
            if (!products) {
                return res.status(404).send({
                    message: "products not found with id " + req.params.productssId
                });
            }
            res.send({ message: "products deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "products not found with id " + req.params.productssId
                });
            }
            return res.status(500).send({
                message: "Could not delete products with id " + req.params.productssId
            });
        });
};