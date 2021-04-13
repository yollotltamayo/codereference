import React from 'react';
import App from './App'
import Login from './components/login/login'
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
                {/*<ul>
                    <li>
                        <Link to="/login">
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link to="/app">
                            App
                        </Link>
                    </li>
                </ul>*/}
            <Switch>
                <Route exact path="/static/login/" 
                    component={withRouter(Login)}/>
                <Route path="/static/app/">
                    <App />
                </Route>
            </Switch>
        </>
    )
};
export default Fusion;

