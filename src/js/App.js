import React from 'react';
import SparkLine from './components/SparkLine';



class App extends React.Component{

  constructor(props){
    super(props);

    this.state = {inputValue:'', plotPoints: null}
    this.parseInput = this.parseInput.bind(this);
  }

  parseInput(evt){
    let numOnly = evt.target.value.replace(/[^0-9 -\.]+/, '');
    this.setState({inputValue: numOnly});
  }

  componentWillMount(){
    if(this.props.defaultInput){
      this.setState({inputValue: this.props.defaultInput});
    }
  }


  render(){
      return(
        <div>        
        <div className="col"><textarea name="" id="" cols="30" rows="10" value={this.state.inputValue} onChange={this.parseInput} /></div>
        <div className="col"><SparkLine plotPoints={this.state.inputValue} width="200" height="40"/></div>
        </div>
      )
    }
}



export default App;