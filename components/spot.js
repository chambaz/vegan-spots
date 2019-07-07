import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import ShareIcon from '@material-ui/icons/Share'
import MapIcon from '@material-ui/icons/Map'
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
  }
})

function Spot(props) {
  const classes = useStyles()

  return (
    <Card className={classes.card} onClick={e => openMap(props.data)}>
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
