'use strict'

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  value: String
})

module.exports = mongoose.model('famous', schema)