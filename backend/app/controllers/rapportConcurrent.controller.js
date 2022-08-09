const { RapportConcurrent} = require("../models/rapportConcurrent.model.js");
// Create and Save a new rapport
exports.create = (req, res) => {
    // Validate request
    if (!req.body.titreR) {
        return res.status(400).send({
            message: "rapport content can not be empty"
        });
    }


    // Create a rapport
    const rapport = new RapportConcurrent({
        titreR: req.body.titreR,
        heure: req.body.heure,
        idSoc: req.body.idSoc,
        rapportInfo: req.body.rapportInfo,
        marchandiseur:req.body.marchandiseur,
        tache:req.body.tache
    });

    // Save client in the database
    rapport.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the rapport."
            });
        });
};

// Retrieve and return all rapport from the database.
/* exports.findAll = (req, res) => {
    Rapport.find()
        .then(rapports => {
            res.send(rapports);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving rapports."
            });
        });
}; */

exports.stats = function (req, res) {
    RapportConcurrent.find({idSoc: req.params.idSoc}).countDocuments().then(rapports => {
        res.status(200).json({'success' : true, 'result': rapports})
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving rapportConcurrent."
        });
    });
};


exports.findRapportByIdSoc = function(req , res) {
  
    RapportConcurrent.find({idSoc: req.params.idSoc}).then(rapports => {
        res.send(rapports);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving rapports."
        });
    });
}; 










// Find a single rapport with a rapportId
exports.findOne = (req, res) => {
    RapportConcurrent.findById(req.params.rapportId)
        .then(rapport => {
            if (!rapport) {
                return res.status(404).send({
                    message: "rapport not found with id " + req.params.rapportId
                });
            }
            res.send(rapport);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "rapport not found with id " + req.params.rapportId
                });
            }
            return res.status(500).send({
                message: "Error retrieving admin with id " + req.params.rapportId
            });
        });
};



// Delete a rapport with the specified rapportId in the request
exports.delete = (req, res) => {
    RapportConcurrent.findByIdAndRemove(req.params.rapportId)
        .then(rapport => {
            if (!rapport) {
                return res.status(404).send({
                    message: "rapport not found with id " + req.params.rapportId
                });
            }
            res.send({ message: "rapport deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "rapport not found with id " + req.params.rapportId
                });
            }
            return res.status(500).send({
                message: "Could not delete rapport with id " + req.params.rapportId
            });
        });
};