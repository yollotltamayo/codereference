import React from 'react';
import './navbar.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
const Navbar = () => {
   return( 
   <header>
       <div id="navbar">
               <ul>
                   <input></input>
                   <li>
                       <Link to="/static/login/">
                           LOGIN
                       </Link>
                   </li>
                   <li>Subir Código </li>
                   <li>Convertir a PDF </li>
                   <li>Ajustes</li>
               </ul>
       </div>
   </header>
         );
};
export default Navbar;
