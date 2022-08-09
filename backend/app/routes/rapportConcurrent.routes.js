module.exports = (app) => {
    const rapports = require('../controllers/rapportConcurrent.controller.js');


    app.post('/rapportConcurrent', rapports.create);


    app.get('/rapportConcurrent/societe/:idSoc', rapports.findRapportByIdSoc);

    app.get('/rapportConcurrent/dashboard/:idSoc', rapports.stats);


    app.get('/rapportConcurrent/:rapportId', rapports.findOne);


    app.delete('/rapportConcurrent/:rapportId', rapports.delete);
}