import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }

`
export const EDIT_AUTHOR = gql`
  mutation editAuthor(
    $name: String!
    $setBornTo: Int!
  ) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      id
      name
      born
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      id
      author {
        name
      }
      title
      published
      genres
    }
  }
`

export const BOOKS_BY_GENRE = gql`
  query allBooks(
      $genre: String
    ) {
      allBooks(genre: $genre) {
        id
        author {
          name
        }
        title
        published
        genres
      }
    
    }

`

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      id
      title
      published
      author {
        name
      }
      genres
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const FAVORITE_GENRE = gql`
  query {
    me {
      favoriteGenre
    }
  }
`
