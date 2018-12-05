const { gql } = require('apollo-server-express');

const studios = require('../../services/studios');
const characters = require('../../services/characters');

const types = gql`
  type Character {
    id: ID!

    """
    Name of the character as it was used in the cartoons
    """
    name: String!

    """
    Year when character was introduced to the public
    """
    createdIn: Int!

    """
    List of studios that were maintaining rights to the character
    """
    studios: [Studio!]!
  }

  type Query {
    allCharacters(name: String): [Character!]!
    Character(id: ID, name: String): Character
  }
`;

const resolvers = {
  Query: {
    allCharacters(root, { name }) {
      if (name) {
        return characters.findByName(name);
      }

      return characters.getAll();
    },

    Character(root, { id, name }) {
      if (id) {
        return characters.findOneById(id);
      }

      if (name) {
        return characters.findOneByName(name);
      }
    }
  },

  Character: {
    studios(parent) {
      return studios.findByCharacterId(parent.id);
    }
  }
};

module.exports = { types, resolvers };
