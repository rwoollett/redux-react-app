import React from 'react';
import { render, screen } from '@testing-library/react'
import App from '../../App'

test('renders hello world message', () => {
  render(<App />)
  const greetings = screen.getByText(/Hello world/i)
  expect(greetings).toBeInTheDocument()
})
