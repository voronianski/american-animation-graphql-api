const { gql } = require('apollo-server-express');

const videos = require('../../services/videos');
const studios = require('../../services/studios');
const characters = require('../../services/characters');

const types = gql`
  type Video {
    id: ID!

    """
    Official name of the animated cartoon
    """
    name: String!

    """
    Year when cartoon was released to the public
    """
    releasedIn: Int!

    """
    Name of the animated cartoon's director
    """
    directedBy: String!

    """
    Studio that produced the animated cartoon
    """
    studio: Studio

    """
    List of characters that were featured in the animated cartoon
    """
    characters(
      name: String
      orderBy: CharacterOrderBy
      selectIds: [ID!]!
    ): [Character!]!

    """
    List of available links on the web (e.g. YouTube, Vimeo, Dailymotion) to full-length version of the animated cartoon
    """
    links: [URL!]!

    """
    Link to IMDB article about the animated cartoon
    """
    imdbUrl: URL
  }

  enum VideoOrderBy {
    name_ASC
    name_DESC
    releasedIn_ASC
    releasedIn_DESC
  }

  type Query {
    allVideos(name: String, orderBy: VideoOrderBy, selectIds: [ID!]!): [Video!]!
    Video(id: ID, name: String): Video
  }
`;

const resolvers = {
  Query: {
    allVideos(root, { name, orderBy, selectIds }) {
      if (name) {
        return videos.findByName(name, { orderBy });
      }

      if (selectIds) {
        return videos.findByIds(selectIds, { name, orderBy });
      }

      return videos.getAll({ orderBy });
    },

    Video(root, { id, name }) {
      if (id) {
        return videos.findOneById(id);
      }

      if (name) {
        return videos.findOneByName(name);
      }
    }
  },

  Video: {
    studio({ studio: studioName }) {
      return studios.findOneByName(studioName);
    },

    characters({ id }, { name, orderBy }) {
      return characters.findByVideoId(id, { name, orderBy });
    },

    links({ links }) {
      return links || [];
    }
  }
};

module.exports = { types, resolvers };
