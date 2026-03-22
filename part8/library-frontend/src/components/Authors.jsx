import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useQuery } from '@apollo/client/react'
import { useState } from 'react'
import { useMutation } from '@apollo/client/react'


const AuthorEdit = ({ authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({ variables: { name, setBornTo:Number(born) } })
    setBorn('')
    setName('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name:
          {/* <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          /> */}
          <select
            value={name}
            onChange={e => setName(e.target.value)}
          >
            {authors.map(a => (
              <option value={a.name} key={a.id}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          born:
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  if (result.loading) {
    return <div>loading...</div>
  }


  if (!props.show) {
    return null
  }
  

  const authors = result.data.allAuthors
  console.log(authors);
  

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token && (
        <AuthorEdit authors={authors}/>
      )}
      
    </div>
  )
}

export default Authors
