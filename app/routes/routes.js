module.exports = (app) => {
    const product = require('../controller/controller');

    app.post('/product/create', product.create);

    app.get('/product/all', product.findAll);
}