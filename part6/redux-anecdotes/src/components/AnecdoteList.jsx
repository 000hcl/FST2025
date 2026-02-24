import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase())))
  const dispatch = useDispatch()

  const vote = anecdote => {
    dispatch(voteAnecdote(anecdote))
    dispatch(notify(`You have voted "${anecdote.content}"`))
  }
  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList