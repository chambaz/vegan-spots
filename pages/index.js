import { useEffect, useState } from 'react'
import fetch from 'isomorphic-unfetch'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'

const useStyles = makeStyles({
  card: {
    margin: '20px 0'
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  }
})

function Home() {
  const [spots, setSpots] = useState([])
  const classes = useStyles()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        fetch(
          `http://localhost:3000/spots?lat=${position.coords.latitude}&lng=${
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

  const loadingMsg = !spots || !spots.length ? <p>Finding hot spots...</p> : ''

  return (
    <div>
      <CssBaseline />
      <Container>
        {loadingMsg}
        {spots.map((spot, index) => (
          <Card className={classes.card} key={index}>
            <CardHeader
              title={spot.name}
              subheader={`${spot.location.address1}, ${spot.location.city}`}
            />
            <CardMedia
              className={classes.media}
              image={spot.image_url}
              title={spot.name}
            />
          </Card>
        ))}
      </Container>
    </div>
  )
}

export default Home
