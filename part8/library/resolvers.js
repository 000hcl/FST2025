const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
require('dotenv').config()

const pubsub = new PubSub()



const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
        const searchQuery = {}
        if (args.genre) {
            searchQuery.genres = { $all: [args.genre] }
        } else
        if (args.author) {
            searchQuery.author = args.author
        }

        return Book.find(searchQuery).populate('author', { name: 1 })
        
    },
    allAuthors: async () => {
      console.log('allAuthors');
      
      return Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async ({ name }) => {
      console.log('bookCount');
      
      const author = await Author.findOne({ name: name })
      return Book.countDocuments({ author: author._id })
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('Log in required', {
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        })
      }
      const titleExists = await Book.exists({ title: args.title })
      if (titleExists) {
        throw new GraphQLError(`Title must be unique: ${args.title}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title
          }
        })
      }
      let bookAuthor = await Author.findOne({ name: args.author })

        if (!bookAuthor) {

            const newAuthor = new Author({ name: args.author })
            
            await newAuthor.save()
            bookAuthor = await Author.findOne({ name: args.author })
        }
        const book = new Book({ ...args, author: bookAuthor._id })
        console.log(book);
        try {
          await book.save()
        } catch (error) {
          throw new GraphQLError(`Saving book failed: ${error.message}`, {
            extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
            }
          })
        }
        pubsub.publish('BOOK_ADDED', { bookAdded: book.populate('author') })

        return book.populate('author')
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('Log in required', {
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        })
      }
      const author = await Author.findOne({ name: args.name })
      
      if (!author) {
          return null
      }
      author.born = args.setBornTo
      console.log(author);
      
      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError(`Failed to save author changes for ${args.name}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      try {
        user.save()
      } catch (error) {
        throw new GraphQLError(`Creating user failed: ${error.message}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error
          }
        })
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    },

  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers