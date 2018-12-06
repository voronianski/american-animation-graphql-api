const { gql } = require('apollo-server-express');
const GraphQLScalars = require('@okgrow/graphql-scalars');

const types = gql`
  scalar URL
`;

const resolvers = {
  URL: GraphQLScalars.URL
};

module.exports = { types, resolvers };
