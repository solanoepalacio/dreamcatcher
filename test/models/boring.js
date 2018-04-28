'use strict'

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  string: String,
  reference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'famous'
  }
})

module.exports = mongoose.model('boring', schema)