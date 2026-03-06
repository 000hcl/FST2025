const Navigation = ({ user, handleLogout }) => {
  const padding = {
    paddingRight: 5,
  }
  const barColor = {
    backgroundColor: 'MediumSeaGreen',
    padding: 10
  }
  return (
    <div style={barColor}>
      <a href="/" style={padding}>
        blogs
      </a>
      <a href="/users" style={padding}>
        users
      </a>
      {user && (
        <>
          Logged in as {user.name}{' '}
          <button onClick={handleLogout}>log out</button>
        </>
      )}
    </div>
  )
}

export default Navigation
