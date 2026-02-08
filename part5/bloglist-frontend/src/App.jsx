import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      
      const user = await loginService.logIn(username, password)

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      console.log('invalid credentials');
    }
  }



  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const handleCreate = (event) => {
    event.preventDefault()
    const newBlog = { title:title, author:author, url:url }

    try {
      blogService.create(newBlog).then(saved => {
        setBlogs(blogs.concat(saved))
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      
      
    } catch (error) {
      console.log(error);
      
    }
  }



  if (user === null) {
    return(
      <div>
        <LoginForm
        username={username}
        handleLogin={handleLogin}
        password={password}
        usernameChange={({ target }) => setUsername(target.value)}
        passwordChange={({ target }) => setPassword(target.value)} />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <div>
        Logged in as { user.name } <button onClick={handleLogout}>log out</button>
      </div>
      <CreateForm
        handleCreate={handleCreate}
        title={title}
        handleTitle={({ target }) => setTitle(target.value)}
        author={author}
        handleAuthor={({ target }) => setAuthor(target.value)}
        url={url}
        handleUrl={({ target }) => setUrl(target.value)} />
      <br/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      
    </div>
  )
}

export default App