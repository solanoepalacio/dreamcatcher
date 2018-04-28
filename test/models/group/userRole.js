'use strict'

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: String,
  permissions: [String]
}, {
  collection: 'user_roles'
})

module.exports = mongoose.model('user_role', schema)
