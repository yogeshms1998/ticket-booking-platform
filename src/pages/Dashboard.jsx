import { useEffect, useState } from 'react'
import ticketService from '../services/ticketService.js'
import TicketCard from '../components/TicketCard.jsx'
import './PageStyles.css'

function Dashboard() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const data = await ticketService.getAvailableTickets()
        setTickets(data)
      } catch (err) {
        setError('Unable to load available tickets.')
      } finally {
        setLoading(false)
      }
    }

    loadTickets()
  }, [])

  const handleBook = async (ticketId) => {
    setMessage('')
    try {
      await ticketService.bookTicket(ticketId)
      setMessage('Your ticket was booked successfully.')
    } catch (err) {
      setMessage('Booking failed. Please try again.')
    }
  }

  return (
    <main className="page page-dashboard">
      <div className="page-header">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Available Tickets</h1>
        </div>
      </div>

      {loading ? (
        <p>Loading available tickets…</p>
      ) : error ? (
        <p className="form-error">{error}</p>
      ) : (
        <div className="grid-list">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              actionLabel="Book now"
              onAction={handleBook}
            />
          ))}
        </div>
      )}

      {message && <div className="alert-message">{message}</div>}
    </main>
  )
}

export default Dashboard
