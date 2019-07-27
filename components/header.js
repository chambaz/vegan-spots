import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Switch from '@material-ui/core/Switch'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
  header: {
    background: 'rgb(202, 98, 53)'
  },
  logo: {
    width: 160
  },
  toggle: {
    marginLeft: 'auto'
  }
})

function Header(props) {
  const classes = useStyles()

  return (
    <AppBar className={classes.header}>
      <Toolbar>
        <img className={classes.logo} src="/static/logo.svg" />
        <Box className={classes.toggle}>
          <Grid component="label" container alignItems="center">
            <Grid item>List</Grid>
            <Grid item>
              <Switch
                color="default"
                onChange={() => {
                  console.log('hi1')
                  props.view.setState(
                    props.view.state === 'map' ? 'list' : 'map'
                  )
                }}
              />
            </Grid>
            <Grid item>Map</Grid>
          </Grid>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
