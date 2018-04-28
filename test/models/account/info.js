'use strict'

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: String,
  enabled: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date,
  demo: {
    type: Boolean,
    default: false
  }
}, {
  collection: 'accounts',
  timestamps: true
})

module.exports = mongoose.model('account', schema)
