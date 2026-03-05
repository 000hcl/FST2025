import userService from '../services/users'
import { useQuery } from '@tanstack/react-query'

const UserView = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    retry: 1,
    refetchOnWindowFocus: false,
  })
  const users = result.data
  if (result.isLoading) {
    return <div>users loading...</div>
  }
  if (result.isError) {
    return <div>error fetching users</div>
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserView
