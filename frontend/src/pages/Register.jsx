import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../services/authService.js'
import './PageStyles.css'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords must match.')
      return
    }

    setLoading(true)
    try {
      await authService.register(name, email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(
        err?.response?.data?.message || 'Registration failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page page-auth">
      <div className="auth-card">
        <h1>Register</h1>
        <p>Create an account and start booking your tickets.</p>
        <form onSubmit={handleSubmit}>
          <label>
            Full name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your full name"
            />
          </label>
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
              placeholder="Create a password"
            />
          </label>
          <label>
            Confirm password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Repeat your password"
            />
          </label>
          {error && <div className="form-error">{error}</div>}
          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Registering…' : 'Register'}
          </button>
        </form>
        <p className="form-footnote">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </main>
  )
}

export default Register
