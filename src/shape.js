'use strict'
const svgns = 'http://www.w3.org/2000/svg'
export function createShape (type, group, svgOpts = {}) {
  const element = document.createElementNS(svgns, type)
  group.appendChild(element)
  Object.keys(svgOpts).forEach((option) => 
    element.setAttributeNS(null, option, svgOpts[option])
  )
  return element
}

