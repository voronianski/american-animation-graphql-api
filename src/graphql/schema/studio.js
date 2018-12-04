const types = `
  type Studio {
    id: ID!

    """
    Official name of the studio
    """
    name: String!
    year: Int!
    wikiUrl: String
    characters: [Character!]
  }

  type Query {
    allStudios: [Studio!]!
    Studio(id: ID, name: String): Studio
  }
`;

const resolvers = {
  Query: {
    allStudios() {
      console.log(arguments);
    },

    Studio() {
      console.log(arguments);
    }
  }
};

module.exports = { types, resolvers };
