const express = require('express')
const router = express.Router()
const PlanningPokerModel = require('../models/planningPoker')
const { newPokerSchema } = require('../validators/planningPoker')

/* GET index */
router.get('/', function (req, res) {
  res.render('planning-poker/index')
})

/* POST new room */
router.post('/new', async (req, res) => {
  try {
    const value = await newPokerSchema.validateAsync(req.body)
    const poker = await PlanningPokerModel.create({
      cards: value.cards.split(','),
      players: { [`${value.username}`]: '' },
    })
    res.cookie('username', value.username)
    res.redirect(`/planning-poker/${poker.id}`)
  } catch (err) {
    console.log('err', err)
    res.render('planning-poker/index', { error: err.message })
  }
})

/* GET room id */
router.get('/:id', async (req, res) => {
  const model = await PlanningPokerModel.findById(req.params.id)
  res.render('planning-poker/game', { model })
})

module.exports = router
