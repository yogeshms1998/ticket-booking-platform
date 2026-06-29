import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ticketService from '../services/ticketService.js'
import './PageStyles.css'

const initialForm = {
  title: '',
  description: '',
  venue: '',
  date: '',
  totalSeats: '',
  price: '',
}

function CreateEvent() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      await ticketService.createEvent({
        ...form,
        totalSeats: Number(form.totalSeats),
        price: Number(form.price),
        availableSeats: Number(form.totalSeats),
      })

      setMessage('Event created successfully.')
      setForm(initialForm)
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to create event right now.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Admin</p>
          <h1>Create Event</h1>
        </div>
        <button className="button-secondary" type="button" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </button>
      </div>

      <section className="auth-card">
        <form onSubmit={handleSubmit}>
          <label>
            Event title
            <input name="title" value={form.title} onChange={handleChange} required />
          </label>

          <label>
            Description
            <input name="description" value={form.description} onChange={handleChange} required />
          </label>

          <label>
            Venue
            <input name="venue" value={form.venue} onChange={handleChange} required />
          </label>

          <label>
            Date
            <input name="date" type="date" value={form.date} onChange={handleChange} required />
          </label>

          <label>
            Total seats
            <input name="totalSeats" type="number" min="1" value={form.totalSeats} onChange={handleChange} required />
          </label>

          <label>
            Price
            <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} required />
          </label>

          {error && <div className="form-error">{error}</div>}
          {message && <div className="alert-message">{message}</div>}

          <button className="button" type="submit" disabled={loading}>
            {loading ? 'Creating…' : 'Create Event'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default CreateEvent
