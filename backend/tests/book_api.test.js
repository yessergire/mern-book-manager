const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

//const config = require('../utils/config')

const Book = require('../models/book')

//config.dbConnect()

describe('when there is initially some books saved', () => {
  beforeEach(async () => {
    await Book.deleteMany({})
    await Book.insertMany(helper.initialBooks)
  })

  test('books are returned as json', async () => {
    await api
      .get('/api/books')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all books are returned', async () => {
    const response = await api.get('/api/books')

    expect(response.body).toHaveLength(helper.initialBooks.length)
  })

  test('a specific book is within the returned books', async () => {
    const response = await api.get('/api/books')

    const titles = response.body.map(r => r.title)
    expect(titles).toContain('React in action')
  })

  describe('viewing a specific book', () => {

    test('succeeds with a valid id', async () => {
      const booksAtStart = await helper.booksInDb()

      const bookToView = booksAtStart[0]

      const resultBook = await api
        .get(`/api/books/${bookToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const processedBookToView = JSON.parse(JSON.stringify(bookToView))

      expect(resultBook.body).toEqual(processedBookToView)
    })

    test('fails with statuscode 404 if book does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/books/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '00000000000000000000000'

      await api
        .get(`/api/books/${invalidId}`)
        .expect(400)
    })
  })


  describe('addition of a new book', () => {
    test('succeeds with valid data', async () => {
      const newBook = {
        title: 'A new book',
        author: 'Tester',
        description: 'This books is used for testing',
      }

      await api
        .post('/api/books')
        .send(newBook)
        .expect(201)
        .expect('Content-Type', /application\/json/)


      const booksAtEnd = await helper.booksInDb()
      expect(booksAtEnd).toHaveLength(helper.initialBooks.length + 1)

      const titles = booksAtEnd.map(r => r.title)
      expect(titles).toContain('A new book')
    })

    test('fails with status code 400 if data invalid', async () => {
      const newBook = {
        title: 'testing books'
      }

      await api
        .post('/api/books')
        .send(newBook)
        .expect(400)

      const booksAtEnd = await helper.booksInDb()

      expect(booksAtEnd).toHaveLength(helper.initialBooks.length)
    })
  })

  describe('updating a book', () => {
    test('succeeds with valid data', async () => {
      const booksAtStart = await helper.booksInDb()
      const bookToUpdate = booksAtStart[0]
      bookToUpdate.title = 'this book will be updated'

      await api
        .put(`/api/books/${bookToUpdate.id}`)
        .send(bookToUpdate)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const booksAtEnd = await helper.booksInDb()
      expect(booksAtEnd[0]).toEqual(bookToUpdate)
    })
  })

  describe('deletion of a book', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const booksAtStart = await helper.booksInDb()
      const bookToDelete = booksAtStart[0]

      await api
        .delete(`/api/books/${bookToDelete.id}`)
        .expect(204)

      const booksAtEnd = await helper.booksInDb()

      expect(booksAtEnd).toHaveLength(
        helper.initialBooks.length - 1
      )

      const titles = booksAtStart.map(r => r.title)
      expect(titles).toContain(bookToDelete.title)
    })
  })
})

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  //await mongoose.connection.close();
})