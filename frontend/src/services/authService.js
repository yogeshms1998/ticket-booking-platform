import api from './api.js'

const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password })
  const data = response.data
  if (data.token) {
    localStorage.setItem('authToken', data.token)
    if (data.user) {
      localStorage.setItem('authUser', JSON.stringify(data.user))
    }
  }
  return data
}

const register = async (name, email, password) => {
  const response = await api.post('/auth/register', { name, email, password })
  const data = response.data
  if (data.token) {
    localStorage.setItem('authToken', data.token)
    if (data.user) {
      localStorage.setItem('authUser', JSON.stringify(data.user))
    }
  }
  return data
}

const logout = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('authUser')
}

const getCurrentUser = () => {
  const raw = localStorage.getItem('authUser')
  return raw ? JSON.parse(raw) : null
}

export default {
  login,
  register,
  logout,
  getCurrentUser,
}
