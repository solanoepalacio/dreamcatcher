'use strict'

const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    SERVICIO: {
      type: String
    },
    INDICATIVO: {
      type: Number
    },
    BLOQUE: {
      type: Number
    }
  },
  {
    collection: 'ar_phone_number_assignments',
    retainKeyOrder: true
  }
)

module.exports = mongoose.model('ar_phone_number_assignments', schema)
