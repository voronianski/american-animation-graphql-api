const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const { GraphQLScalarType } = require('graphql/type');

const GraphQLDate = new GraphQLScalarType({
  name: 'Date',
  serialize(value) {
    console.log('serialize', value);
    return value;
  },
  parseValue(value) {
    console.log('parseValue', value);
    return value;
  },
  parseLiteral(value) {
    console.log('parseLiteral', value);
    return value;
  }
});

const schema = buildSchema(`
  """
  Description for custom date type
  """
  scalar Date

  type Studio {
    id: ID!

    """
    Official name of the studio
    """
    name: String!

    foundedAt: Date
  }

  type Query {
    Studio(id: ID, name: String): Studio
  }
`);

const rootValue = {
  Studio(data) {
    return {
      id: 1,
      name: 'Walt Disney'
    };
  }
};

module.exports = function graphql() {
  const router = express.Router();

  router.use(
    '/',
    graphqlHTTP({
      rootValue,
      schema,
      graphiql: true
    })
  );

  return router;
};
