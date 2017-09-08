import d3 from 'd3';
import * as _ from 'lodash';
import $ from 'jquery';

import './styles/base.scss';

console.log('iei');
const canvas = $('#d3Canvas');

console.log('canvas initiated: ',canvas);

function resize(canvas) {
  return canvas.height(canvas.width() * 0.65);
}

window.addEventListener('resize', (e) => resize(canvas));
resize(canvas);

  // window.addEventListener('resize', function(e){
  //   width = Math.round($('.success-container').css('width').split('px')[0]);
  //   height = Math.round(width*0.65);
  //   canvas.attr('width', width)
  //     .attr('height', height)
  // })

  // let scaling = d3.scaleLinear()
  //   .domain([0,68*4])
  //   .range([0,width])

  // let canvas = d3.select('.chart-container')
  //   .append('svg')
  //   .attr('width', width)
  //   .attr('height', height)
  //   .append('g')
  //   //.attr('transform', `translate(0,-${height/12})`)


  // let svgDefs = canvas.append('defs');

  // let backGradient = svgDefs.append('radialGradient')
  //   .attr('id', 'back-gradient')

  // backGradient.append('stop')
  //   .attr('offset', '0%')
  //   .attr('stop-color', 'rgb(125,125,125)')

  // backGradient.append('stop')
  //   .attr('offset', '100%')
  //   .attr('stop-color', 'rgb(115,115,115)')

  // canvas.style('fill', 'url(#back-gradient)')

  // canvas.append('rect')
  //   .attr('width', width)
  //   .attr('height', height)
  //   .style('fill', 'url(#back-gradient)')

  // let nubadsGradient = svgDefs.append('linearGradient')
  //   .attr('id', 'nubads-gradient')
  //   .attr('x1', '0%')
  //   .attr('x2', '0%')
  //   .attr('y1', '0%')
  //   .attr('y2', '100%')

  // nubadsGradient.append('stop')
  //   .attr('class', 'stop-bottom')
  //   .attr('offset', '0')

  // nubadsGradient.append('stop')
  //   .attr('class', 'stop-top')
  //   .attr('offset', '1')

  // $('.chart-container > svg').addClass('chart-canvas');

  // let xAxis = canvas.append('line')
  //   .transition()
  //   .duration(500)
  //   .attr('x1', 15)
  //   .attr('x2',width-12)
  //   .attr('y1', height+5)
  //   .attr('y2',  height+5)
  //   .attr('fill', 'none')
  //   .attr('stroke', 'rgb(160,160,160)')
  //   .attr('stroke-width', 2)

  // const linesDisposition = [ 0.15,0.3,0.45,0.6,0.75,0.9 ];
  // let auxLines = canvas.selectAll('line')
  //   .data(linesDisposition)
  //   .enter()
  //   .append('line')
  //   .attr('x1', 15)
  //   .attr('x2', width-12)
  //   .attr('y1',(d,i) => d*height)
  //   .attr('y2', (d,i) => d*height)
  //   .attr('stroke', 'rgb(190,190,190)')
  //   .attr('stroke-width', 1)

  // let xAxisLabel = canvas.append('text')
  //   .attr('transform',`translate(${width/2},${height+18})`)
  //   .style('text-anchor', 'middle')
  //   .style('font-size', '14px')
  //   .attr('fill', 'rgb(235,235,235)')
  //   .transition()
  //   .duration(500)
  //   .text('Time')

  // let fake_data = [20,35,26,44,39,54,68];
  // let aux = []
  // let barWidth = (width/fake_data.length)*0.85
  // let i = 0;
  // const cutPoint = fake_data.length;

  // let drawBars = setInterval(createBar, 300);

  // function createBar(){

  //   if(i>=cutPoint){
  //   clearInterval(drawBars);
  //   return;
  // }

  // aux.push(fake_data[i]);
  // canvas.selectAll('rect')
  //   .data(aux)
  //   .enter()
  //   .append('rect')
  //   .classed('filled', true)
  //   .attr('fill', 'url(#nubads-gradient)')
  //   .attr('height', 0)
  //   .attr('width', barWidth)
  //   .attr('x', (d,i) => (barWidth/3)+i*(barWidth*1.1))
  //   .attr('y', (d,i) => height)
  //   .attr('stroke', '1px solid rgb(90,90,90)')
  //   .transition()
  //   .duration(1500) // to do : getting a error when trying to add .ease(). find out why
  //   .attr('height', (d,i) => d*4)
  //   .attr('y', (d,i) => height - d*4);
  //   i++;
// }
