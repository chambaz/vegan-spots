import { useEffect, useState } from 'react'
import fetch from 'isomorphic-unfetch'

function Home() {
  const [spots, setSpots] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/spots')
      .then(res => res.json())
      .then(json => {
        setSpots(json.businesses)
      })
  })

  const loadingMsg = !spots || !spots.length ? <p>Finding hot spots...</p> : ''

  return (
    <div>
      {loadingMsg}
      {spots.map((spot, index) => (
        <li key={index}>{spot.name}</li>
      ))}
    </div>
  )
}

export default Home
