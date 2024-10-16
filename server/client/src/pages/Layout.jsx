import { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

const Layout = () => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)

  const handleLogout = () => {
    setUser({ email: null, posts: [] })
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <>
      <header className="bg-indigo-500 text-white">
        <nav className="flex items-center justify-between p-4">
          <Link to="/" className="nav-link hover:bg-indigo-600 px-2">Home</Link>
          { user.email ? (
            <div className="flex grow justify-end gap-2">
              <Link to="/new-post" title="New Post" className="nav-link hover:bg-indigo-600 px-2">New Post</Link>
              <Link to="/dashboard" title="My Posts" className="nav-link hover:bg-indigo-600 px-2">My Posts</Link>
              <button title="Logout" className="nav-link hover:bg-indigo-600 px-2" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="flex grow justify-end gap-2">
              <Link to="/login" title="Login" className="nav-link hover:bg-indigo-600 px-2">Login</Link>
              <Link to="/register" title="Register" className="nav-link hover:bg-indigo-600 px-2">Register</Link>
            </div>
          )
          }
        </nav>
      </header>

      <main className="p-4">
        <Outlet />
      </main>
    </>
  )
}

export default Layout