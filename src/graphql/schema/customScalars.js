const { gql } = require('apollo-server-express');
const GraphQLScalars = require('@okgrow/graphql-scalars');
const GraphQLJSON = require('graphql-type-json');

const types = gql`
  scalar URL
  scalar JSON
`;

const resolvers = {
  URL: GraphQLScalars.URL,
  JSON: GraphQLJSON
};

module.exports = { types, resolvers };
