const authPaths = require('./auth');
const articlesPaths = require('./articles');
const productsPaths = require('./products');

const paths = {
    paths: {
        // ...authPaths,
        ...articlesPaths,
        ...productsPaths,
    },
};

module.exports = paths;
