import { useEffect, useState, useRef } from 'react'
import fetch from 'isomorphic-unfetch'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import Loading from '../components/loading'
import Header from '../components/header'
import Map from '../components/map'
import Spot from '../components/spot'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
  map: {
    visibility: 'hidden',
    position: 'absolute',
    top: 56,
    height: '100vh',
    width: '100vw',
    [theme.breakpoints.up('sm')]: {
      top: 63
    }
  },
  list: {
    position: 'absolute',
    top: 56,
    width: '100vw',
    [theme.breakpoints.up('sm')]: {
      top: 76
    }
  },
  spotsContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '0 10px',
    [theme.breakpoints.up('sm')]: {
      padding: '0 20px'
    },
    [theme.breakpoints.up('md')]: {
      padding: '0 10px 0 20px'
    }
  },
  spots: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  }
}))

function Home() {
  const [currentLocation, setCurrentLocation] = useState([])
  const [spots, setSpots] = useState([])
  const [map, setMap] = useState('')
  const [view, setView] = useState('list')
  const mapContainer = useRef(null)
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
      disableBodyScroll(mapContainer)
      document.body.scrollTop = 0
    } else {
      enableBodyScroll(mapContainer)
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
          ref={mapContainer}
          style={{ visibility: view === 'map' ? 'visible' : 'hidden' }}>
          {map}
        </Box>
        <Box
          className={classes.list}
          style={{
            visibility: view === 'list' ? 'visible' : 'hidden',
            display: view === 'list' ? 'block' : 'none'
          }}>
          <Box className={classes.spotsContainer}>
            <Box className={classes.spots}>
              {spots.map((spot, index) => (
                <Spot
                  data={spot}
                  currentLocation={currentLocation}
                  key={index}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Home
