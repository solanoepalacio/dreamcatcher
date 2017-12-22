'use strict'

const DreamCatcher = require('../src/index.js')

const dreamCatcher = new DreamCatcher('../test/models/', 'testName')

dreamCatcher.getKnots()
console.log(dreamCatcher)