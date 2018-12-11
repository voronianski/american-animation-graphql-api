const { gql } = require('apollo-server-express');

const videos = require('../../services/videos');
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
    wikiUrl: URL

    """
    List of characters produced by the studio
    """
    characters(
      name: String
      orderBy: CharacterOrderBy
      selectIds: [ID!]
    ): [Character!]!

    """
    List of available on the web animated cartoons' videos produced by the studio
    """
    videos(name: String, orderBy: VideoOrderBy, selectIds: [ID!]): [Video!]!
  }

  enum StudioOrderBy {
    name_ASC
    name_DESC
    foundedIn_ASC
    foundedIn_DESC
    defunctIn_ASC
    defunctIn_DESC
  }

  type Query {
    allStudios(
      name: String
      orderBy: StudioOrderBy
      selectIds: [ID!]
    ): [Studio!]!
    Studio(id: ID, name: String): Studio
  }
`;

const resolvers = {
  Query: {
    allStudios(root, { name, orderBy, selectIds }) {
      if (name) {
        return studios.findByName(name, { orderBy });
      }

      if (selectIds) {
        return studios.findByIds(selectIds, { name, orderBy });
      }

      return studios.getAll({ orderBy });
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
    characters({ id }, { name, orderBy }) {
      return characters.findByStudioId(id, { name, orderBy });
    },

    videos({ name: studioName }, { name, orderBy }) {
      return videos.findByStudioName(studioName, { name, orderBy });
    }
  }
};

module.exports = { types, resolvers };
