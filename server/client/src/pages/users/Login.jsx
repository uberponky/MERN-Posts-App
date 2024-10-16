import { useContext, useState } from "react"
import Alert from "../../components/Alert"
import { loginUser } from "../../controllers/usersController"
import { UserContext } from "../../contexts/UserContext"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()

  // Consume context
  const { user, setUser } = useContext(UserContext)

  // Error state
  const [error, setError] = useState(null)

  // Form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      // Login user
      await loginUser(email, password)

      // Update user state
      setUser({ email, posts: [] })

      // Navigate to dash
      navigate('/')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <>
      <section className="card">
        <h1 className="title">Login to your account</h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email Address</label>
          <input 
            type="email" 
            id="email" 
            className="input" 
            value={email} 
            onChange={e => setEmail(e.target.value)}
            autoComplete="username"
            autoFocus
          />
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            className="input" 
            value={password} 
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
          />
          <button className="btn">Login</button>
        </form>

        { error && <Alert message={error} />}
      </section>
    </>
  )
}

export default Login