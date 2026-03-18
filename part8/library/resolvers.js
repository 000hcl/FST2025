const { v1: uuid } = require('uuid')
const Book = require('./models/book')
const Author = require('./models/author')
const author = require('./models/author')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]


let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]


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
    allAuthors: async () => Author.find({})
  },
  Author: {
    bookCount: async ({ name }) => {
        const author = await Author.findOne({ name: name })
        return Book.countDocuments({ author: author._id })
    }
  },
  Mutation: {
    addBook: async (root, args) => {
        
        
        const bookAuthor = await Author.findOne({ name: args.author })
        console.log(args.author);
        
        console.log('author exists', bookAuthor);
        
        if (!bookAuthor) {
            console.log('no author');
            
            const newAuthor = new Author({ name: args.author })
            
            await newAuthor.save()
            bookAuthor = await Author.findOne({ name: args.author })
        }
        const book = new Book({ ...args, author: bookAuthor._id })
        console.log(book);

        await book.save()
        return book.populate('author')
    },
    editAuthor: async (root, args) => {
        const author = await Author.findOne({ name: args.name })
        
        if (!author) {
            return null
        }
        author.born = args.setBornTo
        console.log(author);
        
        return author.save()
    }
  }
}

module.exports = resolvers