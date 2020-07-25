module.exports = (app) => {
  /* Routes for /planning-poker */
  app.use('/planning-poker', require('./planningPoker'))

  /* GET home page. */
  app.use('/', (req, res) => {
    res.render('index')
  })
}
