module.exports = app => {
    const Product = require("../controllers/Product.controller.js");
  
    // Create a new Product
    app.post("/Product", Product.create);
  
    // Retrieve all Products
    app.get("/Product", Product.findAll);
  
    // Retrieve a single Product with ProductId
    app.get("/Product/:ProductId", Product.findOne);
  
    // Update an Product with ProductId
    app.put("/Product/:ProductId", Product.update);
  
    // Delete an Product with ProductId
    app.delete("/Product/:ProductId", Product.delete);
  
    // Create a new Product
    app.delete("/Product", Product.deleteAll);
  };