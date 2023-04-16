const fs = require("fs");
const path = require("path");
const YAML = require('yaml');

// unauthorized definition
const unauthorizedDefinition = fs.readFileSync(path.join(__dirname, 'unauthorized.yaml'), 'utf8');
const unauthorizedDefinitionParse = YAML.parse(unauthorizedDefinition);

// forbidden definition
const forbiddenDefinition = fs.readFileSync(path.join(__dirname, 'forbidden.yaml'), 'utf8');
const forbiddenDefinitionParse = YAML.parse(forbiddenDefinition);

// bad request definition
const badRequestDefinition = fs.readFileSync(path.join(__dirname, 'bad-request.yaml'), 'utf8');
const badRequestDefinitionParse = YAML.parse(badRequestDefinition);

// user definition
const createUser = fs.readFileSync(path.join(__dirname, 'user.yaml'), 'utf8');
const createUserParse = YAML.parse(createUser);

// articles definition
const article = fs.readFileSync(path.join(__dirname, 'article.yaml'), 'utf8');
const articleParse = YAML.parse(article);

// products definition
const galleryDefinition = fs.readFileSync(path.join(__dirname, 'gallery.yaml'), 'utf8');
const galleryDefinitionParse = YAML.parse(galleryDefinition);

// products definition
const productDefinition = fs.readFileSync(path.join(__dirname, 'product.yaml'), 'utf8');
const productDefinitionParse = YAML.parse(productDefinition);

// timestamp definition
const timestampDefinition = fs.readFileSync(path.join(__dirname, 'timestamp.yaml'), 'utf8');
const timestampDefinitionParse = YAML.parse(timestampDefinition);

const definitions = {
    definitions: {
        // ...createUserParse,
        ...articleParse,
        ...timestampDefinitionParse,
        ...galleryDefinitionParse,
        ...productDefinitionParse,
        ...unauthorizedDefinitionParse,
        ...forbiddenDefinitionParse,
        ...badRequestDefinitionParse,
    },
};

module.exports = definitions;
