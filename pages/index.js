import { useEffect, useState } from 'react'
import fetch from 'isomorphic-unfetch'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'

const useStyles = makeStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    padding: 20
  },
  icon: {
    display: 'block',
    height: 40,
    marginRight: 10
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw'
  },
  msg: {
    margin: '0 0 30px',
    fontSize: 20,
    fontWeight: 'bold'
  },
  card: {
    marginBottom: 40
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
          `${window.location.origin}/spots?lat=${
            position.coords.latitude
          }&lng=${position.coords.longitude}`
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

  const loadingMsg =
    !spots || !spots.length ? (
      <Box className={classes.loading}>
        <p className={classes.msg}>Finding hot spots...</p>
        <CircularProgress className={classes.progress} />
      </Box>
    ) : (
      ''
    )

  return (
    <div>
      <CssBaseline />
      {loadingMsg}
      <Container>
        <Box component="header" className={classes.header}>
          <img className={classes.icon} src="/static/carrot.svg" />
          <Typography component="h1" className={classes.heading}>
            VeganSpots
          </Typography>
        </Box>
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
