const _ = require('lodash')

// Receives an array of blog posts and always returns 1
const dummy = (blogs) => {
  return 1
}

// Receives an array of blog posts and returns the total likes
const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (max, item) => {
    return max.likes > item.likes // Will keep max if equal
      ? max
      : item
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const mostBlogs = (blogs) => {
  const authors = _.countBy(blogs, 'author') // Creates an object where the keys are the authors and the values are the number of blogs
  const author = _.maxBy(_.keys(authors), (o) => authors[o])
  const count = authors[author]

  // Empty input should return an empty object
  return {
    author,
    blogs: count
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}