const types = `
  type Character {
    id: ID!
    name: String!
    year: Int!
    producedBy: Studio!
  }

  type Query {
    allCharacters: [Character!]!
    Character(id: ID, name: String): Character
  }
`;

const resolvers = {
  Query: {
    allCharacters() {
      console.log(arguments);
    },

    Character() {
      console.log(arguments);
    }
  }
};

module.exports = { types, resolvers };
