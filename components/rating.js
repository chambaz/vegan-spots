import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Star from '@material-ui/icons/Star'
import StarHalf from '@material-ui/icons/StarHalf'

const useStyles = makeStyles({
  list: {
    display: 'flex',
    margin: 0,
    padding: 0
  },
  item: {
    display: 'flex',
    alignItems: 'center'
  },
  star: {
    color: '#ffde03'
  }
})

function Rating(props) {
  const classes = useStyles()
  const baseRate = Math.floor(props.rate)
  let stars = []

  for (let i = 0; i < baseRate; i++) {
    stars.push(
      <Box className={classes.item} component="li">
        <Star className={classes.star} />
      </Box>
    )
  }

  if (props.rate - baseRate === 0.5) {
    stars.push(
      <Box className={classes.item} component="li">
        <StarHalf className={classes.star} />
      </Box>
    )
  }

  return (
    <Box className={classes.list} component="ul">
      {stars}
    </Box>
  )
}

export default Rating
