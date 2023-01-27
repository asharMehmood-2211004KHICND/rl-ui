import React from 'react'
import { Navigate } from 'react-router-dom';
import { Children } from 'react';


export default function PrivateRoute({children}) {
    if(sessionStorage.getItem('user_id') == null){
        return <Navigate to="/login"/>
    }

    return children;
}
