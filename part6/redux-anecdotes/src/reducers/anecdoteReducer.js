import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    create(state, action) {
      state.push(action.payload)
    },
    voteFor(state, action) {
      const id = action.payload
      const toVote = state.find(n => n.id === id)
      const voted = { ...toVote, votes: toVote.votes+1}
      return state.map(a => a.id !== id ? a : voted).sort((a, b) => b.votes-a.votes)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})
const { setAnecdotes, create, voteFor } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes.sort((a, b) => b.votes-a.votes)))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(create(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.vote(anecdote)
    dispatch(voteFor(newAnecdote.id))
    
  }
}

export default anecdoteSlice.reducer
