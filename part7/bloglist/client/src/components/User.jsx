//import userService from '../services/users'
import { useParams } from 'react-router-dom'
import { FormStyle, Title } from './StyledComponents'

const User = ({ result }) => {
  const id = useParams().id
  const users = result.data

  if (result.isLoading) {
    return <div>loading...</div>
  }

  if (result.isError) {
    return <div>error occurred</div>
  }

  const user = users.find((u) => u.id === id)
  console.log(user, users)

  if (!user) {
    return <div>error</div>
  }

  return (
    <FormStyle>
      <Title>{user.name}</Title>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </FormStyle>
  )
}

export default User