const fs = require("fs");
const path = require("path");
const YAML = require('yaml');

const createUser = fs.readFileSync(path.join(__dirname, 'user.yaml'), 'utf8');
const createUserParse = YAML.parse(createUser);

// articles
const article = fs.readFileSync(path.join(__dirname, 'article.yaml'), 'utf8');
const articleParse = YAML.parse(article);

// unauthorized definition
const unauthorizedDefinition = fs.readFileSync(path.join(__dirname, 'unauthorized.yaml'), 'utf8');
const unauthorizedDefinitionParse = YAML.parse(unauthorizedDefinition);

// forbidden definition
const forbiddenDefinition = fs.readFileSync(path.join(__dirname, 'forbidden.yaml'), 'utf8');
const forbiddenDefinitionParse = YAML.parse(forbiddenDefinition);

// bad request definition
const badRequestDefinition = fs.readFileSync(path.join(__dirname, 'bad-request.yaml'), 'utf8');
const badRequestDefinitionParse = YAML.parse(badRequestDefinition);

const definitions = {
    definitions: {
        // ...createUserParse,
        ...articleParse,
        ...unauthorizedDefinitionParse,
        ...forbiddenDefinitionParse,
        ...badRequestDefinitionParse,
    },
};

module.exports = definitions;
