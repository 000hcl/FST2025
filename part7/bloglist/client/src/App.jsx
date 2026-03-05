import { useState, useEffect, useContext } from 'react'
import NotificationContext from './NotificationContext'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const App = () => {
  const queryClient = useQueryClient()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const { notificationDispatch } = useContext(NotificationContext)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleCreate = async ({ title, author, url }) => {
    const newBlog = { title: title, author: author, url: url }

    try {
      const message = `A new blog ${title} by ${author} added`
      createMutation.mutate(newBlog)
      notify(message)
      return true
    } catch (error) {
      const errorMessage = error.response.data.error
      notify(errorMessage)
      return false
    }
  }

  const createMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: (error) => {
      notify(error.request.response)
      console.log(error)
    }
  })

  const likeMutation = useMutation({
    mutationFn: blogService.like,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: (error) => {
      notify(error.request.response)
      console.log(error)
    }
  })

  const deleteMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: (error) => {
      notify('An error occurred in attempted deletion')
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      console.log(error)
    }
  })

  const notify = (message) => {
    notificationDispatch({ type: 'NOTIFY', payload: message })
    setTimeout(() => {
      notificationDispatch({ type: 'NULLIFY' })
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.logIn(username, password)

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      notify('Invalid username or password.')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    notify('You have been successfully logged out')
  }

  const handleLike = async (blog) => {
    likeMutation.mutate(blog)
  }

  const handleDelete = async (blog) => {
    const deleteOk = window.confirm(
      `Are you sure you want to delete ${blog.title}?`,
    )
    if (deleteOk) {
      deleteMutation.mutate(blog)
      notify(`Deleted ${blog.title}`)

      //getAndSetBlogs()
    }
  }

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  const blogs = result.data

  const renderBlogs = () => {
    if (result.isError) {
      return <div>error</div>
    }
    if (result.isLoading) {
      return <div>loading...</div>
    } else {
      return (
        <div>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              likeFunction={handleLike}
              deleteFunction={handleDelete}
            />
          ))}
        </div>
      )
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm
          username={username}
          handleLogin={handleLogin}
          password={password}
          usernameChange={({ target }) => setUsername(target.value)}
          passwordChange={({ target }) => setPassword(target.value)}
        />
        {renderBlogs()}
      </div>
    )
  }
  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <div>
        Logged in as {user.name} <button onClick={handleLogout}>log out</button>
      </div>
      <CreateForm createBlog={handleCreate} />

      {renderBlogs()}
    </div>
  )
}

export default App
