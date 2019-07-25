const { parse } = require('url')
const fetch = require('isomorphic-unfetch')

export default (req, res) => {
  const parsedUrl = parse(req.url, true)
  const { pathname, query } = parsedUrl

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
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = 200
      res.end(JSON.stringify(json))
    })
}
