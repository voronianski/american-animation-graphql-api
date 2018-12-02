const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const { env } = require('c0nfig');

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
    graphiql: env === 'development',
  }));

  return router;
};
