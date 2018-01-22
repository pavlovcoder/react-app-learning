import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));
/*ReactDOM.render(
  <h1>Hello World!</h1>,
  document.getElementById('root')
);*/

//2. Testing JS-expressions in JSX:
/*function formatName(user){
    return user.firstName + ' ' + user.lastName;
}

const user = {
    firstName: 'Vladimir',
    lastName: 'Pavlov'
};*/

/*const element = (
  <div>
    <h1>Hello! {formatName(user)}</h1>
    <h2>Good to see you here.</h2>
  </div>
);*/

/*const element = React.createElement(
    'div',
    {className: 'default'},
    'Second section with React!'
);*/

/*const elemen2 = {
    type: 'div',
    props: {
        className: 'main-section',
        children: 'Third React Section'
    }
};*/

/*function tick(){
  const element = (
    <div>
      <h1>Hello, {formatName(user)}</h1>
      <h2>Now is: {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

function Welcome(props){
  return <h1>Hello, {props.name}</h1>;
}

const element3 = <Welcome name="Sara"/>;
ReactDOM.render(
  element3,
  document.getElementById('root')
);

setInterval(tick,1000);*/

//Composing elements in React:
/*
function Welcome(props) {
  return <div><h1>Hello, {props.name}</h1><hr></hr><p>It's a second bottom block!</p></div>; 
}



function App(){
  return (
    <div>
      <Welcome name="Andreas" />
      <Welcome name="Paul" />
      <Welcome name="Scott" />
    </div>
  );
}*/

//Creation testing comment section:
function formatDate(date){
  return date.toLocaleDateString();
}

function Comment(props){
  return (
    <div className="Comment">
      <UserInfo user={props.author}/>
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}

function Avatar(props){
  return(
    <img className="Avatar" src={props.user.avatarUrl} alt={props.user.name} height={props.user.size} width={props.user.width}/>
  );
}

function UserInfo(props){
  return (
    <div className="UserInfo">
      <Avatar user={props.user}/>
      <div className="UserInfo-name">{props.user.name}</div>
    </div>
  );
}

const comment = {
  date: new Date(),
  text: 'Hi, Honey! How are you ? What are you doing ?',
  author: {
    name: 'Benjamin Vaterloo',
    avatarUrl: 'https://images.pexels.com/photos/618613/pexels-photo-618613.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
    size: 300,
  },
};



ReactDOM.render(
  <Comment date={comment.date} text={comment.text} author={comment.author}/>,
  document.getElementById('root')
);
registerServiceWorker();
