// eslint-disable-next-line no-undef
const socket = io()

// eslint-disable-next-line no-undef, no-unused-vars
const app = new Vue({
  el: '#app',
  data: {
    model: {
      cards: [],
      players: {},
      finished: false,
    },
    vote: '',
    maxResponse: null,
    minResponse: null,
  },
  computed: {
    votes: function () {
      return Object.values(this.model.players).filter((val) => '' !== val).length
    },
    totalPlayers: function () {
      return Object.values(this.model.players).length
    },
  },
  created: function () {
    socket.on('connect', () => {
      const roomId = document.getElementById('room-id').value
      socket.emit('planningPoker', roomId)
      socket.on('planningPoker', (data) => (this.model = data))
    })
  },
})
