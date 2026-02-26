import { useState } from 'react'
import Login from './Login'
import Journey from './Journey'
import BrowseJourneys from './BrowseJourneys'
import RateJourney from './RateJourney'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [currentPage, setCurrentPage] = useState('browse')
  const [bookingData, setBookingData] = useState(null)

  const handleLogin = (userInfo) => {
    setUser(userInfo)
    setIsLoggedIn(true)
    setCurrentPage('browse')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
    setCurrentPage('browse')
    setBookingData(null)
  }

  const handleNavigate = (page, data = null) => {
    setCurrentPage(page)
    if (data) {
      setBookingData(data)
    }
  }

  const handleBackFromRating = () => {
    setCurrentPage('browse')
    setBookingData(null)
  }

  return (
    <div className="app">
      {isLoggedIn && (
        <nav className="navbar">
          <div className="nav-content">
            <h3 className="nav-logo"> CONVOITURAGE UNIVERSITAIRE</h3>
            {user?.type === 'driver' && (
              <div className="nav-driver-info">
                <span className="driver-name">{user?.name}</span>
                <span className="driver-id">ID: {user?.id}</span>
              </div>
            )}
            {user?.type === 'passenger' && (
              <div className="nav-passenger-info">
                <span className="passenger-name">{user?.name}</span>
              </div>
            )}
            <button className="btn-logout" onClick={handleLogout}>
              Se déconnecter
            </button>
          </div>
        </nav>
      )}
      
      {isLoggedIn ? (
        user?.type === 'driver' ? (
          <Journey driver={user} onLogout={handleLogout} />
        ) : (
          <>
            {currentPage === 'browse' && (
              <BrowseJourneys passenger={user} onNavigate={handleNavigate} onLogout={handleLogout} />
            )}
            {currentPage === 'rate-journey' && (
              <RateJourney booking={bookingData} onBack={handleBackFromRating} onNavigate={handleNavigate} />
            )}
          </>
        )
      ) : (
        <Login onLoginSuccess={handleLogin} />
      )}
    </div>
  )
}

export default App
