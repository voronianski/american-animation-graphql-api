const { gql } = require('apollo-server-express');

const studios = require('../../services/studios');
const characters = require('../../services/characters');

const types = gql`
  type Studio {
    id: ID!

    """
    Official name of the studio that was used during the Golden Age period
    """
    name: String!

    """
    Year when studio was founded
    """
    foundedIn: Int!

    """
    Year when studio stopped functioning
    """
    defunctIn: Int

    """
    Link to Wikipedia article about the studio
    """
    wikiUrl: String

    """
    List of characters produced by the studio
    """
    characters: [Character!]!
  }

  type Query {
    allStudios(name: String): [Studio!]!
    Studio(id: ID, name: String): Studio
  }
`;

const resolvers = {
  Query: {
    allStudios(root, { name }) {
      if (name) {
        return studios.findByName(name);
      }

      return studios.getAll();
    },

    Studio(root, { id, name }) {
      if (id) {
        return studios.findOneById(id);
      }

      if (name) {
        return studios.findOneByName(name);
      }
    }
  },

  Studio: {
    characters(parent) {
      return characters.findByStudioId(parent.id);
    }
  }
};

module.exports = { types, resolvers };
