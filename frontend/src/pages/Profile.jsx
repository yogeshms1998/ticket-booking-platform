import { useEffect, useState } from 'react'
import authService from '../services/authService.js'
import './PageStyles.css'

function Profile() {
  const [user, setUser] = useState({ name: 'Guest', email: 'guest@example.com' })

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  return (
    <main className="page page-profile">
      <div className="page-header">
        <div>
          <p className="eyebrow">Profile</p>
          <h1>Your account details</h1>
        </div>
      </div>
      <section className="profile-card">
        <div>
          <p className="field-label">Name</p>
          <p>{user.name}</p>
        </div>
        <div>
          <p className="field-label">Email</p>
          <p>{user.email}</p>
        </div>
      </section>
    </main>
  )
}

export default Profile
