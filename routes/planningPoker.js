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
    res.cookie('player', value.username)
    res.redirect(`/planning-poker/${poker.id}`)
  } catch (err) {
    console.error('Error: ', err)
    res.render('planning-poker/index', { error: err.message })
  }
})

/* GET room id */
router.get('/:id', async (req, res) => {
  const model = await PlanningPokerModel.findById(req.params.id)
  res.render('planning-poker/game', { model })
})

/* POST add vote */
router.post('/:id/vote', async (req, res) => {
  try {
    const roomId = req.params.id
    const playerUsername = req.cookies.player
    const vote = req.body.vote
    const poker = await PlanningPokerModel.findById(roomId)
    if (poker.players.has(playerUsername)) {
      poker.players.set(playerUsername, vote)
      await poker.save()
      global.io.emit('planningPoker', poker.toJSON())
    }
    res.json({ data: 'done' })
  } catch (err) {
    console.error('Error: ', err)
    res.status(404).json({ error: { message: err.message } })
  }
})

module.exports = router
