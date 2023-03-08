import React from 'react'
import { Navigate, Route, } from 'react-router-dom';
import TopBar from './Header/TopBar';
import SideBar from './SideBar/SideBar';
import { TopAndSideBar } from './TopSideBar/TopAndSideBar';



export default function PrivateRoute({  children: Component ,  path}) {
    if (sessionStorage.getItem('user_id') == null) {
        return <Navigate to="/login" />
    }
    else {
        return (<TopAndSideBar>{Component}</TopAndSideBar>)
        // return (<Route  ></Route>)
    }

    // (<Route path={path} element={Component} render={(props) => (
    //     sessionStorage.getItem('user_id') == null
    //       ? <Component {...props} />
    //       : <Navigate to='/login' />
    //   )} />)
}
