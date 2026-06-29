function TicketCard({ ticket, actionLabel, onAction }) {
  return (
    <article className="ticket-card">
      <div className="ticket-card-body">
        <h3>{ticket.title}</h3>
        <p>{ticket.description}</p>
        <div className="ticket-meta">
          <span>{new Date(ticket.date).toLocaleDateString()}</span>
          <span>{ticket.venue}</span>
        </div>
      </div>
      <div className="ticket-card-actions">
        <strong>{ticket.price ? `$${ticket.price}` : 'Free'}</strong>
        {actionLabel && (
          <button className="button button-secondary" onClick={() => onAction(ticket._id || ticket.id)}>
            {actionLabel}
          </button>
        )}
      </div>
    </article>
  )
}

export default TicketCard
