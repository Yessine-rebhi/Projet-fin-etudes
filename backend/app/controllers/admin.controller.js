const { Admin, validate } = require("../models/admin.model.js");

// Create and Save a new admin
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.eamil) {
        return res.status(400).send({
            message: "admin content can not be empty"
        });
    }
    const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const userEmail = await Client.findOne({ email: req.body.email });
		if (userEmail)
			return res.status(409).send({ message: "User with given email already Exist!" });
      


    // Create a admin
    const admin = new Admin({
        email: req.body.email,
        password: req.body.password

    });

    // Save admin in the database
    admin.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the admin."
            });
        });
};

// Retrieve and return all admin from the database.
exports.findAll = (req, res) => {
    Admin.find()
        .then(admins => {
            res.send(admins);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving admins."
            });
        });
};

// Find a single admin with a adminId
exports.findOne = (req, res) => {
    Admin.findById(req.params.adminId)
        .then(admin => {
            if (!admin) {
                return res.status(404).send({
                    message: "admin not found with id " + req.params.adminId
                });
            }
            res.send(admin);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "admin not found with id " + req.params.adminId
                });
            }
            return res.status(500).send({
                message: "Error retrieving admin with id " + req.params.adminId
            });
        });
};
// Find a single admin with an email

exports.findOneToLogin = async (req, res) => {

    try {
        const user = await Admin.findOne({ email: req.body.email });
        if (!user) return res.status(401).send({ message: "Email invalide " });
    
        
        if (!(req.body.password==user.password))
          return res.status(401).send({ message: "Password invalide" });
    
        const token = user.generateAuthToken();
        res.status(200).send({ data: token, message: "logged in successfully" });
      } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
      }

}

// Update a admin identified by the adminId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.email) {
        return res.status(400).send({
            message: "admin content can not be empty"
        });
    }

    // Find admin and update it with the request body
    Admin.findByIdAndUpdate(req.params.adminId, {
            email: req.body.email,
            password: req.body.password
        }, { new: true })
        .then(admin => {
            if (!admin) {
                return res.status(404).send({
                    message: "admin not found with id " + req.params.adminId
                });
            }
            res.send(admin);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "admin not found with id " + req.params.adminId
                });
            }
            return res.status(500).send({
                message: "Error updating admin with id " + req.params.adminId
            });
        });
};

// Delete a admin with the specified adminId in the request
exports.delete = (req, res) => {
    Admin.findByIdAndRemove(req.params.adminId)
        .then(admin => {
            if (!admin) {
                return res.status(404).send({
                    message: "admin not found with id " + req.params.adminId
                });
            }
            res.send({ message: "admin deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "admin not found with id " + req.params.adminId
                });
            }
            return res.status(500).send({
                message: "Could not delete admin with id " + req.params.adminId
            });
        });
};