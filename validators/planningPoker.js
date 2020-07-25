const Joi = require('@hapi/joi')

const newPokerSchema = Joi.object({
  cards: Joi.string()
    .trim()
    .regex(/^(\w{1,6})(,\w{1,6})*$/),
  username: Joi.string().min(3).max(20),
})

const newPlayerSchema = Joi.object({
  username: Joi.string().min(3).max(20),
})

const newVoteSchema = Joi.object({
  username: Joi.string().min(3).max(20),
  vote: Joi.string().min(1).max(6),
})

module.exports = { newPokerSchema, newPlayerSchema, newVoteSchema }
