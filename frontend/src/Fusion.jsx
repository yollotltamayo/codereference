import React from 'react';
import App from './App'
import Login from './components/login/login'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const Fusion = () =>{
    return (
        <>
            <Router>
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
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/app">
                    <App />
                </Route>
            </Switch>
        </Router>
        </>
    )
};
export default Fusion;

