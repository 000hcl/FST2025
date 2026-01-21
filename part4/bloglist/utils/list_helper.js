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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}