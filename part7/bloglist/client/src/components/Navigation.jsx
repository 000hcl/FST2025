import { NavButton, Button, LoggedIn, NavBar } from './StyledComponents'

const Navigation = ({ user, handleLogout }) => {

  return (
    <NavBar>
      <NavButton href="/">
        blogs
      </NavButton>
      <NavButton href="/users">
        users
      </NavButton>
      {user && (
        <LoggedIn>
          Logged in as {user.name}{' '}
          <Button onClick={handleLogout}>log out</Button>
        </LoggedIn>
      )}
    </NavBar>
  )
}

export default Navigation
