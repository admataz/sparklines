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




  render(){
      return(
        <div>        
        <textarea name="" id="" cols="30" rows="10" value={this.state.inputValue} onChange={this.parseInput} />
        <SparkLine plotPoints={this.state.inputValue} width="1000" height="200"/>
        </div>
      )
    }
}



export default App;