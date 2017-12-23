'use strict'

import { createShape } from './shape'

export default class Knot {
  constructor (node, index, dreamCatcher) {
    this.name = node.name
    this.schema = node.schema
    this.references = node.references
    this.parent = dreamCatcher
    // TODO => set the size accourding to the ammount of properties in knot
    this.size = 14

    // this.setPolarPosition(index)
    // this.setAbsolutePosition()
  }
  
  // position

  setPosition (index, angle) {
    this.setPolarPosition(index, angle)
    this.setAbsolutePosition()
  }

  setPolarPosition(index, angle) {
    this.index = index
    this.polar = {
      angle: angle * this.index,
      radius: this.parent.radius
    }
  }

  setAbsolutePosition () {
    const { angle, radius } = this.polar
    this.absolute = {
      x: this.parent.center[0] + Math.cos(angle) * radius,
      y: this.parent.center[1] + Math.sin(angle) * radius
    }
  }

  getAbsolutePosition () {
    return {
      x: this.absolute.x,
      y: this.absolute.y
    }
  }

  getReferencePosition (referencee) {
    const referenceKnot = this.parent.knots[referencee]
    if (!referenceKnot) {
      return false
      // throw new Error(`Reference knot ${referencee} was not fond in parent: ${this.parent}`)
    }
    return referenceKnot.getAbsolutePosition()
  }

  // graphics

  drawSelf () {
    const { group, radius, center } = this.parent
    const { x, y } = this.absolute
    const stroke = 'white'
    const strokeWidth = 2
    const fill = 

    this.element = createShape(
      'circle',
      group,
      {
        cx: x,
        cy: y,
        stroke,
        r: this.size,
        fill: '#165B55',
        'stroke-width': strokeWidth,

      }
    )
    this.drawName()
  }

  drawName () {
    const { group } = this.parent
    const { x, y } = this.absolute

    const textAlign = x >= this.parent.center[0] ? 'start' : 'end'
    const paddingX = x >= this.parent.center[0] ? 18 : -18
    const paddingY = y >= this.parent.center[1] ? 18 : -18


    const textElement = createShape(
      'text',
      group,
      {
        fill: 'white',
        x: x + paddingX,
        y: y + paddingY,
        'font-size': '12',
        'font-family': 'Verdana',
        'text-anchor': textAlign
      }
    )
    textElement.innerHTML = this.name
  }

  drawLinks () {
    const { ctx, group } = this.parent
    const { x, y } = this.absolute
    for (const reference of this.references) {
      const refPosition = this.getReferencePosition(reference)
      if (refPosition) {
        createShape(
          'line',
          group,
          {
            x1: x,
            y1: y,
            x2: refPosition.x,
            y2: refPosition.y,
            stroke: '#C4B08D',
            'stroke-width': 1
          }
        )
      }
    }
  }

  // utils: 

  getReferences () {
    const references = []
    
    ;(function getReference (schema) {
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
    })(this.schema)
    return references
  }
}