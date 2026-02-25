const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }
  return await response.json()
}

export const createAnecdote = async (anecdote) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anecdote)
    }
    const response = await fetch(baseUrl, options)

    if (!response.ok) {
        throw new Error('Failed to create anecdote')
    }
    console.log(response);
    
    return await response.json()
}


export const voteFor = async (anecdote) => {
    const url = `${baseUrl}/${anecdote.id}`
  
    const newObject = {...anecdote, votes: anecdote.votes+1}
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newObject),
    }
    const response = await fetch(url, options)
    
    if (!response.ok) {
      throw new Error('Failed to vote')
    }
    return await response.json()
}