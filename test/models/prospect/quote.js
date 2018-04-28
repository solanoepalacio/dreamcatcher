'use strict'

const mongoose = require('mongoose')
const baseSchema = require('../baseSchema')

const schema = baseSchema(
  {
    prospect: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'prospect'
    },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'account'
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'group'
    },
    code: String,
    status: {
      type: String,
      enum: [ 'open', 'accepted', 'rejected' ]
    },
    openedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'groups_rbac_users_model'
    },
    rejectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'groups_rbac_users_model'
    },
    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'groups_rbac_users_model'
    },
    // Note: Prices are multiplied by the power of 10 to preserve two decimals
    // See: https://docs.mongodb.com/v2.6/tutorial/model-monetary-data/#monetary-value-exact-precision
    items: [
      {
        concept: {
          type: String
        },
        price: {
          type: String
        },
        priceInt: {
          type: Number
        },
        quantity: {
          type: Number
        }
      }
    ],
    total: {
      type: Number
    },
    totalInt: {
      type: Number
    },
    updatedAt: {
      type: Date
    },
    openedAt: {
      type: Date
    },
    rejectedAt: {
      type: Date
    },
    acceptedAt: {
      type: Date
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    autogenerated: {
      type: Boolean
    }
  },
  {
    collection: 'prospects_quotes',
    timestamps: true,
    retainKeyOrder: true
  }
)

module.exports = mongoose.model('prospect_quote', schema)