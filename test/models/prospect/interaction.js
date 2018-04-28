'use strict'

const mongoose = require('mongoose')

// const Prospect = require('models/prospect/info')
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'groups_rbac_users_model'
    },
    category: String,
    type: {
      type: String,
      enum: [
        'contact',
        'reminder',
        'transfer',
        'proactive',
        'conversation',
        'visit'
      ]
    },
    status: {
      type: String,
      enum: [ 'created', 'finished', 'canceled' ],
      default: 'created'
    },
    successful: {
      type: Boolean
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    dueAt: Date,
    startedAt: Date,
    finishedAt: Date,
    finishedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'groups_rbac_users_model'
    },
    canceledAt: Date,
    enabled: {
      type: Boolean,
      default: true
    },
    platform: {
      type: String,
      enum: [ 'desktop', 'android', 'ios' ]
    },
    resolution: {
      type: {
        type: String,
        enum: [
          'phone-call',
          'email',
          'sms',
          'wapp',
          'reject',
          'transfer',
          'walk-in',
          'industry-medium',
          'other',
          'conversation'
        ]
      },
      option: String
    },
    updatedAt: Date
  },
  {
    collection: 'prospects_interactions',
    timestamps: true,
    retainKeyOrder: true
  }
)

schema.post('save', async function saveNextInteraction (interaction, next) {
  // Update prospect next interaction
  await Prospect.updateWithAccount(
    interaction.account,
    {
      _id: interaction.prospect
    },
    {
      $set: {
        nextInteraction: interaction._id,
        nextInteractionDueAt: interaction.dueAt,
        nextInteractionType: interaction.type
      }
    }
  )
  next()
})

module.exports = mongoose.model('prospect_interaction', schema)
