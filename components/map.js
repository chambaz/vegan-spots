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
        defaultZoom={14}
      />
    </Box>
  )
}

export default Map
