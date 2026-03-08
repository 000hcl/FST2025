import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { Title, Button, FormStyle, Input } from './StyledComponents'

const CommentForm = ({ handleComment, blog }) => {
  const [comment, setComment] = useState('')
  const commentFunction = async (event) => {
    event.preventDefault()
    await handleComment(comment, blog)
    setComment('')
  }
  return (
    <form onSubmit={commentFunction}>
      <Input
        type="text"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <Button type="submit">comment</Button>
    </form>
  )
}

const Blog = ({ result, handleLike, user, handleDelete, handleComment }) => {
  const id = useParams().id

  if (result.isLoading) {
    return <div>loading...</div>
  }
  if (result.isError) {
    return <div>error</div>
  }

  const blog = result.data.find((b) => b.id === id)

  if (!blog) {
    return null
  }

  const isUser = () => {
    if (user === null) {
      return false
    }
    if (user.username === blog.user.username) {
      return true
    }
    return false
  }

  return (
    <FormStyle>
      <Title>{blog.title}</Title>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      {blog.likes} likes <Button onClick={() => handleLike(blog)}>like</Button>
      <br />
      added by {blog.user.name}
      {isUser() && (
        <div>
          <Button onClick={() => handleDelete(blog)}>delete</Button>
        </div>
      )}
      <div>
        <CommentForm blog={blog} handleComment={handleComment}/>
        <h3>comments</h3>
        <ul>
          {blog.comments.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </FormStyle>
  )
}

export default Blog
