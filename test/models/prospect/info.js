'use strict'

const mongoose = require('mongoose')
const baseSchema = require('../baseSchema')

// const getSearchTextQuery = require('services/prospect/get/getSearchTextQuery')

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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'groups_rbac_users_model'
    },
    userGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'group'
    },
    firstLead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'prospect_proposal'
    },
    /**
     * @deprecated: Use lastQuote
     */
    lastProposal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'prospect_action'
    },
    lastQuote: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'prospect_quote'
    },
    firstName: String,
    lastName: String,
    category: {
      type: String,
      enum: [ 'new', 'used', 'savingPlan' ],
      optional: true
    },
    emails: [
      {
        type: {
          type: String,
          enum: [ 'personal', 'work', 'other' ],
          default: 'personal'
        },
        address: String
      }
    ],
    phones: [
      {
        type: {
          type: String,
          enum: [ 'personal', 'work', 'other' ],
          default: 'personal'
        },
        number: String,
        originalNumber: String,
        mobile: {
          type: Boolean,
          default: false
        }
      }
    ],
    status: {
      type: String,
      default: 'new'
    },
    userMade: Boolean,
    adminMade: Boolean,
    similar: [
      {
        type: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'prospect'
        }
      }
    ],
    meta: {
      type: Object
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    claimedAt: Date,
    claimedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'groups_rbac_users_model'
    },
    firstContactedAt: Date,
    firstContactedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'groups_rbac_users_model'
    },
    lostExclusivityAt: Date,
    lostExclusivityBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'groups_rbac_users_model'
    },
    lastActionAt: Date,
    updatedAt: Date,
    enabled: {
      type: Boolean,
      default: true
    },
    additionalData: {
      type: Object
    },
    hasPendingConversations: {
      type: Boolean,
      default: false
    },
    searchTextQuery: {
      type: String
    },
    nextInteraction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'prospect_interaction'
    },
    nextInteractionDueAt: {
      type: Date
    },
    nextInteractionType: {
      type: String
    },
    label: {
      type: String
    },
    archivingReason: {
      type: String
    },
    lastInterest: {
      type: String
    },
    lastInterestComment: {
      type: String
    },
    currentGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'groups_rbac_users'
    },
    initialGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'groups_rbac_users'
    },
    currentDistribution: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'prospects_distribution'
    }
  },
  {
    collection: 'prospects',
    timestamps: true,
    retainKeyOrder: true
  }
)

schema.pre('save', function saveTextQuery (next) {
  this.searchTextQuery = getSearchTextQuery(this)
  next()
})

module.exports = mongoose.model('prospect', schema)
