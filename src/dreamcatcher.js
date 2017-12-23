'use strict'

import Knot from './knot'
import { createShape } from './shape'

const svgns = 'http://www.w3.org/2000/svg'

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

    let svg = container.querySelector('svg')
    if (!svg) {
      svg = document.createElementNS(svgns, 'svg')
      container.appendChild(svg)
    }

    const group = document.createElementNS(svgns, 'g')
    container.appendChild(svg)
    svg.appendChild(group)

    this.svg = svg
    this.group = group

    return this
  }

  setRadius (radius, padding = 20) {
    const ua = radius + padding
    this.center = [ua, ua]
    
    this.radius = radius
    
    this.svg.setAttribute('height', ua * 2)
    this.svg.setAttribute('width', ua * 2)

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
    })
    Object.keys(this.knots).forEach((name) => this.knots[name].drawSelf())

  }

  drawSelf () {
    const [x, y] = this.center
    const stroke = '#EFD6AC'
    const strokeWidth = 3
    createShape(
      'circle',
      this.group, 
      {
        cx: x,
        cy: y,
        stroke,
        'stroke-width': strokeWidth,
        r: this.radius,
        fill: 'none'
      }
    )
  }
}

module.exports = DreamCatcher


