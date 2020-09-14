const sql = require("./db.js");

// constructor
const Product = function (product) {
  this.id = product.email;
  this.name = product.name;
  this.description = product.description;
  this.type = product.type;
  this.image = product.image;
  this.address = product.address;
  this.promo = product.promo;
  this.lngLat = product.lngLat;
};

Product.create = (newProduct, result) => {
  sql.query("INSERT INTO Product SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Product: ", { id: res.insertId, ...newProduct });
    result(null, { id: res.insertId, ...newProduct });
  });
};

Product.findById = (ProductId, result) => {
  sql.query(`SELECT * FROM Product WHERE id = ${ProductId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Product: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Product with the id
    result({ kind: "not_found" }, null);
  });
};

Product.getAll = (result) => {
  sql.query("SELECT * FROM Product", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Products: ", res);
    result(null, res);
  });
};

Product.updateById = (id, product, result) => {
  sql.query(
    "UPDATE Product SET name = ?, description = ?, type = ?, image = ?, address = ?, promo = ?, lngLat = ? WHERE id = ?",
    [
      product.name,
      product.description,
      product.type,
      product.image,
      product.address,
      product.promo,
      product.lngLat,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Product with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Product: ", { id: id, ...product });
      result(null, { id: id, ...product });
    }
  );
};

Product.remove = (id, result) => {
  sql.query("DELETE FROM Product WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Product with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Product with id: ", id);
    result(null, res);
  });
};

Product.removeAll = (result) => {
  sql.query("DELETE FROM Product", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Products`);
    result(null, res);
  });
};

module.exports = Product;
