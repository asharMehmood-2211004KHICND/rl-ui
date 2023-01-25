import React from 'react'
import './TopBar.css'
import logo from '../images/logo_5.png'
import dummymale from '../images/male.png'
import dummyfemale from '../images/female.png'

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
                <img src={dummymale} className='avatarTop' />
                    <div className="topIconContainer">    
                        <span id="user_name"></span> <ArrowDropDownIcon className='menuIcon' />
                    </div>
                </div>


            </div>
        </div>
    )
}
