import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAnecdotes, voteFor } from './requests'

const App = () => {
  const queryClient = useQueryClient()
  const voteMutation = useMutation({
      mutationFn: voteFor,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      },
      onError: (error) => console.log(error)
      
    })

  const handleVote = async (anecdote) => {
    voteMutation.mutate(anecdote)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false
  })
  if (result.isError) {
    return <div>anecdote service not available due to error</div>
  }
  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
