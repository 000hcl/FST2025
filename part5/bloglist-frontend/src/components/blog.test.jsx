import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not expanded information by default', () => {
  const blog = {
    title: 'testing in react',
    author: 'some guy',
    url: 'www.testing.com/react',
    likes: 600,
    user: {
      name: 'test man',
      username: 'testing2026'
    }
  }

  const { container } = render(<Blog blog={blog}/>)

  const url = screen.queryByText('www.testing.com/react')
  const title = screen.queryByText('testing in react')
  const author = screen.queryByText('some guy')
  const likes = screen.queryByText('600 likes')
  const expanded = container.querySelector('#expanded')
  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(expanded).toBeNull()
  expect(likes).toBeNull()
  expect(url).toBeNull()

})

