'use strict'

const mongoose = require('mongoose')
const baseSchema = require('../baseSchema')

const schema = baseSchema(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'account'
    },
    prospect: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'prospect'
    },
    type: {
      type: String,
      required: 'type_blank',
      enum: [
        'call-success',
        'call-failed',
        'transfer',
        'sms',
        'email',
        'wapp',
        'walk-in',
        'test-drive',
        'other',
        'phone-call',
        'conversation',
        'visit-success',
        'visit-failed',
        'quote',
        'quote-accepted',
        /**
       * @deprecated
       */
        'rejection',
        'proactive',
        'manual'
      ]
    },
    comment: {
      type: String
    },
    actions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'prospect_action'
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now
    },
    interaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'prospect_interaction'
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'groups_rbac_users_model'
    },
    updatedAt: Date
  },
  {
    collection: 'prospects_history',
    timestamps: true,
    retainKeyOrder: true
  }
)

module.exports = mongoose.model('prospect_history', schema)
