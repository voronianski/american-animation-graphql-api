const { mergeTypes, mergeResolvers } = require('merge-graphql-schemas');

const studio = require('./studio');
const character = require('./character');

const types = mergeTypes([studio.types, character.types]);
const resolvers = mergeResolvers([studio.resolvers, character.resolvers]);

module.exports = { types, resolvers };
