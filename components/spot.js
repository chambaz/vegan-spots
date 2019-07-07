import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Box from '@material-ui/core/Box'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import ShareIcon from '@material-ui/icons/Share'
import MapIcon from '@material-ui/icons/Map'
import LocationIcon from '@material-ui/icons/LocationOn'
import GoogleMapReact from 'google-map-react'
import Rating from './rating'

const useStyles = makeStyles({
  card: {
    marginBottom: 40
  },
  header: {
    paddingBottom: 5
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  map: {
    height: 500,
    width: '100%'
  },
  pin: {
    color: 'red',
    fontSize: 20,
    width: 80,
    height: 80
  }
})

function Spot(props) {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.header}
        title={props.data.name}
        subheader={`${props.data.location.address1}, ${
          props.data.location.city
        }`}
      />
      <Rating rate={props.data.rating} />
      <CardMedia
        className={classes.media}
        image={props.data.image_url}
        title={props.data.name}
      />
      <Box className={classes.map}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAztPu0CRUV_tr_5UJUajdPUoW7WK24S0o' }}
          defaultCenter={[
            props.data.coordinates.latitude,
            props.data.coordinates.longitude
          ]}
          defaultZoom={14}
          onGoogleApiLoaded={({ map, maps }) =>
            renderMarkers(map, maps, {
              lat: props.data.coordinates.latitude,
              lng: props.data.coordinates.longitude
            })
          }
        />
      </Box>
      <CardActions disableSpacing>
        <IconButton aria-label="Add to favorites">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="Share">
          <MapIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

function renderMarkers(map, maps, coords) {
  let marker = new maps.Marker({
    position: coords,
    map,
    title: 'Hello World!'
  })
}

function openMap(data) {
  console.log('open!')
  window.open(`https://www.google.com/maps/search/?api=1&query=
  ${data.name +
    data.location.address1 +
    data.location.city +
    data.location.state +
    data.location.zip_code}`)
}

export default Spot
