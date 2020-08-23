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

exports.findOne = (req, res) => {
    Product.findById(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });            
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving product with id " + req.params.productId
        });
    });
};

exports.update = (req, res) => {
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

    // Find note and update it with the request body
    Product.findByIdAndUpdate(req.params.productId, {
        name: req.body.title , 
        description: req.body.description,
        price : req.body.price,
        photo : req.body.photo
    }, {new: true})
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "product not found with id " + req.params.productId
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.productId
        });
    });
};

exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send({message: "Product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.productId
        });
    });
};