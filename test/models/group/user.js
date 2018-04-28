'use strict'

const mongoose = require('mongoose')

const baseSchema = require('../baseSchema')

const schema = baseSchema(
  {
    userName: {
      type: String,
      required: true
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_role'
      }
    ],
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'group'
    },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'account'
    },
    legacyId: String,
    firstName: String,
    lastName: String,
    category: {
      type: [
        {
          type: String,
          enum: [ 'new', 'used', 'savingPlan' ]
        }
      ],
      default: []
    },
    gender: {
      type: String,
      enum: [ 'male', 'female' ]
    },
    phone: {
      type: String,
      default: ''
    },
    cellPhone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    photo: String,
    password: {
      type: String,
      required: true
    },
    hash: String,
    salt: String,
    active: {
      type: Boolean,
      default: true
    },
    softRemoved: {
      type: Boolean,
      default: false
    },
    available: {
      type: Boolean,
      default: true
    },
    profile: [
      {
        type: String
      }
    ],
    meta: {
      comment: {
        type: String
      },
      pusher: {
        type: Boolean,
        default: false
      },
      zone: {
        type: String,
        default: ''
      }
    },
    alerts: {
      bySms: {
        type: Boolean,
        default: true
      },
      byEmail: {
        type: Boolean,
        default: true
      },
      blacklist: [
        {
          type: String
        }
      ]
    },
    createdAt: Date,
    updatedAt: Date
  },
  {
    collection: 'groups_rbac_users',
    timestamps: true,
    retainKeyOrder: true
  }
)

module.exports = mongoose.model('user', schema)
