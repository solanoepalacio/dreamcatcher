'use strict'

const mongoose = require('mongoose')
// const mongooseTreeAncestors = require('mongoose-tree-ancestors')

// const libPhoneNumber = require('google-libphonenumber')
// const phoneUtil = libPhoneNumber.PhoneNumberUtil.getInstance()
// const pnf = libPhoneNumber.PhoneNumberFormat
const baseSchema = require('../baseSchema')

const schema = baseSchema(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'account'
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'group',
      default: null
    },
    ancestors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'group'
      }
    ],
    name: String,
    displayName: {
      type: String,
      get: function (val) {
        if (!val || val === '') {
          return this.name
        }
        return val
      }
    },
    timezone: String,
    countryCode: String,
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          let parsed
          try {
            parsed = phoneUtil.parse(v, this.countryCode)
          } catch (err) {
            return false
          }
          return phoneUtil.isValidNumber(parsed)
        },
        message: '{VALUE} is not a valid phone number'
      }
    },
    meta: {
      type: Object
    },
    language: {
      type: String,
      enum: [ 'es', 'pt' ]
    },
    type: [
      {
        type: String,
        enum: [ 'oem', 'group', 'store', 'leadProvider' ]
      }
    ],
    industry: [
      {
        type: String,
        enum: [ 'vehicle', 'insurance', 'savingPlan', 'realEstate', 'retail' ]
      }
    ],
    category: {
      type: [
        {
          type: String,
          enum: [ 'new', 'used', 'savingPlan' ]
        }
      ],
      default: []
    },
    enabled: Boolean,
    isPaymentOverdue: Boolean,
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: Date,
    frontier: [
      {
        type: String,
        enum: [ 'merge', 'transfer' ]
      }
    ],
    demo: {
      type: Boolean,
      default: false
    },
    plan: {
      type: String,
      default: ''
    },
    freeUsers: {
      type: Number,
      default: 0
    }
  },
  {
    collection: 'groups',
    timestamps: true,
    retainKeyOrder: true
  }
)

// By doing this, we tell mongoose to keep the values modified in the schema getters
schema.set('toObject', {
  getters: true,
  virtuals: true
})
schema.set('toJSON', {
  getters: true,
  virtuals: true
})

schema.pre('validate', function validateSchema (next) {
  if (this.phone && this.countryCode) {
    const parsed = phoneUtil.parse(this.phone, this.countryCode)
    this.phone = phoneUtil.format(parsed, pnf.INTERNATIONAL)
  }
  next()
})

// mongooseTreeAncestors(schema, {
//   parentFieldName: 'parent',
//   parentFieldRefModel: 'group',
//   ancestorsFieldName: 'ancestors',
//   ancestorsFieldRefModel: 'group'
// })

module.exports = mongoose.model('group', schema)
