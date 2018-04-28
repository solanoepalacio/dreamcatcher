'use strict'

const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    _id: {
      account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account'
      },
      group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'group'
      },
      name: String
    },
    seq: Number
  },
  {
    collection: 'accounts_counters'
  }
)

module.exports = mongoose.model('account_counter', schema)
