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
  container: {
    marginTop: 56
  },
  map: {
    display: 'none'
  },
  list: {
    marginTop: 75
  }
})

function Home() {
  const [currentLocation, setCurrentLocation] = useState([])
  const [spots, setSpots] = useState([])
  const [map, setMap] = useState('')
  const [view, setView] = useState('list')
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
      <Header view={{ state: view, setState: setView }} />
      <Box className={classes.container}>
        <Box
          className={classes.map}
          style={{ display: view === 'map' ? 'block' : 'none' }}>
          {map}
        </Box>
        <Box
          className={classes.list}
          style={{ display: view === 'list' ? 'block' : 'none' }}>
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
