const Product = require("../models/product_model.js");

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Product
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    type: req.body.type,
    image: req.body.image,
    address: req.body.address,
    promo: req.body.promo,
    lngLat: req.body.lngLat,
  });

  // Save Product in the database
  Product.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product.",
      });
    else res.send(data);
  });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  Product.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products.",
      });
    else res.send(data);
  });
};

// Find a single Product with a ProductId
exports.findOne = (req, res) => {
  Product.findById(req.params.ProductId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.ProductId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Product with id " + req.params.ProductId,
        });
      }
    } else res.send(data);
  });
};

exports.getLangLat = (req, res) => {
  Product.getLangLat((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving coords.",
      });
    else res.send(data);
  });
};

// Update an Product identified by the ProductId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Product.updateById(
    req.params.ProductId,
    new Product(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Product with id ${req.params.ProductId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Product with id " + req.params.ProductId,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete an Product with the specified ProductId in the request
exports.delete = (req, res) => {
  Product.remove(req.params.ProductId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.ProductId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Product with id " + req.params.ProductId,
        });
      }
    } else res.send({ message: `Product was deleted successfully!` });
  });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
  Product.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Products.",
      });
    else res.send({ message: `All Products were deleted successfully!` });
  });
};
