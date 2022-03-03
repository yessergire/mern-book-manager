import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Books from './Books'

jest.mock('../services/books')
import bookService from '../services/books'

describe('<Books />', () => {
  it('renders books', async () => {
    const books = await bookService.getAll()
    const mockHandler = jest.fn()
    const component = render(<Books books={books} selectBook={mockHandler} />)

    const bookElements = component.container.querySelectorAll('.book')
    expect(bookElements.length).toBe(5)
    expect(component.container).toHaveTextContent('React in action')
  })
})
