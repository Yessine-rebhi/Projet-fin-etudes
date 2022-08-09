const {Tache} = require('../models/Tache.model.js');
// Create and Save a new taches
exports.createTache =  async (req, res) => {
    if (!req.body.TitreT) {
        return res.status(400).send({
            message: "Tache content can not be empty"
        });
       
    }
    
       const newTache = new Tache({
        marchandiseur:req.body.marchandiseur || null ,
        TitreT: req.body.TitreT,
        dateT: req.body.dateT,
        address: req.body.address,
        description: req.body.description,
        idSoc:req.body.idSoc,
        rapport:req.body.rapport || null 
   });
       try {
        await newTache.save();

        res.status(201).json(newTache );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};


// Retrieve and return all taches from the database.
exports.getAllTaches  = async  (req, res) => {
    try {
        const tache = await Tache.find({idSoc:req.params.idSoc}).populate({path: "marchandiseur",select:"name",model: "Marchandiseur"});
                
        res.status(200).json(tache);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Find a single taches with a taches
exports.getTacheByID = async  (req, res) => {
    Tache.findById(req.params.id)
    try {
        const tache = await Tache.findById(req.params.id).populate({path: "marchandiseur",select:"name",model: "Marchandiseur"});
        
        res.status(200).json(tache);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.stats = function (req, res) {
    Tache.find({idSoc: req.params.idSoc}).countDocuments().then(tache => {
        res.status(200).json({'success' : true, 'result': tache})
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving productss."
        });
    });
};


exports.updateTache = (req, res) => {
    // Validate Request
    if (!req.body.TitreT) {
        return res.status(400).send({
            message: "Tache content can not be empty"
        });
    }

    // Find taches and update it with the request body
    Tache.findByIdAndUpdate(req.params.id, {
        TitreT: req.body.TitreT,
        dateT: req.body.dateT,
        address: req.body.address,
        description: req.body.description,
        marchandiseur:req.body.marchandiseur || null
        }, { new: true })
        .then(newTache => {
            if (!newTache) {
                return res.status(404).send({
                    message: "Tache not found with id " + req.params.id
                });
            }
            res.send(newTache);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Tache not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating Tache with id " + req.params.id
            });
        });
};

// Delete a taches with the specified tachesId in the request
exports.deleteTache = async (req, res) => {
   
    Tache.findByIdAndRemove(req.params.id)
        .then(newTache => {
            if (!newTache) {
                return res.status(404).send({
                    message: "Tache not found with id " + req.params.id
                });
            }
            res.send({ message: "Tache deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Tache not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete Tache with id " + req.params.id
            });
        });
};