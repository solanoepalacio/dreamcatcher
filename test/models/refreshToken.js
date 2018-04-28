'use strict'

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'account'
  },
  value: {
    type: String,
    required: true
  },
  userId: {
    // TODO make userId an ObjectId
    type: String
  },
  clientId: {
    type: String
  },
  scope: {
    type: Object
  },
  refreshCounter: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
}, {
  collection: 'refresh_tokens',
  timestamps: true
})

module.exports = mongoose.model('refresh_token', schema)
