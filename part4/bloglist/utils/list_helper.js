const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return blog.likes + sum
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    return blogs.reduce((blog, favorite) => favorite.likes > blog.likes ? favorite : blog)
}

const mostBlogs = (blogs) => {
    const mapper = (pair) => {
        return {'author': pair[0], 'blogs': pair[1]}
    }
    const authorsCounted = lodash.countBy(blogs, (blog) => blog.author)
    const pairs = lodash.toPairs(authorsCounted)
    const mapped = lodash.map(pairs, mapper)
    return lodash.maxBy(mapped, 'blogs')
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}

// notes: lodash partition, zipWith