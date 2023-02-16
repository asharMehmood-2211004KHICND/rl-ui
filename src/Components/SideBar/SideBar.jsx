import React from 'react'
import './SideBar.css'
import HomeIcon from '@mui/icons-material/Home';
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';
import TodayIcon from '@mui/icons-material/Today';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AssignmentIcon from '@mui/icons-material/Assignment';
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
						<li><NavLink className="sideBarListItem" to="/" activeclassname="active"><HomeIcon className="menuIcon" />Home</NavLink></li>
						<li><NavLink className="sideBarListItem" to="/job/all" activeclassname="active"><QueuePlayNextIcon className="menuIcon" />Openings</NavLink></li>
						<li><NavLink className="sideBarListItem" to="/my-interview-schedule" activeclassname="active"><TodayIcon className="menuIcon" />My Interviews</NavLink></li>
						<li><NavLink className="sideBarListItem" to="/interview-schedule" activeclassname="active"><TodayIcon className="menuIcon" />Interview Schedule</NavLink></li>
						<li><NavLink className="sideBarListItem" to="/candidate/JobList"><GroupAddIcon className="menuIcon" />Available Jobs</NavLink></li>
						<li><NavLink className="sideBarListItem" to="/my-applications"><AssignmentIcon className="menuIcon" />My Applicaitons</NavLink></li>
						<li><NavLink className="sideBarListItem" to="/users/candidates/all"><AssignmentIndIcon className="menuIcon" />Candidates</NavLink></li>
						<li><NavLink className="sideBarListItem" to="/users/staff"><AssignmentIndIcon className="menuIcon" />Staff</NavLink></li>
					</ul>
				</div>

				<div className="sideBarMenu">
					<div className="sideBarTitle">Other Links</div>

					<ul className="sideBarList">
						<li><NavLink className="sideBarListItem" to="/admin/jobType"><AssignmentIndIcon className="menuIcon" />Job Types</NavLink></li>
						<li><NavLink className="sideBarListItem" to="/admin/s-skill"><AssignmentIndIcon className="menuIcon" />Soft Skills</NavLink></li>
						<li><NavLink className="sideBarListItem" to="/admin/t-skill"><AssignmentIndIcon className="menuIcon" />Technical Skills</NavLink></li>
						<li><NavLink className="sideBarListItem" to="/admin/department"><AssignmentIndIcon className="menuIcon" />Departments</NavLink></li>
						<li><NavLink className="sideBarListItem" to="/admin/education"><AssignmentIndIcon className="menuIcon" />Degree Types</NavLink></li>
						<li><NavLink className="sideBarListItem" to="/admin/location"><AssignmentIndIcon className="menuIcon" />Locations</NavLink></li>
						<li><NavLink className="sideBarListItem" to="/admin/benefit"><AssignmentIndIcon className="menuIcon" />Benefit List</NavLink></li>
						<li><NavLink className="sideBarListItem" to="/admin/perks"><AssignmentIndIcon className="menuIcon" />Perks List</NavLink></li>
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