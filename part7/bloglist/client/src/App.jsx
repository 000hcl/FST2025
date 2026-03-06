import { useState, useEffect, useContext } from 'react'
import NotificationContext from './NotificationContext'
import UserContext from './UserContext'
import BlogListing from './components/BlogListing'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import blogService from './services/blogs'
import loginService from './services/login'
import UserView from './components/UserView'
import User from './components/User'
import userService from './services/users'
import Blog from './components/Blog'
import Navigation from './components/Navigation'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom'

const App = () => {
  const queryClient = useQueryClient()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { notificationDispatch } = useContext(NotificationContext)
  const { user, userDispatch } = useContext(UserContext)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const userdata = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'SETUSER', payload: userdata })
      blogService.setToken(userdata.token)
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
    },
  })

  const likeMutation = useMutation({
    mutationFn: blogService.like,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: (error) => {
      notify(error.request.response)
      console.log(error)
    },
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
    },
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
      const userLogin = await loginService.logIn(username, password)

      window.localStorage.setItem(
        'loggedBloglistUser',
        JSON.stringify(userLogin),
      )
      blogService.setToken(userLogin.token)

      userDispatch({ type: 'SETUSER', payload: userLogin })
      setUsername('')
      setPassword('')
    } catch {
      notify('Invalid username or password.')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    userDispatch({ type: 'REMOVEUSER' })
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
            <BlogListing
              key={blog.id}
              blog={blog}
            />
          ))}
        </div>
      )
    }
  }


  const userResult = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    retry: 1,
    refetchOnWindowFocus: false,
  })


  const BlogView = () => {
    return (
      <div>
        <CreateForm createBlog={handleCreate} />
        {renderBlogs()}
      </div>
    )
  }

  return (
    <Router>
      <Notification />
      <h2>blogs</h2>
      <Navigation user={user} handleLogout={handleLogout}/>
      {!user && (
        <LoginForm
          username={username}
          handleLogin={handleLogin}
          password={password}
          usernameChange={({ target }) => setUsername(target.value)}
          passwordChange={({ target }) => setPassword(target.value)}
        />
      )}
      <Routes>
        <Route path="/" element={<BlogView />} />
        <Route path="/users" element={<UserView result={userResult}/>} />
        <Route path='users/:id' element={<User result={userResult}/>} />
        <Route path='blogs/:id' element={<Blog result={result} handleLike={handleLike} user={user} handleDelete={handleDelete}/>} />
      </Routes>
    </Router>
  )
}

export default App
