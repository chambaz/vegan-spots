import { useEffect, useState } from 'react'
import fetch from 'isomorphic-unfetch'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
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
    visibility: 'hidden',
    position: 'absolute',
    top: 56,
    height: '100vh',
    width: '100vw'
  },
  list: {
    position: 'absolute',
    top: 56
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

            setMap(
              <Map
                data={json.businesses}
                latitude={position.coords.latitude}
                longitude={position.coords.longitude}
              />
            )
          })
      },
      () => {
        console.error('Geolocation error')
      }
    )
  }, [])

  useEffect(() => {
    if (view === 'map') {
      disableBodyScroll()
    } else {
      enableBodyScroll()
    }
  }, [view])

  return (
    <Box>
      <CssBaseline />
      <Loading show={!spots || !spots.length} />
      <Header view={{ state: view, setState: setView }} />
      <Box className={classes.container}>
        <Box
          className={classes.map}
          style={{ visibility: view === 'map' ? 'visible' : 'hidden' }}>
          {map}
        </Box>
        <Box
          className={classes.list}
          style={{
            visibility: view === 'list' ? 'visible' : 'hidden',
            display: view === 'list' ? 'block' : 'none'
          }}>
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
