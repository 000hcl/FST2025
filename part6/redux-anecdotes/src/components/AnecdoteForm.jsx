import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const createAnecdote = event => {
    const anecdote = event.target.anecdote.value
    event.preventDefault()
    dispatch(create(anecdote))
    event.target.anecdote.value = ''
    dispatch(setNotification(`Created anecdote "${anecdote}"`))
    setTimeout(() => dispatch(removeNotification()), 5000)
    }
    return (
    <div>
        <h2>create new</h2>
        <form onSubmit={createAnecdote}>
            <div>
            <input name="anecdote"/>
            </div>
            <button type="submit">create</button>
        </form>
    </div>
    )
}

export default AnecdoteForm