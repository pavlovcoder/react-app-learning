import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit',
  k: 'Kelvin'
};

//Converting functions for celsius:
function FahrenheitToCelsius(fahrenheit){
  return (fahrenheit-32)*5/9;
}

function KelvinToCelsius(kelvin){
  return kelvin-273.15;
}

//Converting functions for fahrenheit:
function CelsiusToFahrenheit(celsius){
  return (celsius*9/5)+32;
}

function KelvinToFahrenheit(kelvin){
  return (kelvin*9/5)-459.67;
}

//Converting functions for kelvin:
function CelsiusToKelvin(celsius){
  return celsius+273.15;
}

function FahrenheitToKelvin(fahrenheit){
  return (fahrenheit+459.67)*5/9;
}

function tryConvert(temperature,convert){
  const input = parseFloat(temperature);
  if(Number.isNaN(input)){
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output*1000)/1000;
  return rounded.toString();
}

function BoilingVerdict(props){
  if(props.celsius >= 100){
    return <p className="boil">The water would boil.</p>;
  }
  return <p className="not-boil">The water would not boil.</p>;
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.props.onTemperatureChange(e.target.value);
  }

  render(){
    const temperature = this.props.temperature;
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
  constructor(props){
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.handleKelvinChange = this.handleKelvinChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature){
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature){
    this.setState({scale: 'f', temperature});
  }

  handleKelvinChange(temperature){
    this.setState({scale: 'k', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    var celsius;
    var fahrenheit;
    var kelvin;
    if(scale === 'c'){
      celsius = temperature;
      fahrenheit = tryConvert(temperature, CelsiusToFahrenheit);
      kelvin = tryConvert(temperature, CelsiusToKelvin);
    } else if(scale === 'f'){
      celsius = tryConvert(temperature, FahrenheitToCelsius);
      kelvin = tryConvert(temperature, FahrenheitToKelvin);
    } else if(scale === 'k'){
      celsius = tryConvert(temperature, KelvinToCelsius);
      fahrenheit = tryConvert(temperature, KelvinToFahrenheit);
    }
    return(
      <div className="temperature-converter">
      <h4 className="temperature-head">Synchronized Temperature Converter</h4>
      <hr />
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <TemperatureInput
          scale="k"
          temperature={kelvin}
          onTemperatureChange={this.handleKelvinChange} />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById("root")
);
registerServiceWorker();
