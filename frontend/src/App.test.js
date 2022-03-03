import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, waitForElement } from '@testing-library/react'
jest.mock('./services/books')
import App from './App'

describe('<App />', () => {

  it('renders all books', async () => {
    const component = render(<App />)
    component.rerender(<App />)
    await waitForElement(
      () => component.container.querySelector('.book')
    )

    const books = component.container.querySelectorAll('.book')
    expect(books.length).toBe(5)
    expect(component.container).toHaveTextContent('React in action')
  })
})
