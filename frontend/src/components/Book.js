import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Book = ({ book, selectBook }) =>
    <tr className="book">
      <td><button className="btn btn-link" onClick={() => selectBook(book)}>{book.title}</button></td>
      <td>{book.author}</td>
    </tr>

Book.propTypes = {
  book: PropTypes.object.isRequired,
  selectBook: PropTypes.func.isRequired,
}

export default Book
