import {useContext,React} from 'react';
import {UserContext} from '../../Home';
import './navbar.css';
import {
    Link,
} from "react-router-dom";
import axios from 'axios';
import { Avatar } from 'antd';
const Navbar = () => {
   const raw = useContext(UserContext).split('*');
    const user = raw[1];
    const avatar = raw[0];
    var logOut = () => {
        axios.get("/user/delete/")
            .then( (value) => {
                if(value.data === "failed"){
                alert("usuario no existe")
                window.location.href = "/authorize/first";
                }
            })
            .catch( () => {
                alert("usuario no existe")
                window.location.href = "/authorize/first";

            })
    };
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
                   <li>Convertir a PDF </li>
                   <li>{user !== ""?user:""}</li>
                   <li > <button onClick={() => {logOut()}} >LOGOUT</button></li>
                   <li>
                       <Avatar
                           size={{xs:24,sm:32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                           src={avatar}
                       />
                   </li>
               </ul>
       </div>
   </header>
         );
};
export default Navbar;
