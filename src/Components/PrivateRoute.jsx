import React from 'react'
import { Navigate } from 'react-router-dom';
import TopBar from './Header/TopBar';
import SideBar from './SideBar/SideBar';



export default function PrivateRoute({ children }) {
    if (sessionStorage.getItem('user_id') == null) {
        return <Navigate to="/login" />
    }
    else {
        return (
            <div className="App">
                <TopBar />
                <div className="containerz">
                    <SideBar />
                    <div className="pages">
                        {children}
                    </div>
                </div>
            </div>
        )

    }
}
