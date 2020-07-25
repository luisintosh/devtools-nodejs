const planningPoker = require('./planningPoker')

module.exports = (io, socket) => {
  planningPoker(io, socket)
}
