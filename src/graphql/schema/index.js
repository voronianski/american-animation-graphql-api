const { mergeTypes, mergeResolvers } = require('merge-graphql-schemas');

const customScalars = require('./customScalars');
const studio = require('./studio');
const character = require('./character');
const video = require('./video');

const types = mergeTypes([
  customScalars.types,
  studio.types,
  character.types,
  video.types
]);
const resolvers = mergeResolvers([
  customScalars.resolvers,
  studio.resolvers,
  character.resolvers,
  video.resolvers
]);

module.exports = { types, resolvers };
