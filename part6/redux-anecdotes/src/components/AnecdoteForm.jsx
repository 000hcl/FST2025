import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const createAnecdote = async (event) => {
    event.preventDefault()
    const anecdoteContent = event.target.anecdote.value
    dispatch(appendAnecdote(anecdoteContent))
    event.target.anecdote.value = ''

    dispatch(notify(`Created anecdote "${anecdoteContent}"`))
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