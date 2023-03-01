const _ = require('lodash')

// Receives an array of blog posts and always returns 1
const dummy = () => {
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
  // Empty input should return an empty object
  if (blogs.length === 0) {
    return {}
  }

  // _.countBy returns an object where the keys are the authors and the values are the number of times the key was found
  const authors = _.countBy(blogs, 'author')
  // _.keys returns an array of the keys in the object
  // _.maxBy returns the key with the highest value
  const author = _.maxBy(_.keys(authors), (o) => authors[o])
  const count = authors[author]

  return {
    author,
    blogs: count
  }
}

const mostLikes = (blogs) => {
  // Empty input should return an empty object
  if (blogs.length === 0) {
    return {}
  }

  // _.groupBy returns an object where the keys are authors and the values are arrays of elements with that key
  const authors = _.groupBy(blogs, 'author')
  // _.keys returns an array of the keys in the object
  // _.maxBy returns the key with the highest value
  // totalLikes (defined above) receives an array of blog posts and returns the total likes
  const author = _.maxBy(_.keys(authors), (o) => totalLikes(authors[o]))
  const count = totalLikes(authors[author])

  return {
    author,
    likes: count
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}