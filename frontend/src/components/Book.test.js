import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Book from './Book'

describe('<Book />', () => {
  const book = {
    title: 'React in action',
    author: ' Mark Tielens Thomas',
    id: "5e17c240e4571f2eaaee4ee6",
    description: 'Example description.',
  }

  it('renders book', async () => {
    const mockHandler = jest.fn()
    const component = render(<Book book={book} selectBook={mockHandler} />)
    const element = screen.getByText(book.title)
    expect(element).toBeDefined()
  })

  it('clicking the button triggers event handler', async () => {
    const mockHandler = jest.fn()
    const component = render(<Book book={book} selectBook={mockHandler} />)

    const button = screen.getByText(book.title)
    userEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})
