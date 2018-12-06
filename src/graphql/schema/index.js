const { mergeTypes, mergeResolvers } = require('merge-graphql-schemas');

const customScalars = require('./customScalars');
const studio = require('./studio');
const character = require('./character');

const types = mergeTypes([customScalars.types, studio.types, character.types]);
const resolvers = mergeResolvers([
  customScalars.resolvers,
  studio.resolvers,
  character.resolvers
]);

module.exports = { types, resolvers };
