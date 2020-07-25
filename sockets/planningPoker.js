const PlanningPokerModel = require('../models/planningPoker')

module.exports = (io, socket) => {
  socket.on('planningPoker', async (id) => {
    try {
      const poker = await PlanningPokerModel.findById(id)
      io.emit('planningPoker', poker.toJSON())
    } catch (err) {
      console.error('PlanningPoker socket.io error', err.message)
    }
  })
}
