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
    studios(name: String, orderBy: StudioOrderBy): [Studio!]!

    """
    Images of the character found on the internet
    """
    images: [URL!]!
  }

  enum CharacterOrderBy {
    name_ASC
    name_DESC
    createdIn_ASC
    createdIn_DESC
  }

  type Query {
    allCharacters(name: String, orderBy: CharacterOrderBy): [Character!]!
    Character(id: ID, name: String): Character
  }
`;

const resolvers = {
  Query: {
    allCharacters(root, { name, orderBy }) {
      if (name) {
        return characters.findByName(name, { orderBy });
      }

      return characters.getAll({ orderBy });
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
    studios({ id }, { name, orderBy }) {
      return studios.findByCharacterId(id, { name, orderBy });
    },

    images({ images }) {
      return images || [];
    }
  }
};

module.exports = { types, resolvers };
