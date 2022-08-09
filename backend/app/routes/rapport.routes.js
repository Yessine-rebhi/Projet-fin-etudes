module.exports = (app) => {
    const rapports = require('../controllers/rapport.controller.js');


    app.post('/rapports', rapports.create);


    app.get('/rapports/societe/:idSoc', rapports.findRapportByIdSoc);

    app.get('/rapports/dashboard/:idSoc', rapports.stats);


    app.get('/rapports/:rapportId', rapports.findOne);


    app.delete('/rapports/:rapportId', rapports.delete);
}