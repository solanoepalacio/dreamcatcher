'use strict'

/**
 * Global modules
 */
const mongoose = require('mongoose')

/**
 * Schema definition
 */
const Schema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true
    },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'account'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'group'
    },
    data: {
      type: Object
    },
    ua: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: 'groups_analytics_events',
    timestamps: true
  }
)

module.exports = mongoose.model('analytics_events', Schema)
