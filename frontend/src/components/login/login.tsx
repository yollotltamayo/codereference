import {React, useState} from 'react'
//import './login.css';
import axios from 'axios';
const Login = () =>{
    const [nav, setNav] = useState(false);
    async function login(){
        window.location.href = "/authorize/first";
        // redirect to the API, this way
        // CORS problems are ignored.
    }
    return (
        <>
            <button onClick={()=>{login()}}>
                Login
            </button>
        </>
    )
};
export default Login;

