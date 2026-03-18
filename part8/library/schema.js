
const typeDefs = `
  type Query {
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    authorCount: Int!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook (
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ) : Book!
    editAuthor (
      name: String!
      setBornTo: Int!
    ) : Author

  }

  type Book {
    title: String!
    published: Int!
    author: Author
    id: String!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: String!
    born: Int
    bookCount: Int!
  }
`
module.exports = typeDefs