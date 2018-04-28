'use strict'

const mongoose = require('mongoose')

/**
 * Schema definition
 */
const Schema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    mediaChannels: [
      {
        type: String,
        enum: [ 'web', 'call', 'chat', 'store', 'other' ]
      }
    ],
    apiScope: {
      type: Array
    },
    country: [
      {
        type: String,
        enum: [ 'AR', 'BR', 'MX', 'US' ]
      }
    ],
    credentials: {
      appId: { type: String },
      appSecret: { type: String }
    },
    url: {
      create: { type: String },
      form: { type: String },
      status: { type: String },
      enabled: { type: String },
      settings: { type: String },
      apiKey: { type: String }
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: Date
  },
  {
    collection: 'integration_types',
    timestamps: true
  }
)

module.exports = mongoose.model('integration_type', Schema)
