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
const { setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const { create, voteFor } = anecdoteSlice.actions
export default anecdoteSlice.reducer
