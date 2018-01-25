import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

//Create a special application for checking enough of technical requirements for succesfully start a game Far Cry 5, which release will at 2018 year:
/*function CheckingCPU(props){
    if(props.CPU === 'Intel Core i5-2400' || props.CPU === 'AMD FX-6300'){
        return <p className="minimum">It's minimum system requirements!</p>;
    } else if(props.CPU === 'Intel Core i7-4770' || props.CPU === 'AMD Ryzen 5 1600'){
        return <p className="recommended">It's a recommended system requirements!</p>;
    } else if(props.CPU === ''){
        return <p className="empty">Please, provide type of CPU for start checking...</p>
    } else if(props.CPU === 'Intel Core i3'){
        return <p className="not-enough">It is not enough system requirements for minimum performance!</p>;
    } else {
        return <p className="undefined-type">Undefined type of CPU...</p>;
    }
}

function CheckingCPUSpeed(props){
    if(props.CPUSpeed <= 3.2){
        return <p className="not-enough">It is not enough system requirements for minimum performance!</p>;
    } else if(props.CPUSpeed >= 3.4){
        return <p className="minimum">It is minimum system requirements!</p>;
    } else if(props.CPUSpeed === ''){
        return <p className="empty">Please, provide average frequency of CPU for start checking...</p>
    } else if(props.CPUSpeed > 4) {
        return <p className="recommended">It is a recomended system requirements!</p>;
    }
}

function checkingRAM(props){
    if(props.RAM < 8){
        return <p>It's not enough system requirements for minimum performance!</p>;
    } else {
        return <p>It's recomended system requirements!</p>;
    }
}

function checkingVideoCard(props){
    if(props.videoCard === 'NVIDIA GeForce GTX 670' || props.videoCard === 'AMD R9 270'){
        return <p>It's minimum system requirements!</p>;
    } else if(props.videoCard === 'NVIDIA GeForce GTX 970' || props.videoCard === 'AMD R9 290X'){
        return <p>It's recomended system requirements!</p>
    } else {
        return <p>Undefined type of video-card!</p>;
    }
}

class CheckSystem extends React.Component {
    constructor(props){
        super(props);
        this.handleChangeCPU = this.handleChangeCPU.bind(this);
        this.handleChangeCPUSpeed = this.handleChangeCPUSpeed.bind(this);
        this.handleChangeRAM = this.handleChangeRAM.bind(this);
        this.handleChangeVideoCard = this.handleChangeVideoCard.bind(this);
        this.state = {
            CPU: '',
            CPUSPeed: '',
            RAM: '',
            VideoCard: '',
        };
    }

    handleChangeCPU(e) {
        this.setState({CPU: e.target.value});
    }

    handleChangeCPUSpeed(e){
        this.setState({CPUSpeed: e.target.value});
    }

    handleChangeRAM(e){
        this.setState({RAM: e.target.value});
    }

    handleChangeVideoCard(e){
        this.setState({VideoCard: e.target.value});
    }

    render(){
        const CPU = this.state.CPU;
        const CPUSpeed = this.state.CPUSpeed;
        /*const RAM = this.state.RAM;
        const VideoCard = this.state.VideoCard;
        var attr;
        return(
            <div className="check-block">
                <h4>Checking your system requirements for install modern games at 2018 year.</h4>
                <fieldset>
                    <legend>CPU - type</legend>
                        <input type="text" value={CPU} onChange={this.handleChangeCPU}/>
                        <CheckingCPU  CPU={CPU.toString()}/>
                </fieldset>
            </div>
        );
    }
}

ReactDOM.render(
    <CheckSystem />,
    document.getElementById('root')
);*/
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

//Converting functions for celsius:
function toCelsius(fahrenheit){
  return (fahrenheit - 32)*5/9;
}

function toFahrenheit(celsius){
  return (celsius*9/5)+32;
}


class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e){
    this.setState({temperature: e.target.value});
  }

  render(){
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange}/>
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  render() {
    return(
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById("root")
);
registerServiceWorker();
