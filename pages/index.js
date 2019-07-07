import { useEffect, useState } from 'react'
import fetch from 'isomorphic-unfetch'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

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
      <CssBaseline />
      <Container>
        {loadingMsg}
        {spots.map((spot, index) => (
          <li key={index}>{spot.name}</li>
        ))}
      </Container>
    </div>
  )
}

export default Home
