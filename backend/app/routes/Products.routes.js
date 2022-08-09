module.exports = (app) => {
    const products = require('../controllers/products.controller.js');


    app.post('/products', products.create);


    app.get('/products/societe/:idSoc', products.findProduitById);

    app.get('/products/:productssId', products.findOne);

    app.get('/products/dashboard/:idSoc', products.stats);

    app.put('/products/:productssId', products.update);

    app.delete('/products/:productssId', products.delete);
}