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
import getDistance from 'geolib/es/getDistance'
import Rating from './rating'

const useStyles = makeStyles(theme => ({
  card: {
    margin: '20px 10px 0',
    width: '100%',

    [theme.breakpoints.up('sm')]: {
      width: 'calc(50% - 20px)'
    },

    [theme.breakpoints.up('md')]: {
      width: 'calc(33% - 20px)'
    },

    [theme.breakpoints.up('lg')]: {
      width: 'calc(25% - 20px)'
    }
  },
  header: {
    paddingBottom: 5
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 13px 10px'
  },
  distanceIcon: {
    width: 15,
    height: 15,
    transform: 'rotate(-40deg) translateY(2px)',
    margin: '0 7px 0 0'
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
}))

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
          bootstrapURLKeys={{ key: 'AIzaSyCokTDUDFeNzjuiulMUv8kbFidhf4rK23M' }}
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

  let distance =
    getDistance(
      {
        latitude: props.currentLocation[0],
        longitude: props.currentLocation[1]
      },
      {
        latitude: props.data.coordinates.latitude,
        longitude: props.data.coordinates.longitude
      }
    ) * 0.00062137

  if (distance < 1) {
    distance = '< 1 mile away'
  } else {
    distance = `${Math.ceil(distance)} miles away`
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
      <Box className={classes.details}>
        <Rating rate={props.data.rating} />
        <Box>
          <NavigationIcon className={classes.distanceIcon} />
          {distance}
        </Box>
      </Box>
      {content}
      <CardActions disableSpacing>
        <IconButton onClick={() => shareSpot(props.data)} aria-label="Share">
          <ShareIcon />
        </IconButton>
        <IconButton onClick={() => setShowMap(!showMap)} aria-label="Map">
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

function mapsLink(data) {
  return `https://www.google.com/maps/dir/?api=1&destination=
  ${data.name}, ${data.location.address1}, ${data.location.city}, ${
    data.location.state
  } ${data.location.zip_code}`
}

function shareSpot(data) {
  if (navigator.share) {
    navigator.share({
      title: data.name,
      url: mapsLink(data)
    })
  }
}

function openDirections(data) {
  window.location = mapsLink(data)
}

export default Spot
