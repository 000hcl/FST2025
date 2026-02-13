import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

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

  const handleCreate = async ({title, author, url}) => {
    const newBlog = { title:title, author:author, url:url }

    try {
      const saved = await blogService.create(newBlog)
      const message = `A new blog ${saved.title} by ${saved.author} added`
      setBlogs(blogs.concat(saved))
      notify(message)
      return true

    } catch (error) {
      const errorMessage = error.response.data.error
      notifyError(errorMessage)
      return false
      
    }
  }

  const notify = ( message ) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const notifyError = (message) => {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 5000)
  }

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
      setError('Invalid username or password')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }



  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    setNotification('You have been successfully logged out')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  



  if (user === null) {
    return(
      <div>
        <Notification message={error} classname={'error'}/>
        <Notification message={notification} classname={'notification'}/>
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
      <Notification message={error} classname={'error'}/>
      <Notification message={notification} classname={'notification'}/>
      <h2>blogs</h2>
      <div>
        Logged in as { user.name } <button onClick={handleLogout}>log out</button>
      </div>
      <CreateForm createBlog={handleCreate} />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      
    </div>
  )
}

export default App