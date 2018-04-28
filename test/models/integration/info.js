'use strict'

const mongoose = require('mongoose')
// const uid = require('shared/utils/uid')

/**
 * Schema definition
 */
const Schema = new mongoose.Schema(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'account',
      required: true
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'group',
      required: true
    },
    apiKey: {
      type: String,
      required: true
    },
    integrationType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'integration_type',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    comment: {
      type: String
    },
    enabled: {
      type: Boolean
    },
    deleted: {
      type: Boolean
    },
    deletedAt: {
      type: Date
    },
    lastUsedAt: {
      type: Date
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: Date
  },
  {
    collection: 'integrations',
    timestamps: true
  }
)

Schema.pre('validate', function validateIntegration (next) {
  // // Updates do not affect structure
  // if (!this.isNew) {
  //   return next();
  // }

  /**
   * A NEW INTEGRATION WITHOUT A KEY WAS CREATED
   * Description: If a new integration is created, but it doesn't have any key (apiKey), set an
   * auto-generated unique key.
   */
  if (!this.apiKey) {
    if (this.integrationType.toString() === '59c29c5d6befc7029895beb2') {
      this.apiKey = uid(16) + '@leads.getsirena.com'
    } else {
      this.apiKey = uid(24)
    }
  }

  return next()
})

module.exports = mongoose.model('integration', Schema)
