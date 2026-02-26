import { useState } from 'react'
import './Journey.css'

export default function Journey({ driver, onLogout }) {
  const [journeys, setJourneys] = useState([
    {
      id: 1,
      driverId: 'CH001',
      driverName: 'Kofi Mensah',
      departure: 'Lomé',
      arrival: 'Kpalimé',
      date: '2026-02-20',
      seats: 5,
      price: 15000,
      status: 'open',
      reservations: [
        { id: 'RES001', passengerName: 'Akosua Osei', email: 'akosua@email.com', seats: 2, status: 'pending' },
        { id: 'RES002', passengerName: 'Kwame Adom', email: 'kwame@email.com', seats: 1, status: 'pending' }
      ]
    },
    {
      id: 2,
      driverId: 'CH001',
      driverName: 'Kofi Mensah',
      departure: 'Kara',
      arrival: 'Kpalimé',
      date: '2026-02-21',
      seats: 3,
      price: 12000,
      status: 'open',
      reservations: [
        { id: 'RES003', passengerName: 'Ama Antwi', email: 'ama@email.com', seats: 1, status: 'confirmed' }
      ]
    },
    {
      id: 3,
      driverId: 'CH002',
      driverName: 'Ama Osei',
      departure: 'Sokodé',
      arrival: 'Atakpamé',
      date: '2026-02-22',
      seats: 8,
      price: 14000,
      status: 'open',
      reservations: []
    }
  ])

  const [formData, setFormData] = useState({
    departure: '',
    arrival: '',
    date: '',
    seats: '',
    price: ''
  })

  const [editingId, setEditingId] = useState(null)
  const [errors, setErrors] = useState({})
  const [showReservations, setShowReservations] = useState(null)
  const [currentView, setCurrentView] = useState('journeys')

  // Filtrer les trajets du chauffeur connecté
  const myJourneys = journeys.filter(j => j.driverId === driver.id)

  const validateForm = () => {
    const newErrors = {}
    if (!formData.departure.trim()) newErrors.departure = 'Lieu de départ obligatoire'
    if (!formData.arrival.trim()) newErrors.arrival = 'Lieu d\'arrivée obligatoire'
    if (!formData.date) newErrors.date = 'Date obligatoire'
    if (!formData.seats || formData.seats < 1) newErrors.seats = 'Nombre de places invalide'
    if (!formData.price || formData.price < 0) newErrors.price = 'Prix invalide'
    if (formData.departure === formData.arrival) {
      newErrors.arrival = 'Les lieux doivent être différents'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    if (editingId) {
      setJourneys(journeys.map(j => 
        j.id === editingId 
          ? { ...j, ...formData, seats: parseInt(formData.seats), price: parseFloat(formData.price) }
          : j
      ))
      setEditingId(null)
    } else {
      const newJourney = {
        ...formData,
        id: Math.max(...journeys.map(j => j.id), 0) + 1,
        driverId: driver.id,
        driverName: driver.name,
        seats: parseInt(formData.seats),
        price: parseFloat(formData.price),
        status: 'open',
        reservations: []
      }
      setJourneys([...journeys, newJourney])
    }

    setFormData({
      departure: '',
      arrival: '',
      date: '',
      seats: '',
      price: ''
    })
  }

  const handleEdit = (journey) => {
    setFormData(journey)
    setEditingId(journey.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce trajet?')) {
      setJourneys(journeys.filter(j => j.id !== id))
    }
  }

  const handleCancel = () => {
    setFormData({
      departure: '',
      arrival: '',
      date: '',
      seats: '',
      price: ''
    })
    setEditingId(null)
    setErrors({})
  }

  const handleConfirmReservation = (journeyId, reservationId) => {
    setJourneys(journeys.map(j => 
      j.id === journeyId 
        ? {
            ...j,
            reservations: j.reservations.map(r => 
              r.id === reservationId ? { ...r, status: 'confirmed' } : r
            )
          }
        : j
    ))
  }

  const handleRejectReservation = (journeyId, reservationId) => {
    if (window.confirm('Êtes-vous sûr de vouloir rejeter cette réservation?')) {
      setJourneys(journeys.map(j => 
        j.id === journeyId 
          ? {
              ...j,
              reservations: j.reservations.map(r => 
                r.id === reservationId ? { ...r, status: 'rejected' } : r
              )
            }
          : j
      ))
    }
  }

  const handleCloseReservations = (journeyId) => {
    if (window.confirm('Êtes-vous sûr de vouloir fermer les réservations pour ce trajet?')) {
      setJourneys(journeys.map(j => 
        j.id === journeyId ? { ...j, status: 'closed' } : j
      ))
      setShowReservations(null)
    }
  }

  const getBookedSeats = (journey) => {
    return journey.reservations
      .filter(r => r.status === 'confirmed')
      .reduce((total, r) => total + r.seats, 0)
  }

  const getRemainingSeats = (journey) => {
    return journey.seats - getBookedSeats(journey)
  }

  const getPendingSeats = (journey) => {
    return journey.reservations
      .filter(r => r.status === 'pending')
      .reduce((total, r) => total + r.seats, 0)
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('fr-FR', options)
  }

  const getAllPassengers = () => {
    const passengers = []
    myJourneys.forEach(journey => {
      journey.reservations.forEach(reservation => {
        passengers.push({
          ...reservation,
          journeyId: journey.id,
          journey: {
            id: journey.id,
            departure: journey.departure,
            arrival: journey.arrival,
            date: journey.date,
            price: journey.price
          }
        })
      })
    })
    return passengers.sort((a, b) => a.passengerName.localeCompare(b.passengerName))
  }

  const handleDeletePassenger = (journeyId, reservationId, passengerName) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${passengerName}?`)) {
      setJourneys(journeys.map(j => 
        j.id === journeyId 
          ? {
              ...j,
              reservations: j.reservations.filter(r => r.id !== reservationId)
            }
          : j
      ))
    }
  }

  return (
    <div className="journey-container">
      <button className="btn-back-journey" onClick={() => onLogout()}>← Accueil</button>
      <header className="journey-header">
        <h1>Gestion des Trajets</h1>
        <p>Organisez vos trajets et gérez vos réservations</p>
      </header>

      {/* Onglets de navigation */}
      <div className="journey-tabs">
        <button 
          className={`tab-button ${currentView === 'journeys' ? 'active' : ''}`}
          onClick={() => setCurrentView('journeys')}
        >
          📋 Mes Trajets
        </button>
        <button 
          className={`tab-button ${currentView === 'passengers' ? 'active' : ''}`}
          onClick={() => setCurrentView('passengers')}
        >
          👥 Mes Passagers
        </button>
      </div>

      {currentView === 'journeys' ? (
        <div className="journey-content">
          {/* Formulaire */}
          <div className="journey-form-section">
            <h2>{editingId ? 'Modifier le trajet' : 'Ajouter un nouveau trajet'}</h2>
            
            <form onSubmit={handleSubmit} className="journey-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="departure">Lieu de départ</label>
                  <input
                    type="text"
                    id="departure"
                    name="departure"
                    value={formData.departure}
                    onChange={handleInputChange}
                    placeholder="Ex: Paris"
                    className={errors.departure ? 'error' : ''}
                  />
                  {errors.departure && <span className="error-text">{errors.departure}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="arrival">Lieu d'arrivée</label>
                  <input
                    type="text"
                    id="arrival"
                    name="arrival"
                    value={formData.arrival}
                    onChange={handleInputChange}
                    placeholder="Ex: Lyon"
                    className={errors.arrival ? 'error' : ''}
                  />
                  {errors.arrival && <span className="error-text">{errors.arrival}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Date du trajet</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className={errors.date ? 'error' : ''}
                  />
                  {errors.date && <span className="error-text">{errors.date}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="seats">Nombre de places</label>
                  <input
                    type="number"
                    id="seats"
                    name="seats"
                    value={formData.seats}
                    onChange={handleInputChange}
                    placeholder="Ex: 5"
                    min="1"
                    className={errors.seats ? 'error' : ''}
                  />
                  {errors.seats && <span className="error-text">{errors.seats}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="price">Prix (FCFA)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Ex: 45"
                    min="0"
                    step="0.01"
                    className={errors.price ? 'error' : ''}
                  />
                  {errors.price && <span className="error-text">{errors.price}</span>}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  {editingId ? 'Mettre à jour' : 'Ajouter le trajet'}
                </button>
                {editingId && (
                  <button type="button" className="btn-cancel" onClick={handleCancel}>
                    Annuler
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Liste des trajets */}
          <div className="journey-list-section">
            <h2>Vos trajets ({myJourneys.length})</h2>
            
            {myJourneys.length === 0 ? (
              <div className="empty-state">
                <p>Aucun trajet pour le moment. Créez-en un pour commencer!</p>
              </div>
            ) : (
              <div className="journey-list">
                {myJourneys.map(journey => (
                  <div key={journey.id} className="journey-card">
                    <div className="card-status">
                      <span className={`status-badge ${journey.status}`}>
                        {journey.status === 'open' ? '🟢 Ouvert' : '🔴 Fermé'}
                      </span>
                    </div>

                    <div className="journey-route">
                      <div className="location">
                        <span className="icon">📍</span>
                        <div>
                          <p className="label">Départ</p>
                          <p className="value">{journey.departure}</p>
                        </div>
                      </div>
                      
                      <div className="arrow">→</div>
                      
                      <div className="location">
                        <span className="icon">📍</span>
                        <div>
                          <p className="label">Arrivée</p>
                          <p className="value">{journey.arrival}</p>
                        </div>
                      </div>
                    </div>

                    <div className="journey-details">
                      <div className="detail">
                        <span className="icon">📅</span>
                        <span className="text">{formatDate(journey.date)}</span>
                      </div>
                      
                      <div className="detail">
                        <span className="icon">💺</span>
                        <span className="text">{journey.seats} place{journey.seats > 1 ? 's' : ''}</span>
                      </div>
                      
                      <div className="detail price">
                        <span className="icon">💰</span>
                        <span className="text">{journey.price} FCFA</span>
                      </div>
                    </div>

                    <div className="reservation-stats">
                      <div className="stat booked">
                        <span className="stat-label">Réservées</span>
                        <span className="stat-value">{getBookedSeats(journey)}</span>
                      </div>
                      <div className="stat pending">
                        <span className="stat-label">En attente</span>
                        <span className="stat-value">{getPendingSeats(journey)}</span>
                      </div>
                      <div className="stat remaining">
                        <span className="stat-label">Restantes</span>
                        <span className="stat-value">{getRemainingSeats(journey)}</span>
                      </div>
                    </div>

                    <div className="journey-actions">
                      <button 
                        className="btn-reservations"
                        onClick={() => setShowReservations(showReservations === journey.id ? null : journey.id)}
                      >
                        📋 Réservations ({journey.reservations.length})
                      </button>
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(journey)}
                      >
                        ✏️ Modifier
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(journey.id)}
                      >
                        🗑️ Supprimer
                      </button>
                    </div>

                    {showReservations === journey.id && (
                      <div className="reservations-panel">
                        <div className="panel-header">
                          <h3>Gestion des Réservations</h3>
                          <button 
                            className="btn-close-reservations"
                            onClick={() => handleCloseReservations(journey.id)}
                            disabled={journey.status === 'closed'}
                          >
                            {journey.status === 'closed' ? '🔒 Fermé' : '🔌 Fermer les réservations'}
                          </button>
                        </div>

                        {journey.reservations.length === 0 ? (
                          <p className="no-reservations">Aucune réservation pour ce trajet</p>
                        ) : (
                          <div className="reservations-list">
                            {journey.reservations.map(reservation => (
                              <div key={reservation.id} className={`reservation-item ${reservation.status}`}>
                                <div className="reservation-info">
                                  <div className="passenger-info">
                                    <h4>{reservation.passengerName}</h4>
                                    <p>{reservation.email}</p>
                                  </div>
                                  <div className="reservation-details">
                                    <span className="seats-badge">{reservation.seats} place{reservation.seats > 1 ? 's' : ''}</span>
                                    <span className={`res-status ${reservation.status}`}>
                                      {reservation.status === 'pending' && '⏳ En attente'}
                                      {reservation.status === 'confirmed' && '✅ Confirmée'}
                                      {reservation.status === 'rejected' && '❌ Rejetée'}
                                    </span>
                                  </div>
                                </div>

                                {reservation.status === 'pending' && (
                                  <div className="reservation-actions">
                                    <button 
                                      className="btn-confirm-res"
                                      onClick={() => handleConfirmReservation(journey.id, reservation.id)}
                                    >
                                      ✅ Confirmer
                                    </button>
                                    <button 
                                      className="btn-reject-res"
                                      onClick={() => handleRejectReservation(journey.id, reservation.id)}
                                    >
                                      ❌ Rejeter
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        // Vue des Passagers
        <div className="passengers-view">
          <div className="passengers-header">
            <h2>Tous vos Passagers Inscrits</h2>
            <p>Total: {getAllPassengers().length} passager{getAllPassengers().length !== 1 ? 's' : ''}</p>
          </div>

          {getAllPassengers().length === 0 ? (
            <div className="empty-state">
              <p>Aucun passager inscrit pour vos trajets.</p>
            </div>
          ) : (
            <div className="passengers-table">
              <table>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Trajet</th>
                    <th>Date</th>
                    <th>Places</th>
                    <th>Prix</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {getAllPassengers().map(passenger => (
                    <tr key={passenger.id} className={`passenger-row ${passenger.status}`}>
                      <td 
                        className="passenger-name deletable"
                        onClick={() => handleDeletePassenger(passenger.journeyId, passenger.id, passenger.passengerName)}
                        title="Cliquez pour supprimer"
                      >
                        {passenger.passengerName} <span className="delete-icon">✕</span>
                      </td>
                      <td className="passenger-email">{passenger.email}</td>
                      <td className="journey-route">{passenger.journey.departure} → {passenger.journey.arrival}</td>
                      <td className="journey-date">{formatDate(passenger.journey.date)}</td>
                      <td className="journey-seats">{passenger.seats}</td>
                      <td className="journey-price">{(passenger.journey.price * passenger.seats)} FCFA</td>
                      <td className="journey-status">
                        <span className={`status-badge ${passenger.status}`}>
                          {passenger.status === 'pending' && '⏳ En attente'}
                          {passenger.status === 'confirmed' && '✅ Confirmé'}
                          {passenger.status === 'rejected' && '❌ Rejeté'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}