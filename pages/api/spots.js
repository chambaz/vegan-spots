const { parse } = require('url')
const fetch = require('isomorphic-unfetch')

export default (req, res) => {
  const { query } = parse(req.url, true)

  fetch(
    `https://api.yelp.com/v3/businesses/search?categories=restaurant,vegan&term=vegan&latitude=${
      query.lat
    }&longitude=${query.lng}&sort_by=rating`,
    {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`
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
