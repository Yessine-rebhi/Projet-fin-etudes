const { Responsable, validate } = require("../models/Responsable.model.js");

// Create and Save a new Responsable
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.username) {
    return res.status(400).send({
      message: "Responsable content can not be empty",
    });
  }
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const userEmail = await Responsable.findOne({ email: req.body.email });
  if (userEmail)
    return res
      .status(409)
      .send({ message: "L'utilisateur avec l'adresse e-mail indiquée existe déjà !" });



  // Create a responsable
  const responsable = new Responsable({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    adress: req.body.adress,
    tel: req.body.tel,
    profileImage: "https://cdn.filestackcontent.com/0PfMEDJyRVq3BOgK063D",
    domaine: req.body.domaine,
    papier: req.body.papier,
    etat:false
  });

  // Save responsable in the database
  responsable
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Responsable.",
      });
    });
};

// Retrieve and return all Responsable from the database.
exports.findAll = (req, res) => {
  Responsable.find()
    .then((responsables) => {
      res.send(responsables);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving responsables.",
      });
    });
};

// Find a single Responsable with a responsableId
exports.findOne = (req, res) => {
  Responsable.findById(req.params.responsableId)
      .then(responsable => {
          if (!responsable) {
              return res.status(404).send({
                  message: "responsable not found with id " + req.params.responsableId
              });
          }
          res.send(responsable);
      }).catch(err => {
          if (err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "responsable not found with id " + req.params.responsableId
              });
          }
          return res.status(500).send({
              message: "Error retrieving responsable with id " + req.params.responsableId
          });
      });
};

// Find a single responsable with an email
exports.findOneByemail = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await Responsable.findOne({ email: email });
    if (!user) return res.status(401).send({ message: "Email not found " });
    else res.send(user);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
exports.findOneToLogin = async (req, res) => {
  try {
    const user = await Responsable.findOne({ email: req.body.email });
    if (!user) return res.status(401).send({ message: "Email invalide " });

    
    if (!(req.body.password==user.password))
      return res.status(401).send({ message: "Password invalide" });

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, etat:user.etat , id:user._id });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};


exports.update = async (req, res) => {
  Responsable.findByIdAndUpdate(
    req.params.responsableId,
    {
      username: req.body.username,
      email: req.body.email,
      adress: req.body.adress,
      tel: req.body.tel,
      password:req.body.password,
      profileImage:req.body.profileImage,
      etat:true
    },

    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        
        console.log("Updated User : ", docs);
      }
    }
  );
};





// Delete a responsable with the specified responsableID in the request
exports.delete = (req, res) => {
  Responsable.findByIdAndRemove(req.params.responsableId)
    .then((responsable) => {
      if (!responsable) {
        return res.status(404).send({
          message: "responsable not found with id " + req.params.responsableId,
        });
      }
      res.send({ message: "responsable deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "responsable not found with id " + req.params.responsableId,
        });
      }
      return res.status(500).send({
        message: "Could not delete responsable with id " + req.params.responsableId,
      });
    });
};