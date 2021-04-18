import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Fusion from './Fusion';
import { createBrowserHistory } from "history";
import {
     Router
} from "react-router-dom";

const appHistory = createBrowserHistory();
ReactDOM.render(
  <React.StrictMode>
  <Router history={appHistory}>      
      <Fusion/>
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
