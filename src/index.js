import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <React.StrictMode>
    <App />
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


//React .strict mode doesnt throw an error until after intial refresh
//meaning: the redirection is not allowing a compontent did mount to happen at the app level. 
// I want the app level to be loading the user and then the seperate pages to be making those api calls when redirected there. 