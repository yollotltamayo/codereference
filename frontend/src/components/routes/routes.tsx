import React from 'react';
import Login from '../login/login';
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
            </Switch>
        </Router>
        </>
    )
};
export default Rot;


