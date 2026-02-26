import { useState } from 'react'
import './Login.css'

export default function Login({ onLoginSuccess }) {
  const [step, setStep] = useState('menu') // menu, driver-form, passenger-form
  const [driverId, setDriverId] = useState('')
  const [driverName, setDriverName] = useState('')
  const [driverPassword, setDriverPassword] = useState('')
  const [passengerName, setPassengerName] = useState('')
  const [passengerEmail, setPassengerEmail] = useState('')
  const [passengerPassword, setPassengerPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleBackToMenu = () => {
    setStep('menu')
    setError('')
    setDriverId('')
    setDriverName('')
    setDriverPassword('')
    setPassengerName('')
    setPassengerEmail('')
    setPassengerPassword('')
  }

  const handleDriverSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    if (!driverId || !driverPassword) {
      setError('Veuillez remplir tous les champs')
      return
    }

    setLoading(true)
    
    // Mode déconnecté - Mock authentication
    setTimeout(() => {
      console.log('Connexion chauffeur (mode hors ligne):', { driverId, driverPassword })
      setLoading(false)
      onLoginSuccess({
        id: driverId,
        name: driverId,
        email: `${driverId}@email.com`,
        type: 'driver'
      })
    }, 500)
  }

  const handlePassengerSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    if (!passengerEmail || !passengerPassword) {
      setError('Veuillez remplir tous les champs')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passengerEmail)) {
      setError('Email invalide')
      return
    }

    setLoading(true)
    
    // Mode déconnecté - Mock authentication
    setTimeout(() => {
      console.log('Connexion passager (mode hors ligne):', { passengerEmail, passengerPassword })
      setLoading(false)
      onLoginSuccess({
        id: passengerEmail,
        name: passengerEmail.split('@')[0],
        email: passengerEmail,
        type: 'passenger'
      })
    }, 500)
  }

  return (
    <div className="login-container">
      {step === 'menu' && (
        // Menu de sélection
        <div className="login-card">
          <h1>� Convoiturage Universitaire</h1>
          <p className="main-subtitle">Partagez les trajets entre étudiants du Togo</p>
          
          <div className="user-type-selection">
            <button 
              className="user-type-btn driver-btn"
              onClick={() => setStep('driver-form')}
            >
              <span className="btn-icon">🚗</span>
              <span className="btn-title">Chauffeur</span>
              <span className="btn-desc">Gérer vos trajets</span>
            </button>

            <button 
              className="user-type-btn passenger-btn"
              onClick={() => setStep('passenger-form')}
            >
              <span className="btn-icon">👤</span>
              <span className="btn-title">Passager</span>
              <span className="btn-desc">Réserver un trajet</span>
            </button>
          </div>

          <div className="footer">
            <p>Sélectionnez votre type d'accès</p>
          </div>
        </div>
      )}

      {step === 'driver-form' && (
        // Formulaire de connexion chauffeur
        <div className="login-card">
          <button className="btn-back" onClick={handleBackToMenu}>← Retour</button>
          
          <h1>🚌 Trading</h1>
          <p className="login-subtitle">Espace Chauffeur</p>
          <form onSubmit={handleDriverSubmit}>
            <div className="form-group">
              <label htmlFor="driverId">ID Chauffeur</label>
              <input
                type="text"
                id="driverId"
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
                placeholder="Ex: CH001"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="driverPassword">Mot de passe</label>
              <input
                type="password"
                id="driverPassword"
                value={driverPassword}
                onChange={(e) => setDriverPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button 
              type="submit" 
              className="btn-login"
              disabled={loading}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>
      )}

      {step === 'passenger-form' && (
        // Formulaire de connexion passager
        <div className="login-card">
          <button className="btn-back" onClick={handleBackToMenu}>← Retour</button>
          
          <h1>🚌 Trading</h1>
          <p className="login-subtitle">Espace Passager</p>
          <form onSubmit={handlePassengerSubmit}>
            <div className="form-group">
              <label htmlFor="passengerEmail">Email</label>
              <input
                type="email"
                id="passengerEmail"
                value={passengerEmail}
                onChange={(e) => setPassengerEmail(e.target.value)}
                placeholder="Ex: marie@email.com"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="passengerPassword">Mot de passe</label>
              <input
                type="password"
                id="passengerPassword"
                value={passengerPassword}
                onChange={(e) => setPassengerPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button 
              type="submit" 
              className="btn-login"
              disabled={loading}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
