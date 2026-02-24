import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const createAnecdote = async (event) => {
    event.preventDefault()
    const anecdoteContent = event.target.anecdote.value
    dispatch(appendAnecdote(anecdoteContent))
    event.target.anecdote.value = ''
    
    dispatch(setNotification(`Created anecdote "${anecdoteContent}"`))
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