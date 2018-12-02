const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

module.exports = function v1 () {
  const router = express.Router();
  const schema = buildSchema(`
    type Query {
      hello: String
    }
  `);
  const rootValue = {
    hello: () => {
      return 'Hello world!';
    },
  };

  router.use('/graphql', graphqlHTTP({
    rootValue,
    schema,
    graphiql: true,
  }));

  return router;
};
