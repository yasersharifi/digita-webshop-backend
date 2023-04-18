const fs = require("fs");
const path = require("path");
const YAML = require('yaml');

// find all products
const findAllProduct = fs.readFileSync(path.join(__dirname, 'find-all.products.yaml'), 'utf8');
const findAllProductParse = YAML.parse(findAllProduct);

// find one products
const findOneProduct = fs.readFileSync(path.join(__dirname, 'find-one.product.yaml'), 'utf8');
const findOneProductParse = YAML.parse(findOneProduct);

// find all products reviews
const findAllProductReviews = fs.readFileSync(path.join(__dirname, 'find-all-reviews.product.yaml'), 'utf8');
const findAllProductReviewsParse = YAML.parse(findAllProductReviews);

// find all product reviews
const findAllProductsReviews = fs.readFileSync(path.join(__dirname, 'find-all-reviews.products.yaml'), 'utf8');
const findAllProductsReviewsParse = YAML.parse(findAllProductsReviews);



module.exports = {
    '/products': {
        ...findAllProductParse,
    },
    '/products/find/{id}': {
        ...findOneProductParse,
    },
    '/products/reviews/{pid}': {
        ...findAllProductReviewsParse,
    },
    '/products/reviews': {
        ...findAllProductsReviewsParse,
    },
}

