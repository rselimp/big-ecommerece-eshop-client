import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';


const useAuth = () => {
    const [currentUser, setCurrentUser] = useState({})
    const[user, setUser] = useState('')

    useEffect(  () =>{
        onAuthStateChanged(auth,(user) =>{
            if(user){
                setCurrentUser(user)
            }
            else{
                setCurrentUser(null)
            }
        })
    },[])
    return {
        currentUser,
        user

    };
};     
 

export default useAuth;