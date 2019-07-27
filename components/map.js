import GoogleMapReact from 'google-map-react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles({
  map: {
    height: 'calc(100vh - 56px)',
    width: '100%'
  }
})

function Map(props) {
  const classes = useStyles()

  return (
    <Box className={classes.map}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyAztPu0CRUV_tr_5UJUajdPUoW7WK24S0o'
        }}
        defaultCenter={[props.latitude, props.longitude]}
        defaultZoom={12}
        onGoogleApiLoaded={({ map, maps }) =>
          renderMarkers(map, maps, props.data)
        }
      />
    </Box>
  )
}

function renderMarkers(map, maps, data) {
  const bounds = new google.maps.LatLngBounds()

  data.forEach(spot => {
    new maps.Marker({
      position: {
        lat: spot.coordinates.latitude,
        lng: spot.coordinates.longitude
      },
      map,
      title: spot.name
    })

    bounds.extend(
      new google.maps.LatLng(
        spot.coordinates.latitude,
        spot.coordinates.longitude
      )
    )
  })

  map.fitBounds(bounds)
}

export default Map
