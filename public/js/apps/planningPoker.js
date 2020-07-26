const baseUrl = window.location.origin + window.location.pathname

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
    newPlayer: null,
  },
  computed: {
    votes: function () {
      return Object.values(this.model.players).filter((val) => '' !== val).length
    },
    totalPlayers: function () {
      return Object.values(this.model.players).length
    },
    countVotes: function () {
      const count = {}
      Object.values(this.model.players).forEach((vote) => {
        if (vote) {
          if (undefined === count[vote]) {
            count[vote] = 0
          }
          ++count[vote]
        }
      })
      return count
    },
    sortVotes: function () {
      const count = this.countVotes
      return Object.keys(count).sort((keyA, keyB) => {
        if (count[keyA] > count[keyB]) {
          return -1
        } else if (count[keyA] < count[keyB]) {
          return 1
        } else {
          return 0
        }
      })
    },
    topVote: function () {
      return this.sortVotes[0]
    },
    topVoteCount: function () {
      return this.countVotes[this.topVote]
    },
    secondTopVote: function () {
      return this.sortVotes[1]
    },
    secondTopVoteCount: function () {
      return this.countVotes[this.secondTopVote]
    },
  },
  created: function () {
    socket.on('connect', () => {
      const roomId = document.getElementById('room-id').value
      socket.emit('planningPoker', roomId)
      socket.on('planningPoker', (data) => (this.model = data))
    })
  },
  methods: {
    getPlayerFromCookie: function () {
      const match = document.cookie.match(/player=(\w+)/)
      return match ? match[1] : null
    },
    addNewPlayer: function () {
      fetch(`${baseUrl}/player`, {
        method: 'POST',
        body: JSON.stringify({ username: this.newPlayer }),
        headers: { 'Content-Type': 'application/json' },
      }).then(() => window.location.reload())
    },
    setVote: function ($event) {
      this.vote = $event.srcElement.value
      fetch(`${baseUrl}/vote`, {
        method: 'POST',
        body: JSON.stringify({ vote: this.vote }),
        headers: { 'Content-Type': 'application/json' },
      })
    },
    toggleStatus: function () {
      const finished = !this.model.finished
      fetch(`${baseUrl}/status`, {
        method: 'POST',
        body: JSON.stringify({ finished }),
        headers: { 'Content-Type': 'application/json' },
      })
    },
  },
})
