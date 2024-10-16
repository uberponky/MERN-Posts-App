import { useContext, useState } from "react"
import Alert from "../../components/Alert"
import { registerUser } from "../../controllers/usersController"
import { UserContext } from "../../contexts/UserContext"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const navigate = useNavigate()

  // Consume context
  const { user, setUser } = useContext(UserContext)

  // Error state
  const [error, setError] = useState(null)

  // Form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    console.log(email, password);

    try {
      await registerUser(email, password, passwordConfirm)

      // Update user state
      setUser({ email, posts: [] })

      // Navigate to dash
      navigate('/dashboard')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <>
      <section className="card">
        <h1 className="title">Register for an account</h1>
        <form onSubmit={handleRegister}>
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
          <label htmlFor="password-confirm">Confirm Password</label>
          <input 
            type="password" 
            id="password-confirm" 
            className="input" 
            value={passwordConfirm} 
            autoComplete="current-password"
            onChange={e => setPasswordConfirm(e.target.value)}
          />
          <button className="btn">Register</button>
        </form>

        { error && <Alert message={error} />}
      </section>
    </>
  )
}

export default Register