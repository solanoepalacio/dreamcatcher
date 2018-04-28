'use strict'

const mongoose = require('mongoose')
const baseSchema = require('../baseSchema')

const schema = baseSchema(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'account'
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'group'
    },
    prospect: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'prospect'
    },
    interaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'prospect_interaction'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'groups_rbac_users_model'
    },
    type: {
      type: String,
      required: 'type_blank',
      enum: [
        'call',
        'remind',
        'cancel-reminder',
        'save-note',
        'send-email',
        'send-sms',
        'send-wapp',
        'transfer',
        'interaction',
        'proposal',
        'conversation',
        'edit-prospect',
        'change-label',
        'archive',
        'visit',
        'cancel-visit',
        'cancel-archive',
        /**
         * @deprecated
         */
        'resolution-medium'
      ]
    },
    content: {
      type: Object
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: Date
  },
  {
    collection: 'prospects_actions',
    timestamps: true,
    retainKeyOrder: true
  }
)

module.exports = mongoose.model('prospect_action', schema)
