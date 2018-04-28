'use strict'

const mongoose = require('mongoose')
const baseSchema = require('../baseSchema')

const schema = baseSchema(
  {
    prospect: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'prospect'
    },
    channel: {
      type: String,
      required: true
    },
    providerName: {
      type: String,
      required: true
    },
    providerThreadId: {
      type: String,
      required: true
    },
    pendingResponse: {
      type: Boolean,
      default: true
    },
    threadTitle: {
      type: String,
      required: true
    },
    threadSubtitle: {
      type: String
    },
    threadThumbnail: {
      type: String
    },
    messages: [
      {
        sentBy: {
          type: String,
          enum: [ 'user', 'prospect' ],
          required: true
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'groups_rbac_users_model'
        },
        message: {
          type: String,
          required: true
        },
        sentAt: {
          type: Date,
          default: Date.now
        },
        pending: {
          type: Boolean
        }
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date
    }
  },
  {
    collection: 'prospects_conversations',
    timestamps: true,
    retainKeyOrder: true
  }
)

module.exports = mongoose.model('prospect_conversation', schema)
