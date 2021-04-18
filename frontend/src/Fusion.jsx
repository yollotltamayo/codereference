import React from 'react';
import Login from './components/login/login'
import Home from './Home';
import {
    Switch,
    Route,
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

