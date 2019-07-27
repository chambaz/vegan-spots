import { useEffect, useState } from 'react'
import fetch from 'isomorphic-unfetch'
import Loading from '../components/loading'
import Header from '../components/header'
import Map from '../components/map'
import Spot from '../components/spot'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles({
  map: {
    display: 'none'
  },
  list: {
    display: 'block'
  }
})

function Home() {
  const [currentLocation, setCurrentLocation] = useState([])
  const [spots, setSpots] = useState([])
  const [map, setMap] = useState('')
  const classes = useStyles()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setCurrentLocation([
          position.coords.latitude,
          position.coords.longitude
        ])

        setMap(
          <Map
            latitude={position.coords.latitude}
            longitude={position.coords.longitude}
          />
        )

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
    <Box>
      <CssBaseline />
      <Loading show={!spots || !spots.length} />
      <Header />
      <Box>
        <Box className={classes.map}>{map}</Box>
        <Box className={classes.list}>
          <Container>
            {spots.map((spot, index) => (
              <Spot data={spot} currentLocation={currentLocation} key={index} />
            ))}
          </Container>
        </Box>
      </Box>
    </Box>
  )
}

export default Home
