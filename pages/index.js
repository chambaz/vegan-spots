import fetch from 'isomorphic-unfetch'

function Home() {
  fetch('http://localhost:3000/spots')
    .then(res => res.json())
    .then(json => {
      console.log(json)
    })
  return <div>Finding hot spots...</div>
}

export default Home
