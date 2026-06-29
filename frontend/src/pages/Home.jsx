import { Link } from 'react-router-dom'
import './PageStyles.css'

function Home() {
  const isLogged = Boolean(localStorage.getItem('authToken'))

  return (
    <main className="page page-home">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Ticket Booking Platform</p>
          <h1>Book your next event in minutes</h1>
          <p>
            Search shows, reserve seats, and manage bookings from a modern ticket
            booking dashboard.
          </p>
          <div className="button-row">
            {isLogged ? (
              <Link className="button" to="/dashboard">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link className="button" to="/register">
                  Register
                </Link>
                <Link className="button button-secondary" to="/login">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
