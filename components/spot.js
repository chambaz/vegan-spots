import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Box from '@material-ui/core/Box'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import ShareIcon from '@material-ui/icons/Share'
import MapIcon from '@material-ui/icons/Map'
import NavigationIcon from '@material-ui/icons/Navigation'
import GoogleMapReact from 'google-map-react'
import Rating from './rating'

const useStyles = makeStyles({
  card: {
    marginBottom: 40,
    maxWidth: 343,
    margin: '0 auto'
  },
  header: {
    paddingBottom: 5
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  map: {
    height: 193,
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
  const [showMap, setShowMap] = useState(false)
  const classes = useStyles()

  let content = (
    <CardMedia
      className={classes.media}
      image={props.data.image_url}
      title={props.data.name}
      onClick={e => setShowMap(true)}
    />
  )

  if (showMap) {
    content = (
      <Box className={classes.map}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAztPu0CRUV_tr_5UJUajdPUoW7WK24S0o' }}
          defaultCenter={[
            props.data.coordinates.latitude,
            props.data.coordinates.longitude
          ]}
          defaultZoom={14}
          onGoogleApiLoaded={({ map, maps }) =>
            renderMarkers(map, maps, props.data)
          }
        />
      </Box>
    )
  }

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
      {content}
      <CardActions disableSpacing>
        <IconButton aria-label="Share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="Map" onClick={e => setShowMap(!showMap)}>
          <MapIcon />
        </IconButton>
        <IconButton
          aria-label="Directions"
          onClick={e => openDirections(props.data)}>
          <NavigationIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

function renderMarkers(map, maps, data) {
  new maps.Marker({
    position: {
      lat: data.coordinates.latitude,
      lng: data.coordinates.longitude
    },
    map,
    title: data.name
  })
}

function openDirections(data) {
  window.location = `https://www.google.com/maps/dir/?api=1&destination=
  ${data.name}, ${data.location.address1}, ${data.location.city}, ${
    data.location.state
  } ${data.location.zip_code}`
}

export default Spot
