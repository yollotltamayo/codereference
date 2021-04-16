import {React,createContext, useEffect,useState} from 'react';
import axios from 'axios';
import Login from './components/login/login'
import App from './App';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter,
    HashRouter
} from "react-router-dom";
export const UserContext  = createContext("");
const Home = () => {
const [loaded , setLoad] = useState(false);
const [user , setUser] = useState({
    "name":"",
    "avatar":"",
});
    useEffect(()=>{
        axios.get("/user")
            .then( (value) => {
                var avatar = value.data.avatar.split('"').join("");
                var user = value.data.user.split('"').join("");
                setUser({
                    "name":user,
                    "avatar":avatar
                })
                setLoad(true);
            })
            .catch( () => {
                setLoad(false);
            });
    },[]);

    return (
        <UserContext.Provider value={user.avatar+'*'+user.name}> {/* Deserialize the string*/}
            {loaded === true
                ?  <App/>  
                : <Login/>
            }
        </UserContext.Provider> 
    )
}
export default Home;
