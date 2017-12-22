'use strict'

const requireDirectory = require('require-directory')

module.exports = function readModels (directory) {
  const knots = []
  function getModelAsKnot (moduleExports) {
    if (moduleExports.name === 'model' && typeof moduleExports === 'function') {
      const knot = node(moduleExports)
      if (knots[knot.name]) {
        throw new Error('Found two models with the same name')
      }
      knots.push(knot)
    } else if (typeof moduleExports === 'object') {
      for (const property of Object.keys(moduleExports)) {
        console.log(moduleExports[property])
        getModelAsKnot(moduleExports[property])
      }
    }
  }
  requireDirectory(module, directory, { visit: getModelAsKnot })
  return knots
}

function node (model) {

  const schema = Object.assign({}, model.schema.obj)

  return {
    schema,
    name: model.modelName,
    references: getReferences(schema)
  }
}

function getReferences (schema) {
  const references = []
  
  ;(function getReference (schema) {
    if (!schema) {
      return
    }
    return Object.keys(schema).forEach(property => {
      if (Array.isArray(schema[property])) {
        schema[property] = schema[property][0]
      }
      if (typeof schema[property] !== 'object') {
        if (property === 'ref') {
          references.push(schema[property])
        }
        return null
      }
      getReference(schema[property])
    })
  })(schema)
  return references
}

