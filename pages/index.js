import { useEffect, useState } from 'react'
import fetch from 'isomorphic-unfetch'
import Loading from '../components/loading'
import Header from '../components/header'
import Spot from '../components/spot'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

function Home() {
  const [currentLocation, setCurrentLocation] = useState([])
  const [spots, setSpots] = useState([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setCurrentLocation([
          position.coords.latitude,
          position.coords.longitude
        ])
        fetch(
          `/api/spots?lat=${position.coords.latitude}&lng=${
            position.coords.longitude
          }`
        )
          .then(res => res.json())
          .then(json => {
            if (json.error) {
              console.error('Error fetching spots')
              return
            }
            setSpots(json.businesses)
          })
      },
      () => {
        console.error('Geolocation error')
      }
    )
  }, [])

  return (
    <div>
      <CssBaseline />
      <Loading show={!spots || !spots.length} />
      <Header />
      <Container>
        {spots.map((spot, index) => (
          <Spot data={spot} currentLocation={currentLocation} key={index} />
        ))}
      </Container>
    </div>
  )
}

export default Home
