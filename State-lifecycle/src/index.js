import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';

function FormattedDate(props){
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>
}

class Clock extends React.Component {
  constructor(props){
      super(props);
      this.state = {date: new Date()};
  }
  
  componentDidMount(){
      this.timerID = setInterval(() => this.tick(),1000);
  }
  
  componentWillUnmount(){
      clearInterval(this.timerID);
  }
  
  tick(){
      this.setState({
          date: new Date()
      });
  }
    
  render(){
    return (
      <div>
        <h1>Hello, World!</h1>
        <FormattedDate date={this.state.date} />
      </div>
    );
  }
}

class Toggle extends React.Component {
  constructor(props){
    super(props);
    this.state = {isToggleOn: true};
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(){
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  
  render(){
    return(
      <div className="toolkit">
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'ENGINE ON' : 'ENGINE OFF'}
        </button>  
      </div>
    );
  }
}

  function App(){
    return(
      <div>
        <Clock />
        <Clock />
        <Clock />
      </div>  
    );
  }

ReactDOM.render(
    <Toggle/>,
    document.getElementById('root')
);


registerServiceWorker();
