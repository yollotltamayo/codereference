import React from 'react';
import App from './App'
import Login from './components/login/login'
import Home from './Home';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
} from "react-router-dom";

const Fusion = () =>{
    return (
        <>
            <Switch>
                <Route exact path="/static/login/" 
                    component={withRouter(Login)}/>
                <Route path="/"
                    component={withRouter(Home)}/>
            </Switch>
        </>
    )
};
export default Fusion;

