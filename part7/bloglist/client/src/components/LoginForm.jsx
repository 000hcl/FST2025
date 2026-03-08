import { Title, Input, FormStyle, Button } from './StyledComponents'

const LoginForm = ({
  handleLogin,
  username,
  usernameChange,
  password,
  passwordChange,
}) => {
  return (
    <FormStyle>
      <Title>Log in to bloglist</Title>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <Input type="text" value={username} onChange={usernameChange} />
          </label>
        </div>
        <div>
          <label>
            password
            <Input type="password" value={password} onChange={passwordChange} />
          </label>
        </div>
        <Button type="submit">login</Button>
      </form>
    </FormStyle>
  )
}

export default LoginForm
