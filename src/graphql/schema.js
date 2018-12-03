const schema = `
  type Studio {
    id: ID!
    name: String!
    year: Int!
    characters: [Character!]
  }

  type Character {
    id: ID!
    name: String!
    year: Int!
    producedBy: Studio!
  }

  type Query {
    allStudios(): [Studio!]!
    allCharacters(): [Character!]!
    Studio(id: ID, name: String): Studio
    Character(id: ID, name: String): Character
  }
`;

module.exports = schema;
