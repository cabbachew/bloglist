const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// Get all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

// Create a new blog
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  // const body = request.body
  // const blog = new Blog({
  //   title: body.title,
  //   author: body.author,
  //   url: body.url,
  //   likes: body.likes,
  // })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)

  // blog
  //   .save()
  //   .then(result => {
  //     response.status(201).json(result)
  //   })
  //   .catch(error => next(error))
})

// Delete a blog
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter

// Show a single blog
// blogsRouter.get('/:id', async (request, response, next) => {
//   const blog = await Blog.findById(request.params.id)
//   if (blog) {
//     response.json(blog)
//   } else {
//     response.status(404).end()
//   } 
// })

// Update a blog
// blogsRouter.put('/:id', (request, response, next) => {
//   const body = request.body
//
//   const blog = {
//     title: body.title,
//     ...
//   }
//
//   Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
//     .then(updatedBlog => {
//       response.json(updatedBlog)
//     })
//     .catch(error => next(error))
// })
