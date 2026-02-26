import { useState } from 'react'
import './RateJourney.css'

export default function RateJourney({ booking, onBack, onNavigate }) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const review = {
      id: Math.random().toString(36).substr(2, 9),
      rating,
      comment,
      passengerName: booking.passenger.name,
      journeyRoute: `${booking.journey.departure} → ${booking.journey.arrival}`,
      driverName: booking.journey.driverName,
      submittedAt: new Date().toLocaleString('fr-FR')
    }

    console.log('Avis soumis:', review)
    setSubmitted(true)
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('fr-FR', options)
  }

  if (submitted) {
    return (
      <div className="rate-page">
        <div className="rate-container">
          <div className="success-message">
            <div className="success-icon">✅</div>
            <h1>Merci pour votre avis!</h1>
            <p>Votre évaluation a été enregistrée avec succès</p>
            
            <div className="success-details">
              <p>Vous avez noté <strong>{rating}/5</strong> ⭐</p>
              <p className="route">Pour le trajet {booking.journey.departure} → {booking.journey.arrival}</p>
            </div>

            <div className="success-actions">
              <button 
                className="btn-continue"
                onClick={() => onNavigate('browse')}
              >
                Voir d'autres trajets
              </button>
              <button 
                className="btn-home"
                onClick={() => onNavigate('browse')}
              >
                Accueil
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rate-page">
      <div className="rate-container">
        <button className="btn-back-rate" onClick={onBack}>← Retour au ticket</button>

        <div className="rate-card">
          <h1>⭐ Noter ce trajet</h1>
          <p className="rate-subtitle">Dites-nous ce que vous avez pensé de ce trajet</p>

          <div className="journey-summary">
            <div className="summary-row">
              <span className="label">Trajet:</span>
              <span className="value">{booking.journey.departure} → {booking.journey.arrival}</span>
            </div>
            <div className="summary-row">
              <span className="label">Chauffeur:</span>
              <span className="value">{booking.journey.driverName}</span>
            </div>
            <div className="summary-row">
              <span className="label">Date:</span>
              <span className="value">{formatDate(booking.journey.date)}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rate-form">
            <div className="form-group">
              <label>Votre note</label>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    className={`star ${star <= (hoveredRating || rating) ? 'active' : ''}`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                  >
                    ⭐
                  </button>
                ))}
              </div>
              <div className="rating-text">
                {rating > 0 && (
                  <span className="rating-value">
                    {rating === 1 && 'Mauvais 😞'}
                    {rating === 2 && 'Moyen 😐'}
                    {rating === 3 && 'Correct 🙂'}
                    {rating === 4 && 'Bon 😊'}
                    {rating === 5 && 'Excellent! 🤩'}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="comment">Votre commentaire (optionnel)</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Partagez votre expérience... Était-ce confortable? Le chauffeur était-il courtois?"
                rows="5"
              />
              <span className="char-count">{comment.length}/500</span>
            </div>

            <div className="rating-benefits">
              <h3>💡 Pourquoi évaluer?</h3>
              <ul>
                <li>Aidez les autres voyageurs à prendre une bonne décision</li>
                <li>Aidez le chauffeur à s'améliorer</li>
                <li>Obtenez 10 points de fidélité</li>
              </ul>
            </div>

            <div className="form-actions">
              <button 
                type="submit"
                className="btn-submit"
                disabled={rating === 0}
              >
                Envoyer mon avis
              </button>
              <button 
                type="button"
                className="btn-skip"
                onClick={onBack}
              >
                Passer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
