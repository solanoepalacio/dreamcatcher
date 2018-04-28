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
      enum: [ 'car', 'savingPlan', 'retail', 'insurance', 'realEstate' ]
    },
    source: String,
    campaign: String,
    medium: {
      type: String
    },
    provider: String,
    providerLeadId: String,
    providerGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'group'
    },
    providerAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'account'
    },
    meta: {
      type: Object,
      default: {}
    },
    comment: String,
    description: String,
    listingUrl: String,
    publishText: String,
    publishLink: String,
    priority: Number,
    integration: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'integration'
      },
      recipient: {
        type: String
      },
      providerLeadId: {
        type: String
      },
      assignation: {
        assignationRule: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'assignation_rule'
        },
        data: {
          type: Object
        },
        leadGroup: {
          type: String
        },
        leadUser: {
          type: String
        },
        assignedGroup: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'groups_integrations'
        },
        assignedUser: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'groups_rbac_users'
        }
      },
      category: {
        type: Array
      },
      updatedAt: {
        type: Date
      }
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'groups_rbac_users_model'
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: Date
  },
  {
    collection: 'prospects_proposals',
    timestamps: true,
    retainKeyOrder: true
  }
)

module.exports = mongoose.model('prospect_proposal', schema)
