import React from 'react'
import { Navigate } from 'react-router-dom';
import { Children } from 'react';


export default function ForgetRoute({children}) {
    if(sessionStorage.getItem('forget_email') == null){
        return <Navigate to="/"/>
    }

    return children;
}
