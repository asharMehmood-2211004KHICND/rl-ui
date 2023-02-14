import React, { useState } from 'react'
import './TopBar.css'
import logo from '../images/logo_5.png'
import dummymale from '../images/male.png'
import dummyfemale from '../images/female.png'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom'

export default function TopBar() {

	let user = sessionStorage.getItem("user_firstname");

	const navigate = useNavigate();
	const openProfile = () => {
		navigate('/view-profile')
	}

	return (
		<div className='topHeader'>
			<div className="topHeaderWrapper">
				<div className="topLeft">
					<img src={logo} alt="Resource Loop" className="logoImage" />
					<span className="logoText">
						Applicant Tracking System
					</span>

				</div>
				<div className="topRight" style={{cursor: 'pointer'}} onClick={openProfile}>
					<img src={dummymale} className='avatarTop' />
					<div className="topIconContainer">
						<span id="user_name">{user}</span> <ArrowDropDownIcon className='menuIcon' />
					</div>
				</div>


			</div>
		</div>
	)
}
