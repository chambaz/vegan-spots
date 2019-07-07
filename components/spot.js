import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'

const useStyles = makeStyles({
  card: {
    marginBottom: 40
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  }
})

function Spot(props) {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardHeader
        title={props.data.name}
        subheader={`${props.data.location.address1}, ${
          props.data.location.city
        }`}
      />
      <CardMedia
        className={classes.media}
        image={props.data.image_url}
        title={props.data.name}
      />
    </Card>
  )
}

export default Spot
