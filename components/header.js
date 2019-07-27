import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

const useStyles = makeStyles({
  header: {
    background: 'rgb(202, 98, 53)'
  },
  logo: {
    width: 160
  }
})

function Header() {
  const classes = useStyles()

  return (
    <AppBar className={classes.header} position="static">
      <Toolbar>
        <img className={classes.logo} src="/static/logo.svg" />
      </Toolbar>
    </AppBar>
  )
}

export default Header
