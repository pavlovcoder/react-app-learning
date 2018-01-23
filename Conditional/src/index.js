import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

/*
function UserGreeting(props){
    return(
      <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">Welcome Back!</h4>
          <hr></hr>
          <p>You can continue further interaction with service.</p>
      </div>  
    );
}

function GuestGreeting(props){
    return(
      <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">Oops! Sorry, but you didn't authorized.</h4>
          <hr></hr>
          <p>Please, sign up for continue.</p>
      </div>  
    );
}

function Greeting(props){
    const isLoggedIn = props.isLoggedIn;
    if(isLoggedIn){
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

function LoginButton(props){
    return(
        <button type="button" className="btn btn-warning btn-lg" onClick={props.onClick}>Login</button>        
    );
}

function LogoutButton(props){
    return(
        <button type="button" className="btn btn-success btn-lg" onClick={props.onClick}>Logout</button>
    );
}

class LoginControl extends React.Component {
    constructor(props){
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false};
    }
    
    handleLoginClick(){
        this.setState({isLoggedIn: true});
    }
    
    handleLogoutClick(){
        this.setState({isLoggedIn: false});
    }
    
    render(){
        const isLoggedIn = this.state.isLoggedIn;
        
        let button = null;
        if(isLoggedIn){
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />;
        }
        
        return(
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>    
        );
    }
}
*/

//Using inline if-else conditional operator with &&:
/*
function Mailbox(props){
    const unreadMessages = props.unreadMessages;
    return (
        <div>
            <h1>Hello!</h1>
            {unreadMessages.length > 0 ? (
                <h2>You have {unreadMessages.length} unread messages.</h2>
            ) : (
                <h2>You haven't unread messages.</h2>
            )}
        </div>    
    );
}

const messages = ['First message','Second message','Third message'];

ReactDOM.render(
    <Mailbox unreadMessages={messages} />,
    document.getElementById('root')
);
*/

//Preventing component from rendering:
function WarningBanner(props){
    if(!props.warn){
        return null;
    }
    
    return (
        <div className="warning">
            Warning!
        </div>    
    );
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showWarning: true}
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }
    
    handleToggleClick(){
        this.setState(prevState => ({
            showWarning: !prevState.showWarning
        }));
    }
    
    render(){
        return(
            <div>
                <WarningBanner warn={this.state.showWarning} />
                <button className="btnWarning" onClick={this.handleToggleClick}>{this.state.showWarning ? 'Hide' : 'Show'}</button>
            </div>    
        );
    }
}

const numbers = [252,635,892,894,953,1003,1500];
ReactDOM.render(
    <Page />,
    document.getElementById('root')
);

//List and keys - create a first list with items:
function NumberList(props){
    const numbers = props.numbers;
    const listItems = numbers.map((number) => <li key={number.toString()}>
    {number}
    </li>
    );
    return (
        <div className="first-list">
            <h4>Create first list</h4>
            <hr></hr>
            <ul>{listItems}</ul>  
        </div>
    );
}

ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root2')
);

//Exctracting components with keys:
function ListItem(props){
    return <li>{props.value}</li>;
}

function NumberList2(props){
    const numbers = props.numbers;
    const listItems = numbers.map((number) => 
        <ListItem key={number.toString()} value={number} />
    );
    return (
        <div className="react-part">
            <h5>Exctracting components with keys</h5>
            <hr></hr>
            <ul>
                {listItems}
            </ul>    
        </div>
    );
}

const numbers2 = [0.142,0.2353,0.524,0.7235,0.8835,0.935,0.9992];
ReactDOM.render(
    <NumberList2 numbers={numbers2} />,
    document.getElementsByClassName('react-section')[0]
);

//Uniqueness of keys among siblings:
function NewsWebsite(props){
    const articles = (
        <div className="articles-container">
        {props.articles.map((article) => 
            <div className="each-article">
                <img src={article.img} alt="Theme of article" className="images-of-articles"></img>
                <h4 className="articles-title">{article.title}</h4>
                <hr className="articles-divider"></hr>
                <p className="articles-content">{article.content}</p>
                <button type="button" className="articles-btn">Read</button>
            </div>
        )}
        </div>
    );
    return (
        <div className="articles-block">{articles}</div>  
    );
}

