import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../custom-hooks/useAuth';

const PrivateRoute = ({children}) => {
    const {currentUser} = useAuth()
    const location  = useLocation();

    if(currentUser){
         return children;
    }


    return <Navigate to ='/login' state={{from:location}} replace></Navigate>    
    
};  

export default PrivateRoute;