'use strict'

import Knot from './knot'

export default class DreamCatcher {
  /**
   * @param {Array} nodes * list of model
   */
  constructor (nodes) {
    this.knotCount = nodes.length
    this.knots = {}
    nodes.forEach((node, index) => {
      if (!this.knots[node.name]) {
        this.knots[node.name] = new Knot(node, index, this)
      }
    })
  }

  setCanvas (containerId) {
    const container = document.querySelector('#' + containerId)
    const canvas = document.createElement('canvas')
    console.log('container', container)
    console.log('canvas', canvas)
    container.appendChild(canvas)
    
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    
    return this
  }

  setRadius (radius, padding = 20) {
    this.radius = radius
    const ua = radius + padding
    this.center = [ua, ua]
    this.canvas.setAttribute('height', ua * 2 + 'px')
    this.canvas.setAttribute('width', ua * 2 + 'px')
    return this
  }

  setKnotsPosition (precision = 1) {
    // TODO => flashar precision
    const radians = Math.PI * 2
    const angle = radians / this.knotCount
    Object.keys(this.knots).forEach(
      (name, index) => this.knots[name].setPosition(index + 1, angle)
    )
    return this
  }

  draw () {
    this.drawSelf()
    Object.keys(this.knots).forEach((name) => {
      this.knots[name].drawLinks()
      this.knots[name].setListener()
    })
    Object.keys(this.knots).forEach((name) => this.knots[name].drawSelf())

  }

  drawSelf () {
    const [x, y] = this.center

    this.ctx.beginPath()
    this.ctx.arc(x, y, this.radius, 0, Math.PI * 2, false)
    this.ctx.strokeStyle = '#EFD6AC'
    this.ctx.lineWidth = 5
    this.ctx.stroke()
  }
}

module.exports = DreamCatcher


