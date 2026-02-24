const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch notes')
  }

  const data = await response.json()
  return data
}

const createNew = async (content) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0, id:getId() }),
  }
  const response = await fetch(baseUrl, options)
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
  
  return await response.json()
}

const vote = async (anecdote) => {
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


export default { getAll, createNew, vote }