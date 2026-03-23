import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries'


const Books = (props) => {
  const [genreSearch, setGenreSearch] = useState(null)

  const result = useQuery(ALL_BOOKS)
  
  const genreBooksResult = useQuery(BOOKS_BY_GENRE, {
    variables: {
      genre: genreSearch
    },
    skip: !genreSearch
  })


  const books = result.data? result.data.allBooks : []
  const genreBooks = genreBooksResult.data? genreBooksResult.data.allBooks : []
  const genres = [
    ...new Set(books.flatMap(b => b.genres))
  ]
  if (!props.show) {
    return null
  }


  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
      {genreSearch &&
      <h3>books in {genreSearch}</h3>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {genreSearch && 
            genreBooks.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
          ))}
          {!genreSearch && books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map(g => (
        <button key={g} onClick={()=>setGenreSearch(g)}>{g}</button>
      ))
      }
      <button onClick={()=>setGenreSearch(null)}>clear</button>
    </div>
  )
}

export default Books
