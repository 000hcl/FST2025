import { useState } from 'react'
import { FormStyle, Button, Title, Input } from './StyledComponents'

const CreateForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = { title: title, author: author, url: url }

    const createSuccessfully = await createBlog(newBlog)
    if (createSuccessfully) {
      setTitle('')
      setAuthor('')
      setUrl('')
      toggleVisibility()
    }
  }

  return (
    <FormStyle>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{'create new blog'}</Button>
      </div>
      <div style={showWhenVisible}>
        <div>
          <Title>Create new</Title>
          <form onSubmit={addBlog}>
            <div>
              <label>
                title
                <Input
                  type="text"
                  value={title}
                  onChange={({ target }) => setTitle(target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                author
                <Input
                  type="text"
                  value={author}
                  onChange={({ target }) => setAuthor(target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                url
                <Input
                  type="text"
                  value={url}
                  onChange={({ target }) => setUrl(target.value)}
                />
              </label>
            </div>
            <Button type="submit">create</Button>
          </form>
        </div>
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </FormStyle>
  )
}

export default CreateForm
