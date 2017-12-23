import './styles/base.scss';

import './controller'

import DreamCatcher from '../src/dreamcatcher'

async function getModels (path) {
  console.log('getting models')
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3000/models')
    .then(result => result.json())
    .then(result => resolve(result))
    .catch(error => console.log('error fetching', error))
  })
}

getModels().then((models) => {
  const dreamCatcher = new DreamCatcher(models)
  console.log('dreamCatcher', dreamCatcher)

  dreamCatcher
    .setCanvas('dreamCatcher')
    .setRadius(210, 120)
    .setKnotsPosition()
    .draw()

  console.log('newDreamCatcher', dreamCatcher)
})




