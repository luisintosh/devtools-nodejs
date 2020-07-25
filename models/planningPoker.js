const mongoose = require('mongoose')

const PlanningPokerSchema = mongoose.Schema(
  {
    cards: mongoose.Schema.Types.Array,
    players: mongoose.Schema.Types.Map,
    finished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamp: true,
  }
)

module.exports = mongoose.model('PlanningPoker', PlanningPokerSchema)
