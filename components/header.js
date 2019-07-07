import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

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
  }
})

function Header() {
  const classes = useStyles()

  return (
    <Box component="header" className={classes.header}>
      <img className={classes.icon} src="/static/carrot.svg" />
      <Typography component="h1" className={classes.heading}>
        VeganSpots
      </Typography>
    </Box>
  )
}

export default Header
