import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Star from '@material-ui/icons/Star'
import StarHalf from '@material-ui/icons/StarHalf'

const useStyles = makeStyles({
  star: {
    color: '#ffde03'
  }
})

function Rating() {
  const classes = useStyles()

  return (
    <Box component="ul">
      <Box component="li">
        <Star className={classes.star} />
      </Box>
      <Box component="li">
        <StarHalf className={classes.star} />
      </Box>
    </Box>
  )
}

export default Rating
