import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './App';
import Fusion from './Fusion';
import Home from './Home';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter,
    HashRouter
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
  <Router>      
      <Fusion/>
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
