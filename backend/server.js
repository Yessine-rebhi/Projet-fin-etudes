require("dotenv").config();
const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const connection = require("./db");
const passwordResetRoutes = require("./app/routes/passwordReset");

// create express app
const app = express();
app.use(cors())



// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  },
};

// Enable preflight requests for all routes
app.options('*', cors(corsOptions));

app.get('/', cors(corsOptions), (req, res, next) => {
  res.json({ message: 'This route is CORS-enabled for an allowed origin.' });
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb',
parameterLimit: 100000,
extended: true  }))

// parse application/json
app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(express.json({extended: true}))

// Connecting to the database
connection();
// routes
app.use("/api/password-reset", passwordResetRoutes);

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome" });
});
app.post("/responsables/test", (req, res) => {
    console.log(req.body);
  });

require('./app/routes/admin.routes.js')(app);
require('./app/routes/Responsable.routes.js')(app);
require('./app/routes/tache.routes.js')(app);
require('./app/routes/rapport.routes.js')(app);
require('./app/routes/rapportConcurrent.routes.js')(app);
require('./app/routes/products.routes.js')(app);
require('./app/routes/ProductsConcurrent.routes')(app);
require('./app/routes/Marchandiseur.routes')(app);


// listen for requests
const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listening on port ${port}...`));

