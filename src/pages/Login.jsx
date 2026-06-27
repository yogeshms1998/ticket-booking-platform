import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../services/authService.js'
import './PageStyles.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await authService.login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError('Login failed. Please check your email and password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page page-auth">
      <div className="auth-card">
        <h1>Login</h1>
        <p>Use your account to access the ticket dashboard.</p>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </label>
          {error && <div className="form-error">{error}</div>}
          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </form>
        <p className="form-footnote">
          Don&apos;t have an account? <Link to="/register">Register instead</Link>
        </p>
      </div>
    </main>
  )
}

export default Login
