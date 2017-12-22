'use strict'


const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')('tiny')

const routes = require('./routes')
const allowCors = require('./cors')

const app = express()

app.use(morgan)
app.use(allowCors)
app.use(express.static(path.resolve(__dirname, '../client/dist')))


app.use(routes)

const port = '3000'
app.listen(port, function (error) {
  if (error) {
    console.log('error listening to port:', port)
    return
  }
  console.log('server is listening on port:', port)
})

app.on('error', function (error) {
  console.log('go fuck your self: ', error)
})