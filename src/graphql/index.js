const { ApolloServer } = require('apollo-server-express');

const schema = require('./schema');

function init(app) {
  const apolloServer = new ApolloServer({
    typeDefs: schema.types,
    resolvers: schema.resolvers,
    playground: true,
    tracing: true
  });

  apolloServer.applyMiddleware({
    app,
    cors: true,
    path: '/graphql'
  });

  return apolloServer;
}

module.exports = { init, schema };
