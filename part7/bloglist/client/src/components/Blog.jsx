import { useParams } from 'react-router-dom'
import { useState } from 'react'

const CommentForm = ({ handleComment, blog }) => {
  const [comment, setComment] = useState('')
  const commentFunction = async (event) => {
    event.preventDefault()
    await handleComment(comment, blog)
    setComment('')
  }
  return (
    <form onSubmit={commentFunction}>
      <input
        type="text"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button type="submit">comment</button>
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
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      {blog.likes} likes <button onClick={() => handleLike(blog)}>like</button>
      <br />
      added by {blog.user.name}
      {isUser() && (
        <div>
          <button onClick={() => handleDelete(blog)}>delete</button>
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
    </div>
  )
}

export default Blog
