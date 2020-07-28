const Joi = require('@hapi/joi')

const newPokerSchema = Joi.object({
  cards: Joi.string()
    .trim()
    .regex(/^([a-zA-Z0-9._\-+]{1,6})(,[a-zA-Z0-9._\-+]{1,6})*$/),
  username: Joi.string().min(3).max(20),
})

const newPlayerSchema = Joi.object({
  username: Joi.string().min(3).max(20),
})

const newVoteSchema = Joi.object({
  username: Joi.string().min(3).max(20),
  vote: Joi.string().min(1).max(6),
})

const newStatusSchema = Joi.object({
  finished: Joi.boolean(),
})

module.exports = { newPokerSchema, newPlayerSchema, newVoteSchema, newStatusSchema }
