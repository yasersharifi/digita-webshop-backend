const mongoose = require("mongoose");
const controller = require("./controller");
const createError = require("../utils/httpError");

module.exports = new (class extends controller {
  async createProduct(req, res, next) {
    const newProduct = new this.Product(req.body);
    let savedProduct;
    try {
      savedProduct = await newProduct.save();
    } catch (err) {
      return next(
        createError(500, "Could not create product, please try again.")
      );
    }

    this.response({
      res,
      message: "Product created successfully",
      data: savedProduct,
    });
  }

  async updateProduct(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(createError(400, "Invalid id"));
    }
    let updatedProduct;
    try {
      updatedProduct = await this.Product.findByIdAndUpdate(
        req.params.id,
        { $set: { ...req.body } },
        { new: true }
      );
    } catch (err) {
      return next(
        createError(500, "Could not update product, please try again.")
      );
    }

    this.response({
      res,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  }

  async deleteProduct(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(createError(400, "Invalid id"));
    }
    try {
      await this.Product.findByIdAndDelete(req.params.id);
    } catch (err) {
      return next(
        createError(500, "Could not delete product, please try again.")
      );
    }

    this.response({ res, message: "Product deleted successfully" });
  }

  async getProduct(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(createError(400, "Invalid id"));
    }
    let product;
    try {
      product = await this.Product.findById(req.params.id);
    } catch (err) {
      return next(createError(500, "Could not get product, please try again."));
    }

    this.response({
      res,
      message: "Product found successfully",
      data: product,
    });
  }

  async getProducts(req, res, next) {
    const pageNumber = parseInt(req.query.page) || 1;
    const nPerPage = parseInt(req.query.limit) || 6;
    let products;
    try {
      products = await this.Product.find()
        .populate("reviews.userId")
        .sort({ _id: 1 })
        .skip((pageNumber - 1) * nPerPage)
        .limit(nPerPage);
    } catch (err) {
      return next(
        createError(500, "Could not get products, please try again.")
      );
    }
    this.response({
      res,
      message: "Products found successfully",
      data: products,
    });
  }

  async getProductReviews(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(createError(400, "Invalid id"));
    }

    const pageNumber = parseInt(req.query.page) || 1;
    const nPerPage = parseInt(req.query.limit) || 20;
    let product;
    try {
      product = await this.Product.findById(req.params.id)
        .sort({ _id: 1 })
        .skip((pageNumber - 1) * nPerPage)
        .limit(nPerPage);
    } catch (err) {
      return next(
        createError(500, "Could not get product reviews, please try again.")
      );
    }
    const list = await Promise.all(
      product.reviews.map((reviewer) => {
        try {
          return this.User.findById(reviewer.userId);
        } catch (err) {
          return next(
            createError(500, "Could not get product reviews, please try again.")
          );
        }
      })
    );

    this.response({
      res,
      message: "Product reviews found successfully",
      data: list,
    });
  }
})();
