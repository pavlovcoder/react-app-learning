import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import PropTypes from 'prop-types';

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

//Developing mini app for greetings new persons aboard with React Components:
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}

//Developing a new table sorter mini application for books e-shop:
class BookCategoryRow extends React.Component {
    render() {
        const category = this.props.category;
        return (
            <tr>
                <th colSpan="2">
                    {category}
                </th>
            </tr>
        );
    }
}

class BookRow extends React.Component {
    render() {
        const book = this.props.book;
        const title = book.stocked ?
            book.title :
            <span style={{color: '#ff0000'}}>
                {book.title}
            </span>;

        return (
            <tr>
                <td><img src={book.img} className="book-icons" alt="book-item"/></td>
                <td>{title}</td>
                <td>{book.price}</td>
            </tr>
        );
    }
}

class BookTable extends React.Component {
    render() {
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;
        const rows = [];
        let lastCategory = null;

        this.props.books.forEach((book) => {
            if(book.title.indexOf(filterText) === -1) {
                return;
            }
            if(inStockOnly && !book.stocked) {
                return;
            }
            if(book.category !== lastCategory) {
                rows.push(
                    <BookCategoryRow
                        category={book.category}
                        key={book.category} />
                );
            }
            rows.push(
                <BookRow
                    book={book}
                    key={book.name} />
            );
            lastCategory = book.category;
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>Cover</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class SearchBar extends React.Component {
    constructor(props) {
      super(props);
      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
      this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(e) {
      this.props.onFilterTextChange(e.target.value);
    }

    handleInStockChange(e) {
      this.props.onInStockChange(e.target.checked);
    }

    render() {
        return (
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    onChange={this.handleFilterTextChange}
                />
                <p>
                    <input
                        type="checkbox"
                        checked={this.props.inStockOnly}
                        onChange={this.handleInStockChange}
                     />
                    {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }
}

class FilterableBookTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        };

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    handleInStockChange(inStockOnly) {
        this.setState({
            inStockOnly: inStockOnly
        });
    }

    render() {
        return (
            <div className="bookTable">
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilterTextChange={this.handleFilterTextChange}
                    onInStockChange={this.handleInStockChange}
                />
                <BookTable
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    books={this.props.books}
                />
            </div>
        );
    }
}

//JSON data set:
const BOOKS = [
    {
        category: 'Business & Money',
        price: '$18.95',
        stocked: true,
        title: 'Principles: Life and Work',
        img: 'https://images-na.ssl-images-amazon.com/images/I/41Mq7Ss7lPL._SX331_BO1,204,203,200_.jpg'
    },
    {
        category: 'Business & Money',
        price: '$17.79',
        stocked: true,
        title: 'Strenghts Finder 2.0',
        img: 'https://images-na.ssl-images-amazon.com/images/I/51SdxC2moVL._SX360_BO1,204,203,200_.jpg'
    },
    {
        category: 'Business & Money',
        price: '$14.49',
        stocked: false,
        title: 'The Total Money Makeover',
        img: 'https://images.gr-assets.com/books/1328323537l/6570928.jpg'
    },
    {
        category: 'Communication Skills',
        price: '$10.14',
        stocke: true,
        title: 'Crucial Conversations Tools',
        img: 'https://images-na.ssl-images-amazon.com/images/I/51W9DU9pFuL._SX330_BO1,204,203,200_.jpg'
    },
    {
        category: 'Communication Skills',
        price: '$25.26',
        stocked: false,
        title: 'All You Need To Know About The Music Business',
        img: 'https://images-na.ssl-images-amazon.com/images/I/514-xeXBd9L._SX330_BO1,204,203,200_.jpg'
    },
    {
        category: 'Communication Skills',
        price: '$9.19',
        stocked: true,
        title: 'How to Win Friends in The Digital Age',
        img: 'https://images-na.ssl-images-amazon.com/images/I/41WG%2B0OgDwL._SX324_BO1,204,203,200_.jpg'
    },
    {
        category: 'Politics & Social Sciences',
        price: '$17.99',
        stocked: true,
        title: 'Fire and Fury: Inside the Trump White House',
        img: 'https://images-na.ssl-images-amazon.com/images/I/51AEI3isFiL._SX327_BO1,204,203,200_.jpg'
    },
    {
        category: 'Politics & Social Sciences',
        price: '$21.99',
        stocked: false,
        title: 'Ukraine: Zbigs Grand Chessboard',
        img: 'https://images-na.ssl-images-amazon.com/images/I/519lt-Hc5UL._SX331_BO1,204,203,200_.jpg'
    },
    {
        category: 'Politics & Social Sciences',
        price: '$19.79',
        stocked: true,
        title: 'It Is Event Worse Than You Think',
        img: 'https://images-na.ssl-images-amazon.com/images/I/419jED87sYL._SX329_BO1,204,203,200_.jpg'
    }
];

//Testing JSX in depth:
function BuyBtn(props) {
    return(
        <button backroundColor={props.backColor} color={props.fontColor} padding={props.paddingEl}>
            Buy a ticket!
        </button>
    )
}

function BtnCreate() {
    return <BuyBtn
                backColor="red"
                fontColor="#ffffff"
                paddingEl="5px 10px" />;
}

//Testing props in JSX:
function CheckingPairing(props) {
    let description;
    if (props.number % 2 === 0) {
        description = <strong>even</strong>
    } else {
        description = <i>odd</i>
    }
    return <div>{props.number} is an {description} number</div>;
}

function PairingNumber() {
    return(
        <CheckingPairing number={43}/>
    )
}

//Testing children with JSX:
function Item(props) {
    return <li>{props.message}</li>;
}

function TodoList() {
    const todos = ['1) Complete annual report for Monarch Solutions Ltd',
                   '2) Business meeting with Andrew Van Der Schteiger',
                   '3) Visit to the Global Worldwide Electronical Conference',
                   '4) Booking a new room in the hotel in Japan',
                   '5) Meet about DFC-Defener #450567 patent',
                   '6) Relax with my family in the weekend'
               ];
   return (
       <ul>
           {todos.map((message) => <Item key={message} message={message} />)}
       </ul>
   );
}

//Functions as children:
function Repeat(props) {
    let items = [];
    for (let i = 0; i < props.numTimes; i++) {
        items.push(props.children(i));
    }
    return <div>{items}</div>;
}

function ListOfFifteenThings() {
    return (
        <Repeat numTimes={15}>
            {(index) => <div key={index}>It is a special item {index} in the list</div>}
        </Repeat>
    );
}

//Single child for PropTypes:
class MyComponent extends React.Component {
    render() {
        const children = this.props.children;
        return (
            <div>
                {children}
            </div>
        );
    }
}

MyComponent.propTypes = {
    children: PropTypes.element.isRequired
};

//Default properties initialized:
class GreetingWindow extends React.Component {
    render() {
        return (
            <div className="greeting-window">
                <h3>Hello, {this.props.name}</h3>
                <p>Would you like {this.props.comics} comics ?</p>
            </div>
        );
    }
}

GreetingWindow.defaultProps = {
    name: 'Guy',
    comics: 'MARVEL'
};

//Adding ref attribute to the DOM component:
class CustomTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.focusTextInput = this.focusTextInput.bind(this);
    }

    focusTextInput() {
        this.textInput.focus();
    }

    render() {
        return (
            <div>
                <input defaultValue="Vladimir Pavlov" type="text" ref={(input) => {this.textInput = input; }}/>
                <input type="button" value="Focus the next input" onClick={this.focusTextInput}/>
            </div>
        );
    }
}

class AutoFocusTextInput extends React.Component {
    componentDidMount() {
        this.textInput.focusTextInput();
    }

    render() {
        return (
            <CustomTextInput ref={(input) => {this.textInput = input; }}/>
        );
    }
}

class FileInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        alert(
            `Selected file - ${this.fileInput.files[0].name}`
        );
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="choose-file">
                <label>Upload file: 
                    <input 
                        type="file"
                        ref={input => {
                            this.fileInput = input;
                        }}
                    />
                </label>
                <br/>
                <button type="submit">Submit</button>
            </form>
        );
    }
}

