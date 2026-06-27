import { useEffect, useState } from 'react'
import ticketService from '../services/ticketService.js'
import TicketCard from '../components/TicketCard.jsx'
import './PageStyles.css'

function Bookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await ticketService.getMyBookings()
        setBookings(data)
      } catch (err) {
        setError('Unable to load your bookings.')
      } finally {
        setLoading(false)
      }
    }

    loadBookings()
  }, [])

  return (
    <main className="page page-bookings">
      <div className="page-header">
        <div>
          <p className="eyebrow">My Bookings</p>
          <h1>Your reserved tickets</h1>
        </div>
      </div>

      {loading ? (
        <p>Loading your bookings…</p>
      ) : error ? (
        <p className="form-error">{error}</p>
      ) : bookings.length === 0 ? (
        <p>You have not booked any tickets yet.</p>
      ) : (
        <div className="grid-list">
          {bookings.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </main>
  )
}

export default Bookings
