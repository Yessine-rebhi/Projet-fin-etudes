module.exports = (app) => {
    const products = require('../controllers/ProductsConcurrent.controller');


    app.post('/products-concurrent', products.create);


    app.get('/products-concurrent/societe/:idSoc', products.findProduitById);


    app.get('/products-concurrent/:productssId', products.findOne);

    app.get('/products-concurrent/dashboard/:idSoc', products.stats);

    app.put('/products-concurrent/:productssId', products.update);

    app.delete('/products-concurrent/:productssId', products.delete);
}