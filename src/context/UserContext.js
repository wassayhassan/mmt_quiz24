import React, {useState, useEffect, createContext} from 'react';
import { BASELINE } from '../util';
import axios from 'axios';

const UserContext = createContext();

const  UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [err, setErr] = useState('');
    useEffect(()=> {
        getUserLoginState()
    }, [])
    const getUserLoginState = async() => {
          let u_id = localStorage.getItem("quiz-loggedinuserid");
          if(u_id){
            const res = await axios.post(BASELINE+'user/info', {u_id});
          //  console.log(res.data);
            if(res.status === 200){
              setUser(res.data)
            }else{
                setErr('Error connecting to server');
            }
          }

    }
    const logoutUser = () => {
        localStorage.setItem("quiz-loggedinuserid", null);
        setUser(null);
    }
    const savelogin = (value) => {
        localStorage.setItem("quiz-loggedinuserid",value.u_id);
        setUser(value);
    }
    return (
        <UserContext.Provider value= {{user, logoutUser, savelogin}}>
          {children}
        </UserContext.Provider>
    )
}
export {UserContext, UserProvider}