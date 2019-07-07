const { createServer } = require('http')
const { parse } = require('url')
const fetch = require('isomorphic-unfetch')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (pathname === '/spots') {
      fetch(
        `https://api.yelp.com/v3/businesses/search?categories=restaurant,vegan&term=vegan&latitude=${
          query.lat
        }&longitude=${query.lng}&sort_by=rating`,
        {
          headers: {
            Authorization:
              'Bearer BqkOqV9exIsg_lFAgSFfQzCy3zEXUSgmFq5PjApGw9SIaU3wgm5Wxc0Zle2QxfOeKDjiy2lVoSCDITbOpV6odrqf0PIBJ96GnBL0oH8Bx6qBga_V5d_2IudiH_ogXXYx'
          }
        }
      )
        .then(res => res.json())
        .then(json => {
          res.end(JSON.stringify(json))
        })
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
