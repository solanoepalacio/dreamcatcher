'use strict'

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'group'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'groups_rbac_users_model'
  },
  updatedAt: Date,
  config: Object
}, {
  collection: 'clients_configs'
})

module.exports = mongoose.model('client_config', schema)