class ListOfWords extends React.PureComponent {
    render() {
        return <div>{this.props.words.join(',')}</div>;
    }
}

class WordAdder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            words: ['Suzuki']
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const words = this.state.words;
        words.push('Suzuki');
        this.setState({words: words});
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}/>
                <ListOfWords words={this.state.words}/>
            </div>
        );
    }
}

//Declaring react classes without using ES6:
class Greeting2 extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}

//Autobinding event handlers:
class SayHello extends React.Component {
    constructor(props) {
        super(props);
        this.state = {message : 'Hello!'};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        alert(this.state.message);
    }

    render() {
        return (
            <button onClick={this.handleClick}>Say hello!</button>
        );
    }
}

//Autobinding with Babel:
class SayHello3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {message : 'Hello, my dear world!'};
    }

    handleClick = () => {
        alert(this.state.message);
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                Say hello to the world!
            </button>
        );
    }
}

//Autobinding all elements without ES6:
/*var sayHello2 = createReactClass({
    getInitialState : function() {
        return {message : 'Hello, dear world!'};
    },

    handleClick : function() {
        alert(this.state.message);
    },

    render : function() {
        return (
            <button onClick={this.handleClick}>Say hello to the world!</button>
        )
    }
});*/

//Create a simple block output without using JSX:
class MyName extends React.Component {
    render() {
        return React.createElement('div', null, `Hi! My name is ${this.props.toName}`);
    }
}

const e = React.createElement;

class MyName2 extends React.Component {
    render() {
        return e('div', null, `I have a ${this.props.toAge}`);
    }
}

//Rendering multiple componenets in the one DOM element:
let modals = (
    <div>
        <Calculator />
        <SignUpDialog />
        <FilterableBookTable books={BOOKS} />
        <BtnCreate />
        <PairingNumber />
        <TodoList />
        <ListOfFifteenThings />
        <GreetingWindow />
        <AutoFocusTextInput />
        <FileInput />
        <WordAdder />
        <Greeting2 />
        <SayHello />
        <SayHello3 />
        React.createElement(MyName, {toName : 'Vladimir Pavlov'}, null);
        React.createElement(MyName2, {toAge : '21'}, null);
    </div>
)

ReactDOM.render(
    modals,
    document.getElementById("root")
);

registerServiceWorker();
