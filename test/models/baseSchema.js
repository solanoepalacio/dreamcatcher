'use strict'

const mongoose = require('mongoose')

// const appendAccount = require('shared/utils/appendAccount')

module.exports = (definition, options) => {
  const schema = new mongoose.Schema(definition, options)

  /**
   * Find documents passing the account to the conditions
   */
  schema.static('findWithAccount', function findWithAccount (
    account,
    conditions = {},
    ...args
  ) {
    return this.find(appendAccount(account, conditions), ...args)
  })

  /**
   * Find one document passing the account to the conditions
   */
  schema.static('findOneWithAccount', function findOneWithAccount (
    account,
    conditions = {},
    ...args
  ) {
    return this.findOne(appendAccount(account, conditions), ...args)
  })

  /**
   * Count the total of documents appending the account
   */
  schema.static('countWithAccount', function countWithAccount (
    account,
    criteria = {},
    ...args
  ) {
    return this.count(appendAccount(account, criteria), ...args)
  })

  /**
   * Update a document appending the account
   */
  schema.static('updateWithAccount', function updateWithAccount (
    account,
    criteria,
    ...args
  ) {
    return this.update(appendAccount(account, criteria), ...args)
  })

  return schema
}
