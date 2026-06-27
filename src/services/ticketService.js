import api from './api.js'

const getAvailableTickets = async () => {
  const response = await api.get('/tickets')
  return response.data
}

const getMyBookings = async () => {
  const response = await api.get('/bookings')
  return response.data
}

const bookTicket = async (ticketId) => {
  const response = await api.post('/bookings', { ticketId })
  return response.data
}

export default {
  getAvailableTickets,
  getMyBookings,
  bookTicket,
}
