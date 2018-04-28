'use strict'

// const error = require('shared/error')
const mongoose = require('mongoose')
const baseSchema = require('../baseSchema')

const schema = baseSchema(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'account'
    },
    strategy: {
      type: String
    },
    prospect: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'prospect'
    },
    sequence: [
      {
        users: [ { type: mongoose.Schema.Types.ObjectId, ref: 'users' } ],
        claimableSince: {
          type: Date,
          default: Date.now
        },
        claimableThrough: {
          type: mongoose.Schema.Types.Mixed
        }
      }
    ],
    initialIndex: Number,
    claimed: Boolean,
    claimedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'groups_rbac_users_model'
    },
    claimedAt: Date
  },
  {
    collection: 'prospects_distribution'
  }
)

/**
 * Sequence frame:
 * @param {Array} users * An array of user ids
 * @param {Number} awaitTime * seconds (optional)
 */
function SequenceFrame (users, awaitTime) {
  if (!Array.isArray(users)) {
    throw new error.InvalidArgument('users')
  }

  const claimableThrough = awaitTime // in seconds
    ? new Date(Date.now() + awaitTime * 1000)
    : null

  return {
    users: [ ...users ],
    claimableSince: new Date(Date.now()),
    claimableThrough
  }
}

module.exports = {
  ProspectDistribution: mongoose.model('prospects_distribution', schema),
  SequenceFrame
}
