import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const createAnecdote = async (event) => {
    const anecdoteContent = event.target.anecdote.value
    event.preventDefault()
    const newAnecdote = await anecdoteService.createNew(anecdoteContent)
    dispatch(create(newAnecdote))
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