const posts = [
    {
        id: 1,
        title: 'Get Your First Look at the Future of Hypersonic Flight',
        content: 'Aerospace companies are in a heated race to create a hypersonic plane to replace the SR-71 Blackbird. Though retired in 1990, the SR-71 still holds the record as the fastest plane ever built, achieving a top speed of 3,540 kmh (2,200 mph). The goal now is to build a plane capable of reaching speeds above Mach 5 (6,171 kmh/3,835 mph), and Boeing thinks they may have the design that could do it.',
        img: 'https://futurism.com/wp-content/uploads/2018/01/boing-hypersonic2-1515787473.jpg'
    },
    {
        id: 2,
        title: 'For humanity to have any hope of long-term colonization on Mars',
        content: 'For humanity to have any hope of long-term colonization on Mars, we’ll have to develop power systems capable of meeting our off-world energy needs. As such, NASA, the U.S. Department of Energy (DOE), and the Los Alamos National Laboratory (LANL) have been hard at work on Kilopower, a compact nuclear energy reactor that could operate on the Red Planet and beyond.',
        img: 'https://futurism.com/wp-content/uploads/2018/01/Kilopower.jpg'
    },
    {
        id: 3,
        title: 'Futurism’s First Annual Fake Science News Awards',
        content: 'This week, President Donald Trump revealed the Fake News Awards. Yes, this is a real thing. The awards are meant to recognize (unnecessarily attack?) reporters and publications that, as the GOP outlines, are guilty of “unrelenting bias, unfair news coverage, and even downright fake news.” This year’s so-called winners include several esteemed journalists and organizations in mainstream media, such as Pulitzer Prize winner Eric Lichtblau, Pulitzer Prize nominee Thomas Frank, the New York Times, and the Washington Post.',
        img: 'https://futurism.com/wp-content/uploads/2018/01/Jill-Stein-1200x1200.png'
    },
    {
        id: 4,
        title: 'Urban Farming Is the Future of Agriculture',
        content: 'The planet is growing more food than ever, and yet millions of people continue to starve worldwide. People are hungry everywhere — in the country, in the suburbs. But increasingly, one of the front lines in the war against hunger is in cities. As urban populations grow, more people find themselves in food deserts, areas with “[l]imited access to supermarkets, supercenters, grocery stores, or other sources of healthy and affordable food,” according to a report by the U.S. Department of Agriculture.',
        img: 'https://futurism.com/wp-content/uploads/2017/12/d5-1200x900.jpg'
    }
];

ReactDOM.render(
    <NewsWebsite articles={posts} />,
    document.getElementsByClassName("react-section2")[0]
);

//Controlled form components:
class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event){
        this.setState({value: event.target.value.toUpperCase()});
    }
    
    handleSubmit(event){
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }
    
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>    
        );
    }
}

ReactDOM.render(
    <NameForm />,
    document.getElementsByClassName("react-section3")[0]
);

//Creation controlled component for textarea element:
class AboutForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: 'Please, write about you few simple sentences...'
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event){
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event){
        alert('Ok! It is fine. Greetings for you :)' + this.state.value);
        event.preventDefault();
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    About you:
                    <textarea value={this.state.value} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>    
        );    
    }
}

ReactDOM.render(
    <AboutForm />,
    document.getElementsByClassName("react-section-4")[0]
);

//Controlled select list creation:
class BooksForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {value: 'TheLiteraryWorks'};
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event){
        alert('Your favorite book is: ' + this.state.value);
        event.preventDefault();
    }
    
    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    Pick your favorite book of Leonardo da Vinci series: 
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="TheDivineComedy">The Divine Comedy: Inferno, Purgatorio, Paradiso - by Dante Alighieri</option>
                        <option value="ArtAndIllusion">Art and Illusion: A Study in the Psychology of Pictorial Representation (Bollingen) - by E. H. Gombrich</option>
                        <option value="GalleryOfTheArts">Leonardo da Vinci (Gallery of the Arts) - by Edoardo Villata </option>
                        <option value="TheLiteraryWorks">The literary works of Leonardo da Vinci; Volume 1 - by da Vinci Leonardo</option>
                        <option value="LeonardoDaVinci">Leonardo da Vinci: Revised Edition - by Kenneth Clark</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

ReactDOM.render(
    <BooksForm />,
    document.getElementById("react-section-5")
);

//The file input tag:
class FileInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event){
        event.preventDefault();
        alert(
            `Selected file - ${this.fileInput.files[0].name}`  
        );
    }
    
    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    Upload your book in PDF: 
                    <input type="file" ref={input => {this.fileInput = input;}}/>
                </label>
                <br/>
                <button type="submit">Submit</button>
            </form>    
        );
    }
}

ReactDOM.render(
    <FileInput />,
    document.getElementById("react-section-6")
);

//Multiple Inputs Maintenance:
class Reservation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2
        };
        
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleInputChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        });
    }
    
    render(){
        return(
            <form>
                <label>
                    Is going:
                    <input 
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange}
                    />
                </label>
                <br/>
                <label>
                    Number of guests:
                    <input 
                        name="numberOfGuest"
                        type="number"
                        value={this.state.numberOfGuest}
                        onChange={this.handleInputChange}
                    />
                </label>
            </form>    
        );
    }
}

ReactDOM.render(
    <Reservation />,
    document.getElementById('react-section-7')
);

//Controlled input null value:
setTimeout(function(){
    ReactDOM.render(<input value={null}/>,
    document.getElementById("react-setion8")
    );
},1000);

registerServiceWorker();
