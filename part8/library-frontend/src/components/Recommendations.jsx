import { FAVORITE_GENRE, BOOKS_BY_GENRE } from "../queries"
import { useQuery } from '@apollo/client/react'

const Recommendations = (props) => {
  const result = useQuery(FAVORITE_GENRE)
  const genre = result.data ? result.data.me.favoriteGenre : null
  const booksResult = useQuery(BOOKS_BY_GENRE, {
    variables: {
      genre: genre
    },
    skip: !result.data
  })
  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  console.log(booksResult);
  const books = booksResult.data ? booksResult.data.allBooks : []
  
  return (
    <div>
      <h2>Recommendations</h2>
      <div>Books in your favorite genre <b>{genre}</b></div>
      <table>
        <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
)
}
export default Recommendations