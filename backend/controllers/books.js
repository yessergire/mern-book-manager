const booksRouter = require('express').Router()
const Book = require('../models/book')

booksRouter.get('/', async (request, response) => {
  const books = await Book.find({})
  response.json(books)
})

booksRouter.get('/:id', async (request, response) => {
  try {
    const book = await Book.findById(request.params.id)
    if (book) {
      response.json(book.toJSON())
    } else {
      response.status(404).end()
    }
 } catch (error) {
    response.status(400).end()
 }
})

booksRouter.post('/', async (request, response) => {
  const { title, author, description } = request.body

  /* const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)*/

  const book = new Book({ title, author, description })
  const savedBook = await book.save()
  response.status(201).json(savedBook)
})

booksRouter.put('/:id', (request, response, next) => {
  const body = request.body
  const book = {
    title: body.title,
    author: body.author,
    description: body.description
  }

  Book.findByIdAndUpdate(request.params.id, book, { new: true })
    .then(updatedBook => {
      response.json(updatedBook)
    })
    .catch(error => next(error))
})

booksRouter.delete('/:id', async (request, response) => {
  await Book.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = booksRouter
