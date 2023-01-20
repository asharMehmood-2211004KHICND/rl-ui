import React from 'react'
import './TopBar.css'
import logo from './image.png'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function TopBar() {
    return (
        <div className='topHeader'>
            <div className="topHeaderWrapper">
                <div className="topLeft">
                <img src={logo} alt="Resource Loop" className="logoImage" /> 
                    <span className="logoText">
                    Applicant Tracking System    
                    </span>
                    
                </div>
                <div className="topRight">
                <img src='https://cdn.truelancer.com/user-picture/57794-55041a9d6de42.jpg' className='avatarTop' />
                    <div className="topIconContainer">    
                        <span>User Profile</span> <ArrowDropDownIcon className='menuIcon' />
                    </div>
                </div>


            </div>
        </div>
    )
}
