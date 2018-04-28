'use strict'

const mongoose = require('mongoose')

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
    conditions: [
      {
        field: {
          type: String
        },
        relation: {
          type: String,
          enum: [ 'equals', 'not', 'anyOf', 'regexp' ]
        },
        value: {
          type: String
        }
      }
    ],
    action: {
      type: String,
      enum: [ 'assign', 'discard' ]
    },
    assignation: {
      algorithm: {
        type: String
      },
      params: {
        type: Object
      },
      canLoseExclusivity: {
        type: Boolean,
        default: false
      }
    },
    category: {
      type: String,
      enum: [ null, '', 'new', 'used', 'savingPlan' ],
      default: null
    },
    source: {
      type: String
    },
    priority: {
      type: Number
    },
    providerGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'group'
    },
    providerAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'account'
    },
    strategy: {
      type: String
    },
    strategyConfig: {
      type: Object
    },
    lastUsedAt: Date,
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: Date
  },
  {
    collection: 'leads_assignation_rules',
    timestamps: true
  }
)

module.exports = mongoose.model('assignation_rule', Schema)
