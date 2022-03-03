import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const Books = ({ books, selectBook }) => {

  return (
    <div>
      <h2>Book manager</h2>
      <table className="table table-hover">
        <thead>
          <tr><th>Title</th><th>Author</th></tr>
        </thead>
        <tbody>
          {books.map(book =>
            <Book key={book.id} book={book} selectBook={selectBook} />)
          }
        </tbody>
      </table>
    </div>
  )
}

Books.propTypes = {
  books: PropTypes.array.isRequired,
  selectBook: PropTypes.func.isRequired,
}

export default Books
