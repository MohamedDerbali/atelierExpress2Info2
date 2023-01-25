const express = require("express");
const router = express.Router();
const products = require("../products.json");

router.get("/", (req, res, next) => {
  try {
    if (!products) {
      throw new Error("products not found!");
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const productsKeys = Object.keys(products);
    if (!productsKeys.includes(id.toUpperCase())) {
      throw new Error("you must verify your id!");
    }
    res.status(200).json(products[id]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/instock/:qt", function (req, res, next) {
    const { qt } = req.params;
    let productsInStock = [];
    for (i in products) {
      if (products[i].stock >= qt) {
        productsInStock.push(products[i]);
      }
    }
    res.status(200).json(productsInStock);
  });
router.get("/:id/:qt", (req, res, next) => {
  try {
    const { id, qt } = req.params;
    const productsKeys = Object.keys(products);
    if (!productsKeys.includes(id.toUpperCase())) {
      throw new Error("you must verify your id!");
    }
    const returnedInformations = {
      id,
      qt: parseInt(qt),
      unit_price: parseInt(products[id].price),
      total_price: parseInt(products[id].price) * parseInt(qt),
    };
    res.status(200).json(returnedInformations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
