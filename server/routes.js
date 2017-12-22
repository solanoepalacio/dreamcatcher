'use strict'
const fs = require('fs')
const path = require('path')
const router = require('express').Router()

const readModels = require('./readModels')

router.get('/', function (req, res, next) {
  const html = fs.readFileSync(path.resolve(__dirname, '../client/dist/index.html'), 'utf-8')
  res.send(html)
})

router.get('/models', function (req, res, next) {
  const modelsPath = path.resolve(__dirname, '../test/models/')
  const knots = readModels(modelsPath)
  res.send(knots)
})

module.exports = router

const modelsPath = path.resolve(__dirname, '../test/models/')
const knots = readModels(modelsPath)
console.log(knots)


