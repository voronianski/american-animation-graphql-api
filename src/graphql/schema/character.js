const { gql } = require('apollo-server-express');

const videos = require('../../services/videos');
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
    List of studios that were maintaining rights to the character during the Golden Age period
    """
    studios(name: String, orderBy: StudioOrderBy): [Studio!]!

    """
    List of links to some images of the character found on the web and stored under GitHub pages CDN.
    Be careful as images have different sizes.
    """
    images: [URL!]!

    """
    List of available on the web animated cartoons' videos that feature the character
    """
    videos(name: String, orderBy: VideoOrderBy): [Video!]!
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
    },

    videos({ id }, { name, orderBy }) {
      return videos.findByCharacterId(id, { name, orderBy });
    }
  }
};

module.exports = { types, resolvers };
