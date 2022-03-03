import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const BookForm = ({ crud, hooks, book, setBook }) => {
  const {createBook, updateBook, deleteBook} = crud
  const {title, author, description} = hooks

  const extractValuesFromFields = () => {
    const bookData = {
      author: author.field.value,
      title: title.field.value,
      description: description.field.value,
      id: book?.id
    }
    author.reset()
    description.reset()
    title.reset()
    return bookData
  }

  const addBook = (event) => {
    createBook(extractValuesFromFields())
    setBook(null)
  }

  const editBook = (event) => {
    updateBook(extractValuesFromFields())
    setBook(null)
  }

  const removeBook = (event) => {
    deleteBook(extractValuesFromFields())
    setBook(null)
  }

  return (
    <div>
      <form className="col-6">
        <div className="mb-3">
          <label htmlFor="input-title" className="form-label">title</label>
          <input className="form-control" name="title" id="input-title" {...title.field} />
        </div>
        <div className="mb-3">
          <label htmlFor="input-author" className="form-label">author</label>
          <input className="form-control" name="author" id="input-author" {...author.field}/>
        </div>
        <div className="mb-3">
          <label htmlFor="input-description" className="form-label">description</label>
          <textarea className="form-control" name="description" {...description.field} />
        </div>
        <div className="mb-3">
          <button className="btn btn-outline-primary" type="button" onClick={addBook}>Save new</button>
          <button className="btn btn-outline-primary" type="button" onClick={editBook} disabled={(book)? false: true}>Save</button>
          <button className="btn btn-outline-danger" type="button" onClick={removeBook} disabled={(book)? false: true}>Delete</button>
        </div>
      </form>
    </div>
  )
}

BookForm.propTypes = {
  crud: PropTypes.object.isRequired,
  hooks: PropTypes.object.isRequired,
  setBook: PropTypes.func.isRequired,
}

export default BookForm
