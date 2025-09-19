import React, { useState, useEffect } from 'react'

function App() {
  const [dogImage, setDogImage] = useState(null)
  const [loading, setLoading] = useState(true)

  // Function to fetch a random dog image
  const fetchDog = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://dog.ceo/api/breeds/image/random')
      const data = await response.json()
      setDogImage(data.message)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching dog image:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDog()
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>🐶 Random Dog Image</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <img src={dogImage} alt="A Random Dog" width="400" />
      )}
      <div>
        <button aria-label="Get New Dog" onClick={fetchDog}>Get New Dog</button>
      </div>
    </div>
  )
}

export default App
