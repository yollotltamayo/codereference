import {React} from 'react'
//import './login.css';
const Login = () =>{

    let login = () => {
        // por alguna razon no funciona si no hay cookies
        //
        window.location.href = "/authorize/first/";
    }
    return (
        <>
            <button onClick={login}>
                Login
            </button>
        </>
    )
};
export default Login;

