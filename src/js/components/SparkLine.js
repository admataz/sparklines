import React from 'react';
import {interpolateNumber, scaleLinear} from 'd3';

class SparkLine extends React.Component{

  constructor(props){
    super(props);
    this.state = {zeropoint:0, sparkpoints:'', circlepos:{x:0,y:0}};
    this.handleMouseOverLine = this.handleMouseOverLine.bind(this);
  }

  mapPoints(input){
    let a = input
      .trim()
      .trim()
      .replace(/-$/, '')
      .split(' ');
    
    let max = Math.max(...a);
    let min = Math.min(...a);
    let range = max - min;
    let yScale = scaleLinear()
    .domain([min, max])
    .range([this.props.height, 0]);

    let xScale = scaleLinear()
    .domain([0,a.length-1])
    .range( [0,this.props.width] );

    this.setState({inputPoints: a});
    this.setState({yScale})
    this.setState({xScale})
    this.setState({zeropoint:yScale(0)});

    let b = a.map( (p, i) => {
      // return `${i*this.props.width/a.length} ${yScale(p)}`
      return `${xScale(i)} ${yScale(p)}`
    });
    let c = `${b.join()}`; 
    
    this.setState({sparkpoints: c})
  }


  componentWillReceiveProps(newprops){
    if(newprops.plotPoints !== this.props.plotPoints){
      this.mapPoints(newprops.plotPoints);
    }
  }

  handleMouseOverLine(evt){
    let x = Math.floor(this.state.xScale.invert(evt.clientX));
    let y = this.state.inputPoints[x];
    let i = interpolateNumber(y, this.state.inputPoints[x+1])
    
    let step = this.state.xScale(1);
    
    let pos = (evt.clientX - this.state.xScale(x))/step;
    
    this.setState({interpolatedValue:Math.round(i(pos)*100)/100,  highlightedVal:y, circlepos: {x:evt.clientX, y:this.state.yScale(i(pos))}})

  }


  render(){
    return (
      <div className="sparkchart">
          <svg xmlns="http://www.w3.org/2000/svg"
            width={this.props.width} 
            height={this.props.height}
            onMouseMove={this.handleMouseOverLine}
            >
            
              if (this.props.plotPoints.trim() !== ''){
                (
                  <g>
                  <line 
                    className="zero-line" 
                    x1="0" 
                    x2={this.props.width} 
                    y1={this.state.zeropoint} 
                    y2={this.state.zeropoint} 
                    stroke="#ccc"
                    />      

                  <polyline 
                  points={this.state.sparkpoints} 
                  fill="none" 
                  stroke="#D07735" 
                  strokeWidth="1" />

                  <g transform={`translate(${this.state.circlepos.x}, ${this.state.circlepos.y})`}>
                    <circle cx="-1" cy="-1" r="3" stroke="#000" strokeWidth="0.5" />
                    <text x="4" y="4">{this.state.interpolatedValue}</text>
                  </g>
                  </g>
                  )
              }

          </svg>
        </div>
    );
  }
}


SparkLine.defaultProps = {
  width: "100",
  height: "24"
}

export default SparkLine;