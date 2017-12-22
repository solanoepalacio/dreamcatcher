'use strict'

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
    const { ctx, radius } = this.parent
    const { x, y } = this.absolute

    ctx.beginPath()
    ctx.arc(x, y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = '#165B55'
    ctx.fill()
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 2
    ctx.stroke()
    this.drawName()
  }

  drawName () {
    const { ctx } = this.parent
    const { x, y } = this.absolute
    ctx.font = '12px arial'
    ctx.fillStyle = '#95B4B1'
    ctx.textAlign = x >= this.parent.center[0] ? 'left' : 'right'
    const paddingX = x >= this.parent.center[0] ? 18 : -18
    const paddingY = y >= this.parent.center[1] ? 18 : -18
    ctx.fillText(this.name, x + paddingX, y + paddingY)
  }

  drawLinks () {
    const { ctx } = this.parent
    const { x, y } = this.absolute
    ctx.beginPath()
    for (const reference of this.references) {
      ctx.moveTo(x, y)

      const refPosition = this.getReferencePosition(reference)
      if (refPosition) {
        ctx.lineTo(refPosition.x, refPosition.y)
      }
      
    }
    ctx.closePath()
    ctx.strokeStyle = '#C4B08D'
    ctx.lineWidth = 2
    ctx.stroke()
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