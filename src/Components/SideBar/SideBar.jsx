import React from 'react'
import './SideBar.css'
import HomeIcon from '@mui/icons-material/Home';
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';
import TodayIcon from '@mui/icons-material/Today';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function SideBar() {

	const navigate = useNavigate();

	function logout() {
		sessionStorage.clear();
		navigate('/login');
	}

	function home() {
		navigate('/Home');
	}


	function createJob() {
		navigate('/createJob');
	}



	function profile() {
		navigate('/profile');
	}

	return (
		<div className="sideBar">

			<div className="sideBarWrapper">
				<div className="sideBarMenu">
					<div className="sideBarTitle">Dashboard</div>
					<ul className="sideBarList">
						<li><NavLink className="sideBarListItem" to="/" activeClassName="active"><HomeIcon className="menuIcon" />Home</NavLink></li>
						<li><NavLink className="sideBarListItem" to="/job/all" activeClassName="active"><QueuePlayNextIcon className="menuIcon" />Openings</NavLink></li>
						<li><NavLink className="sideBarListItem" to="/view"><TodayIcon className="menuIcon" />Interview Schedule</NavLink></li>
						<li><NavLink className="sideBarListItem" to="/candidate/JobList"><GroupAddIcon className="menuIcon" /> Candidates</NavLink></li>
						<li><NavLink className="sideBarListItem" to="/users"><AssignmentIndIcon className="menuIcon" /> Users</NavLink></li>
					</ul>
				</div>

				<div className="sideBarMenu">
					<div className="sideBarTitle">Other Links</div>

					<ul className="sideBarList">
						<li className="sideBarListItem"><HomeIcon className="menuIcon" />Job Types</li>
						<li className="sideBarListItem"><QueuePlayNextIcon className="menuIcon" />Locations</li>
						<li className="sideBarListItem"><TodayIcon className="menuIcon" />Skills</li>
						<li className="sideBarListItem"><GroupAddIcon className="menuIcon" />Questions</li>
					</ul>


				</div>

				<div className="sideBarMenu">
					<div className="sideBarTitle">Personal</div>

					<ul className="sideBarList">
						<li className="sideBarListItem"><AccountBoxIcon className="menuIcon" /><Link to="/profile">Profile</Link></li>
						<li onClick={logout} className="sideBarListItem"><LogoutIcon className="menuIcon" />Logout</li>
					</ul>
				</div>
			</div>
		</div>
	)
}