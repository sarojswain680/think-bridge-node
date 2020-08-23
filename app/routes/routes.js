module.exports = (app) => {
    const product = require('../controller/controller');

    app.post('/product/create', product.create);

    app.get('/product/all', product.findAll);

    app.get('/product/:productId', product.findOne);

    app.put('/product/:productId', product.update);

    app.delete('/product/:productId', product.delete);
}