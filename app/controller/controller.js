const Product = require('../Models/ProductModel');

exports.create = (req, res) => {
 // Validate request
 if(!req.body.name) {
    return res.status(400).send({
        message: "Product name can not be empty"
    });
}else if(!req.body.description){
    return res.status(400).send({
        message: "Product description can not be empty"
    });
}else if(!req.body.photo){
    return res.status(400).send({
        message: "Product photo can not be empty"
    });
}else if(!req.body.price){
    return res.status(400).send({
        message: "Product price can not be empty"
    });
}

// Create a Note
const product = new Product({
    name: req.body.name , 
    description: req.body.description,
    price : req.body.price,
    photo : req.body.photo
});

product.save()
.then(data => {
    res.send(data);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while creating the Product."
    });
});
};

exports.findAll = (req, res) => {
    Product.find()
    .then(product => {
        res.send(product);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Products."
        });
    });
};

