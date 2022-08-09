const {Marchandiseur,validate} = require('../models/Marchandiseur.model.js');
const mongoose = require("mongoose");
// Create and Save a new Marchandiseurs
exports.createMarchandiseur =  async (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({
            message: "Marchandiseur content can not be empty"
        });
       
    }
    const { error } = validate(req.body);
    if (error)
       return res.status(400).send({ message: error.details[0].message });
     
       const newMarchandiseur = new Marchandiseur({
        name: req.body.name,
        email: req.body.email,
        tel: req.body.tel,
        password: req.body.password,
       idSoc:req.body.idSoc,
       tache:[null]
   });
       try {
        await newMarchandiseur.save();

        res.status(201).json(newMarchandiseur );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};


// Retrieve and return all Marchandiseurs from the database.
exports.getMarchandiseur  = async  (req, res) => {
    
    try {
        const Mar = await Marchandiseur.find({idSoc:req.params.idSoc}).populate({path: "tache",select:"TitreT",model: "Tache"});
        res.set('Access-Control-Expose-Headers', 'Content-Range')
        res.set('Access-Control-Expose-Headers', 'X-Total-Count')
        res.set('X-Total-Count', 3)
        res.status(200).json(Mar);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Find a single Marchandiseurs with  id
exports.getMarchandiseurByID = async  (req, res) => {
    Marchandiseur.findById(req.params.id)
    try {
        const Mar = await Marchandiseur.findById(req.params.id).populate({path: "tache",model: "Tache"});

        res.status(200).json(Mar)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Find a single Marchandiseurs with a id
exports.getMarchandiseurByIDForIonicApp = async  (req, res) => {
    Marchandiseur.findById(req.params.id)
    try {
        const Mar = await Marchandiseur.findById(req.params.id).populate({path: "tache",model: "Tache"});

        res.status(200).json(Mar.tache)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Find a single marchandiser with an email
exports.findOneByemail = async (req, res) => {
    try {
        
      const email = req.params.email;
      console.log(email);
      const user = await Marchandiseur.findOne({ email:email });
      if (!user) {console.log("Email not found") ;return res.status(401).send({ message: "Email not found " });
    }else res.send(user);
    } catch (error) {
        console.log(error)
      res.status(500).send({ message: "Internal Server Error" });
    }
  };



exports.updateMarchandiseur =  async (req, res) => {
    const { id } = req.params;
    
    const {name,email,tel,password} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) 
    return res.status(404).send(`pas de Marchandiseur avec un id: ${id}`);

    const Mar1 = { name:name,email:email,tel:tel,password:password , _id: id };

    await Marchandiseur.findByIdAndUpdate( req.params.id,Mar1);

    res.json(Mar1);
};

exports.updateTacheMarchandiseur = (req, res) => {
    // Find Marchandiseurs and update it with the request body
    Marchandiseur.findByIdAndUpdate(req.params.id, {
        $addToSet: { tache : [ req.body.tache] } || null ,
        }, { new: true })
        .then(newMarchandiseur => {
            if (!newMarchandiseur) {
                return res.status(404).send({
                    message: "Marchandiseur not found with id " + req.params.id
                });
            }
            res.send(newMarchandiseur);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Marchandiseur not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating Marchandiseur with id " + req.params.id
            });
        });
};

// Find number of marchandiseur 
exports.stats = function (req, res) {
    Marchandiseur.find({idSoc: req.params.idSoc}).countDocuments().then(marchandiseur => {
        res.status(200).json({'success' : true, 'result': marchandiseur})
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving marchandiseur."
        });
    });
};

exports.updateTachePreviousMarchandiseur = (req, res) => {
    // Find Previous Marchandiseurs and remove his previous task
    Marchandiseur.findByIdAndUpdate(req.params.id, {
        $pull: { tache :  req.body.tache }
        }, { new: true })
        .then(newMarchandiseur => {
            if (!newMarchandiseur) {
                return res.status(404).send({
                    message: "Marchandiseur not found with id " + req.params.id
                });
            }
            res.send(newMarchandiseur);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Marchandiseur not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating Marchandiseur with id " + req.params.id
            });
        });
};

// Delete a Marchandiseurs with the specified MarchandiseursId in the request
exports.deleteMarchandiseur = async (req, res) => {
   
    Marchandiseur.findByIdAndRemove(req.params.id)
        .then(newMarchandiseur => {
            if (!newMarchandiseur) {
                return res.status(404).send({
                    message: "Marchandiseur not found with id " + req.params.id
                });
            }
            res.send({ message: "Marchandiseur deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Marchandiseur not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete Marchandiseur with id " + req.params.id
            });
        });
};