import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  loading: {
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    height: '100vh',
    width: '100vw'
  },
  msg: {
    margin: '0 0 30px',
    fontSize: 20,
    fontWeight: 'bold'
  }
})

function Loading(props) {
  const classes = useStyles()

  let render = (
    <Box className={classes.loading}>
      <Typography component="p" className={classes.msg}>
        Finding hot spots...
      </Typography>
      <CircularProgress className={classes.progress} />
    </Box>
  )

  if (!props.show) {
    render = ''
  }

  return render
}

export default Loading
