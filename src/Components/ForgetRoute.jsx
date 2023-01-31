import React from 'react'
import { Navigate } from 'react-router-dom';
import { Children } from 'react';


export default function ForgetRoute({children}) {
    if(sessionStorage.getItem('user_email') == null){
        return <Navigate to="/login"/>
    }

    return children;
}
