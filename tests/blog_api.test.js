const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  // const blogObjects = helper.initialBlogs
  //   .map(blog => new Blog(blog))
  // const promiseArray = blogObjects.map(blog => blog.save()) // save method returns a promise
  // await Promise.all(promiseArray) // fulfills when all promises in the array are resolved

  // A for...of block guarantees a specific execution order
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

// test('a specific blog is within the returned blogs', async () => {
//   const response = await api.get('/api/blogs')

//    const titles = response.body.map(r => r.title)
//    expect(titles).toContain(
//      'Go To Statement Considered Harmful'
//    )
// })

// test('a valid blog can be added ', async () => {
//   const newBlog = {
//     title: 'async/await simplifies making async calls',
//     author: 'Michael Chan',
//     url: 'https://reactpatterns.com/',
//     likes: 7,
//   }

//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(201)
//     .expect('Content-Type', /application\/json/)

//   const blogsAtEnd = await helper.blogsInDb()
//   expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

//   const titles = blogsAtEnd.map(blog => blog.title)
//   expect(titles).toContain(
//     'async/await simplifies making async calls'
//   )
// })

// If validations are added to the model, this test will fail
// test('blog without title is not added', async () => {
// const newBlog = {
//   author: 'Michael Chan',
//   url: 'https://reactpatterns.com/',
//   likes: 7,
// }

// await api
//   .post('/api/blogs')
//   .send(newBlog)
//   .expect(400)

// const blogsAtEnd = await helper.blogsInDb()

// expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
// })

// test('a specific blog can be viewed', async () => {
//   const blogsAtStart = await helper.blogsInDb()

//   const blogToView = blogsAtStart[0]

//   const resultBlog = await api
//     .get(`/api/blogs/${blogToView.id}`)
//     .expect(200)
//     .expect('Content-Type', /application\/json/)

//   expect(resultBlog.body).toEqual(blogToView)
// })

// test('a blog can be deleted', async () => {
//   const blogsAtStart = await helper.blogsInDb()
//   const blogToDelete = blogsAtStart[0]

//   await api
//     .delete(`/api/blogs/${blogToDelete.id}`)
//     .expect(204)

//   const blogsAtEnd = await helper.blogsInDb()

//   expect(blogsAtEnd).toHaveLength(
//     helper.initialBlogs.length - 1
//   )

//   const titles = blogsAtEnd.map(blog => blog.title)

//   expect(titles).not.toContain(blogToDelete.title)
// })

afterAll(async () => {
  await mongoose.connection.close()
})