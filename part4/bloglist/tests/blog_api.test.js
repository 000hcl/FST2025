const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        title: "On the Veg",
        author: "Maverick Beeson",
        url: "someurl.url/mb/ontheveg",
        likes: 500
    },
    {
        title: "Vegetable Cake: is it possible or even good?",
        author: "Maverick Beeson",
        url: "someurl.url/mb/vegetablecake",
        likes: 24
    },
    {
        title: "On Pizza Pies",
        author: "John DiGiorno",
        url: "someurl.url/jdg/onpizzapies",
        likes: 784
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = initialBlogs.map(b => new Blog(b))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length)
})

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  after(async () => {
    await mongoose.connection.close()
  })

  test('blogs have property id', async () => {
    const response = await api.get('/api/blogs')
    assert(response.body[0].id.length > 0)
  })