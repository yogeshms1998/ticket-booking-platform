import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import authService from '../services/authService.js'
import './Layout.css'

function Layout() {
  const navigate = useNavigate()
  const isLogged = Boolean(localStorage.getItem('authToken'))

  const handleLogout = () => {
    authService.logout()
    navigate('/')
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">Ticket Booking</div>
        <nav className="app-nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          {isLogged ? (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/bookings">My Bookings</NavLink>
              <NavLink to="/profile">Profile</NavLink>
              <button className="button button-link" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </nav>
      </header>
      <main className="app-content">
        <Outlet />
      </main>
      <footer className="app-footer">
        <p>Ticket Booking Platform &copy; 2026</p>
      </footer>
    </div>
  )
}

export default Layout
