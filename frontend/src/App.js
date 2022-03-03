import React, { useState, useEffect } from 'react'
import { useField } from './hooks'
import Books from './components/Books'
import Notification from './components/Notification'
import BookForm from './components/BookForm'

import bookService from './services/books'

function App() {
  const [books, setBooks] = useState([])
  const [book, setBook] = useState(null)
  const [notice, setNotice] = useState('')

  const titleHook = useField('text')
  const authorHook = useField('text')
  const descriptionHook = useField('text')

  const updateMessage = msg => {
    setNotice(msg)
    setTimeout(()  => setNotice(''), 5000)
  }

  useEffect(() => {
    bookService.getAll().then(books => setBooks(books))
  }, [books])

  const createBook = (book) => {
    bookService.create(book)
      .then(bookToAdd => {
        console.log(bookToAdd)
        setBooks(books.concat(bookToAdd))
        updateMessage(`added ${bookToAdd.title}`)
      })
      .catch(error => setNotice(error.response.data.error))
  }

  const updateBook = async (book) => {
      await bookService.update(book)
      setBooks(books.filter(b => b.id !== book.id).concat(book))
      updateMessage(`updated ${book.title}`)
  }

  const deleteBook = async (bookToDelete) => {
    if (window.confirm(`Do you want to remove book '${bookToDelete.title}' by ${bookToDelete.author}?`)) {
      console.log(bookToDelete)
      await bookService.remove(bookToDelete.id)
      setBooks(books.filter(b => b.id !== bookToDelete.id))
      updateMessage(`removed ${bookToDelete.title}`)
    }
  }

  const selectBook = (book) => {
    setBook(book)
    console.log('Book', book)
    titleHook.setValue(book.title)
    descriptionHook.setValue(book.description)
    authorHook.setValue(book.author)
  }

  return (
    <div className="container">
      <Notification message={notice} />
      <Books books={books} selectBook={selectBook} />
      <BookForm book={book} setBook={setBook} crud={{createBook, updateBook, deleteBook}} hooks={{title:titleHook, author:authorHook, description:descriptionHook}} />
    </div>
  )
}

export default App
