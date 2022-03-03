const Book = require('../models/book')

const initialBooks = [
  {
    title: 'HTML5 up and running',
    author: 'Mark Pilgrim',
    description: "This book provides practical information about how and why the latest version of HTML5 markup language will significantly change the way you develop for the Web. The book provides your first real look at HTML5's new elements and attributes and carefully guides you though the important changes in this version with lots of hands-on examples, including markup, graphics, and screenshots. You'll learn how to use HTML5 markup to add video, offline capabilities, offer a drawing canvas for dynamically generated 2D graphics and more – and you’ll be able to put that functionality to work right away.",
  },
  {
    title: 'HTML5 & CSS3',
    author: 'Brian P. Hogan',
    description: "This book gets you up to speed on the new HTML5 elements and CSS3 features you can use right now, and backwards compatible solutions ensure that you don\'t leave users of older browsers behind. It gets you started working with many useful new features of HTML and CSS right away. Gone are the days of adding additional markup just to style a button differently or stripe tables.",
  },
  {
    title: 'React by example',
    author: 'William Sheakspear',
    description: 'Example book description',
  },
  {
    title: 'React in action',
    author: ' Mark Tielens Thomas',
    description: 'Example description.',
  },
  {
    title: 'Fullstack with React.js',
    author: 'Fullmetal',
    description: 'Example book description',
  }
]

const nonExistingId = async () => {
  const book = new Book({ title: 'nonexsistingbook', author: 'nonexsistingauthor', description: 'nonexsistingdescription' })
  await book.save()
  await book.remove()

  return book._id.toString()
}

const booksInDb = async () => {
  const books = await Book.find({})
  return books.map(book => book.toJSON())
}

module.exports = {
  initialBooks, nonExistingId, booksInDb
}