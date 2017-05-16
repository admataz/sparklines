import React from 'react';
import {interpolateNumber, scaleLinear} from 'd3';

class SparkLine extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      zeropoint:0, 
      sparkpoints:'', 
      circlepos:{x:0,y:0}, 
      textxpos: "4",
      textypos: "-3",
      showstats: false};
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
  componentWillMount(){
    if(this.props.plotPoints){
      this.mapPoints(this.props.plotPoints);
    }
  }

  handleMouseOverLine(evt){
    if(!this.props.plotPoints.length){
      return;
    }

    let xpos = evt.nativeEvent.offsetX;
    let x = Math.floor(this.state.xScale.invert(xpos));
    let y = this.state.inputPoints[x];
    
    if(x < 0 || x+2 > this.state.inputPoints.length){
      this.setState({showstats:false});
      return 
    }

    let i = interpolateNumber(y, this.state.inputPoints[x+1])

    let step = this.state.xScale(1);
    let pos = (xpos - this.state.xScale(x))/step;
    let ypos = this.state.yScale(i(pos));
    let textxpos = 4;
    let textypos = -3;
    if(xpos + 20 > this.props.width){
      textxpos = -20;
    } 

    if(ypos < 5){
      textypos = 10;
    } 

    this.setState({
      interpolatedValue:Math.round(i(pos)*100)/100,  
      highlightedVal:y, 
      circlepos: {
        x:xpos, 
        y:ypos
      },
      showstats:true,
      textxpos,
      textypos
    })

  }


  render(){
    return (
      <div className="sparkchart">
          <svg xmlns="http://www.w3.org/2000/svg"
            width={Number(this.props.width)+16} 
            height={Number(this.props.height)+16}
            onMouseMove={this.handleMouseOverLine}
            >
            
              if (this.props.plotPoints.trim() !== ''){
                (
                  <g transform="translate(8 8)">
                  {this.state.sparkpoints.length && 
                  <line 
                    className="zero-line" 
                    x1="0" 
                    x2={this.props.width} 
                    y1={this.state.zeropoint} 
                    y2={this.state.zeropoint} 
                    stroke="#ccc"
                    />      
                  }
                  <polyline 
                  points={this.state.sparkpoints} 
                  fill="none" 
                  stroke="#D07735" 
                  strokeWidth="1" />

                  {this.state.showstats && 
                    <g transform={`translate(${this.state.circlepos.x}, ${this.state.circlepos.y})`}>
                      <circle cx="0" cy="0" r="3" stroke="#000" strokeWidth="0.5" fill="none" />
                      <text x={this.state.textxpos} y={this.state.textypos} fontFamily="sans-serif" fontSize="10">{this.state.interpolatedValue}</text>
                    </g>
                  }
                  
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