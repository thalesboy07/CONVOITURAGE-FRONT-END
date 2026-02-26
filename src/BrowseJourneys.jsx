import { useState } from 'react'
import './BrowseJourneys.css'

export default function BrowseJourneys({ passenger, onNavigate, onLogout }) {
  const [allJourneys] = useState([
    {
      id: 1,
      driverId: 'CH001',
      driverName: 'Kofi Mensah',
      driverPhone: '+228 90 12 34 56',
      vehicle: 'Toyota Hiace',
      licensePlate: 'TG-2024-001',
      departure: 'Lomé',
      arrival: 'Kpalimé',
      date: '2026-02-20',
      departureTime: '08:00',
      duration: '2h30',
      seats: 5,
      availableSeats: 5,
      price: 15000,
      rating: 4.5,
      reviews: 12
    },
    {
      id: 2,
      driverId: 'CH001',
      driverName: 'Kofi Mensah',
      driverPhone: '+228 90 12 34 56',
      vehicle: 'Toyota Hiace',
      licensePlate: 'TG-2024-001',
      departure: 'Kara',
      arrival: 'Kpalimé',
      date: '2026-02-21',
      departureTime: '09:30',
      duration: '3h15',
      seats: 3,
      availableSeats: 2,
      price: 12000,
      rating: 4.8,
      reviews: 8
    },
    {
      id: 3,
      driverId: 'CH002',
      driverName: 'Ama Osei',
      driverPhone: '+228 95 67 89 01',
      vehicle: 'Mercedes Sprinter',
      licensePlate: 'TG-2024-002',
      departure: 'Sokodé',
      arrival: 'Atakpamé',
      date: '2026-02-22',
      departureTime: '07:00',
      duration: '2h00',
      seats: 8,
      availableSeats: 4,
      price: 14000,
      rating: 4.3,
      reviews: 15
    },
    {
      id: 4,
      driverId: 'CH003',
      driverName: 'Kwesi Boateng',
      driverPhone: '+228 92 34 56 78',
      vehicle: 'Ford Transit',
      licensePlate: 'TG-2024-003',
      departure: 'Bassar',
      arrival: 'Lomé',
      date: '2026-02-20',
      departureTime: '10:00',
      duration: '4h30',
      seats: 6,
      availableSeats: 1,
      price: 18000,
      rating: 4.6,
      reviews: 10
    },
    {
      id: 5,
      driverId: 'CH004',
      driverName: 'Akosua Acheampong',
      driverPhone: '+228 98 76 54 32',
      vehicle: 'Nissan caravan',
      licensePlate: 'TG-2024-004',
      departure: 'Kpalimé',
      arrival: 'Mango',
      date: '2026-02-23',
      departureTime: '11:00',
      duration: '5h00',
      seats: 4,
      availableSeats: 3,
      price: 20000,
      rating: 4.9,
      reviews: 20
    }
  ])

  const [searchDeparture, setSearchDeparture] = useState('')
  const [searchArrival, setSearchArrival] = useState('')
  const [selectedJourney, setSelectedJourney] = useState(null)
  const [bookingSeats, setBookingSeats] = useState(1)
  const [bookingConfirmed, setBookingConfirmed] = useState(null)

  const filteredJourneys = allJourneys.filter(j => {
    const departureMatch = j.departure.toLowerCase().includes(searchDeparture.toLowerCase())
    const arrivalMatch = j.arrival.toLowerCase().includes(searchArrival.toLowerCase())
    return departureMatch && arrivalMatch && j.availableSeats > 0
  })

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('fr-FR', options)
  }

  const handleBooking = () => {
    if (!selectedJourney) return
    
    const confirmBooking = {
      id: 'BOK' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      journeyId: selectedJourney.id,
      passenger: {
        name: passenger.name,
        email: passenger.email
      },
      journey: selectedJourney,
      seats: bookingSeats,
      totalPrice: selectedJourney.price * bookingSeats,
      bookedAt: new Date().toLocaleString('fr-FR'),
      status: 'confirmed'
    }
    
    setBookingConfirmed(confirmBooking)
    setSelectedJourney(null)
    setBookingSeats(1)
  }

  return (
    <div className="browse-container">
      {bookingConfirmed ? (
        // Page de confirmation du ticket
        <div className="ticket-page">
          <button className="btn-back-journey" onClick={() => setBookingConfirmed(null)}>← Retour</button>
          <div className="ticket-container">
            <div className="ticket-header">
              <div className="ticket-icon">✅</div>
              <h1>Réservation Confirmée!</h1>
              <p>Votre trajet a été réservé avec succès</p>
            </div>

            <div className="ticket-card">
              <div className="ticket-section">
                <h3>Numéro de Réservation</h3>
                <div className="booking-number">{bookingConfirmed.id}</div>
              </div>

              <div className="ticket-section">
                <h3>Détails du Trajet</h3>
                <div className="detail-row">
                  <span className="label">De:</span>
                  <span className="value">{bookingConfirmed.journey.departure}</span>
                </div>
                <div className="detail-row">
                  <span className="label">À:</span>
                  <span className="value">{bookingConfirmed.journey.arrival}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Date:</span>
                  <span className="value">{formatDate(bookingConfirmed.journey.date)}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Heure de départ:</span>
                  <span className="value">{bookingConfirmed.journey.departureTime}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Durée du trajet:</span>
                  <span className="value">{bookingConfirmed.journey.duration}</span>
                </div>
              </div>

              <div className="ticket-section">
                <h3>Informations Chauffeur</h3>
                <div className="detail-row">
                  <span className="label">Chauffeur:</span>
                  <span className="value">{bookingConfirmed.journey.driverName}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Véhicule:</span>
                  <span className="value">{bookingConfirmed.journey.vehicle} - Plaque: {bookingConfirmed.journey.licensePlate}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Contact:</span>
                  <span className="value">{bookingConfirmed.journey.driverPhone}</span>
                </div>
              </div>

              <div className="ticket-section">
                <h3>Détails de la Réservation</h3>
                <div className="detail-row">
                  <span className="label">Nombre de places:</span>
                  <span className="value">{bookingConfirmed.seats}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Prix unitaire:</span>
                  <span className="value">{bookingConfirmed.journey.price} FCFA</span>
                </div>
                <div className="detail-row price-total">
                  <span className="label">Prix total:</span>
                  <span className="value">{bookingConfirmed.totalPrice} FCFA</span>
                </div>
              </div>

              <div className="ticket-section">
                <h3>Passager</h3>
                <div className="detail-row">
                  <span className="label">Nom:</span>
                  <span className="value">{bookingConfirmed.passenger.name}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Email:</span>
                  <span className="value">{bookingConfirmed.passenger.email}</span>
                </div>
              </div>

              <div className="ticket-notice">
                🔔 Un email de confirmation a été envoyé à {bookingConfirmed.passenger.email}
              </div>
            </div>

            <div className="ticket-actions">
              <button 
                className="btn-rate"
                onClick={() => onNavigate('rate-journey', bookingConfirmed)}
              >
                ⭐ Noter ce trajet
              </button>
              <button 
                className="btn-back-to-browse"
                onClick={() => setBookingConfirmed(null)}
              >
                ← Voir d'autres trajets
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <button className="btn-back-list" onClick={() => onLogout()}>← Accueil</button>
          <header className="browse-header">
            <div className="header-banner">
              <div className="banner-content">
                <h1>🚐 Trajets Disponibles</h1>
                <p>Trouvez et réservez votre trajet universitaire en toute sécurité</p>
              </div>
            </div>
          </header>

          <div className="browse-content">
            {/* Barre de recherche */}
            <div className="search-section">
              <div className="search-box">
                <div className="search-group">
                  <label htmlFor="departure">Départ</label>
                  <input
                    type="text"
                    id="departure"
                    placeholder="Ex: Lomé, Kara"
                    value={searchDeparture}
                    onChange={(e) => setSearchDeparture(e.target.value)}
                  />
                </div>

                <div className="search-group">
                  <label htmlFor="arrival">Arrivée</label>
                  <input
                    type="text"
                    id="arrival"
                    placeholder="Ex: Kpalimé, Sokodé"
                    value={searchArrival}
                    onChange={(e) => setSearchArrival(e.target.value)}
                  />
                </div>

                <button className="btn-search">🔍 Rechercher</button>
              </div>
            </div>

            {/* Résultats */}
            <div className="results-section">
              <h2>Résultats ({filteredJourneys.length} trajet{filteredJourneys.length !== 1 ? 's' : ''})</h2>
              
              {filteredJourneys.length === 0 ? (
                <div className="no-results">
                  <p>Aucun trajet trouvé correspondant à vos critères.</p>
                </div>
              ) : (
                <div className="journeys-grid">
                  {filteredJourneys.map(journey => {
                    const cityColors = {
                      'Lomé': '#FF6B6B',
                      'Kpalimé': '#4ECDC4',
                      'Kara': '#45B7D1',
                      'Sokodé': '#FFA07A',
                      'Atakpamé': '#98D8C8',
                      'Bassar': '#F7DC6F',
                      'Mango': '#BB8FCE'
                    }
                    const destColor = cityColors[journey.arrival] || '#1e40af'
                    
                    return (
                    <div key={journey.id} className="journey-card-passenger">
                      <div className="card-image" style={{ background: `linear-gradient(135deg, ${destColor}cc 0%, ${destColor} 100%)` }}>
                        <span className="destination-emoji">📍</span>
                        <span className="destination-name">{journey.arrival}</span>
                      </div>

                      <div className="card-header">
                        <div className="route-info">
                          <span className="departure">{journey.departure}</span>
                          <span className="arrow">→</span>
                          <span className="arrival">{journey.arrival}</span>
                        </div>
                        <div className="price-badge">{journey.price} FCFA</div>
                      </div>

                      <div className="card-body">
                        <div className="detail-row">
                          <span className="icon">📅</span>
                          <span>{formatDate(journey.date)}</span>
                        </div>

                        <div className="detail-row">
                          <span className="icon">🚗</span>
                          <span>{journey.driverName}</span>
                        </div>

                        <div className="detail-row">
                          <span className="icon">⭐</span>
                          <span>{journey.rating} ({journey.reviews} avis)</span>
                        </div>

                        <div className="detail-row">
                          <span className="icon">💺</span>
                          <span>{journey.availableSeats}/{journey.seats} disponible{journey.availableSeats > 1 ? 's' : ''}</span>
                        </div>

                        {journey.availableSeats <= 2 && (
                          <div className="warning">⚠️ Dernières places!</div>
                        )}
                      </div>

                      <button 
                        className="btn-book"
                        onClick={() => setSelectedJourney(journey)}
                      >
                        Réserver
                      </button>
                    </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Modal de réservation */}
          {selectedJourney && (
            <div className="modal-overlay" onClick={() => setSelectedJourney(null)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button 
                  className="modal-close"
                  onClick={() => setSelectedJourney(null)}
                >
                  ✕
                </button>

                <h2>Réserver un trajet</h2>

                <div className="booking-details">
                  <div className="detail">
                    <span className="label">De:</span>
                    <span className="value">{selectedJourney.departure}</span>
                  </div>
                  <div className="detail">
                    <span className="label">À:</span>
                    <span className="value">{selectedJourney.arrival}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Date:</span>
                    <span className="value">{formatDate(selectedJourney.date)}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Heure:</span>
                    <span className="value">{selectedJourney.departureTime}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Durée:</span>
                    <span className="value">{selectedJourney.duration}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Chauffeur:</span>
                    <span className="value">{selectedJourney.driverName}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Téléphone:</span>
                    <span className="value">{selectedJourney.driverPhone}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Véhicule:</span>
                    <span className="value">{selectedJourney.vehicle} - {selectedJourney.licensePlate}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Prix unitaire:</span>
                    <span className="value">{selectedJourney.price} FCFA</span>
                  </div>
                </div>

                <div className="booking-form">
                  <label htmlFor="seats-count">Nombre de places:</label>
                  <div className="seats-selector">
                    <button 
                      className="seat-btn"
                      onClick={() => setBookingSeats(Math.max(1, bookingSeats - 1))}
                    >
                      −
                    </button>
                    <input 
                      type="number"
                      id="seats-count"
                      min="1"
                      max={selectedJourney.availableSeats}
                      value={bookingSeats}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 1
                        setBookingSeats(Math.min(Math.max(1, val), selectedJourney.availableSeats))
                      }}
                    />
                    <button 
                      className="seat-btn"
                      onClick={() => setBookingSeats(Math.min(selectedJourney.availableSeats, bookingSeats + 1))}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="booking-total">
                  Prix total: <strong>{(selectedJourney.price * bookingSeats)} FCFA</strong>
                </div>

                <div className="modal-actions">
                  <button 
                    className="btn-confirm"
                    onClick={handleBooking}
                  >
                    Confirmer la réservation
                  </button>
                  <button 
                    className="btn-cancel-modal"
                    onClick={() => setSelectedJourney(null)}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
