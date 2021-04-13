import React from 'react';
import App from './App';
import Login from './components/login/login';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const Rot = () =>{
    return (
        <>
            <Router>
            <Switch>
                <Route path="/static/login">
                    <Login/>
                </Route>
                <Route path="/static/app">
                    <App />
                </Route>
            </Switch>
        </Router>
        </>
    )
};
export default Rot;



