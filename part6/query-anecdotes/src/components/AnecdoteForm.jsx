import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext } from "react"
import NotificationContext from "../NotificationContext"


const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { notificationDispatch } = useContext(NotificationContext)
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      
    },
    onError: (error) => console.log(error)

  })
  const getId = () => (100000 * Math.random()).toFixed(0)


  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    
    event.target.anecdote.value = ''
    notificationDispatch({ type:'NOTIFY', payload:`Added ${content}` })
    setTimeout(() => {
      notificationDispatch({ type: 'NULLIFY' })
    }, 5000)
    newAnecdoteMutation.mutate({ content, id:getId(), votes:0 })
    
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
