import api from './api.js'

const getAvailableTickets = async () => {
  const response = await api.get('/events')
  return response.data.events
}

const getMyBookings = async () => {
  const response = await api.get('/bookings/my-bookings')
  return response.data.bookings
}

const bookTicket = async (eventId) => {
  const response = await api.post('/bookings', { eventId, quantity: 1 })
  return response.data
}

const createEvent = async (eventData) => {
  const response = await api.post('/events', eventData)
  return response.data
}

export default {
  getAvailableTickets,
  getMyBookings,
  bookTicket,
  createEvent,
}
