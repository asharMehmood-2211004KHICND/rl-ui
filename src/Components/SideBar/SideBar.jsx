import React from 'react'
import './SideBar.css'
import HomeIcon from '@mui/icons-material/Home';
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';
import TodayIcon from '@mui/icons-material/Today';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link, useNavigate } from 'react-router-dom';

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
						<li onClick={home} className="sideBarListItem"><HomeIcon className="menuIcon" /> Home</li>
						<li className="sideBarListItem active"><QueuePlayNextIcon className="menuIcon" /><Link to="/job/all">Openings</Link></li>
						<li className="sideBarListItem"><TodayIcon className="menuIcon" />Interview Schedule</li>
						<li className="sideBarListItem"><GroupAddIcon className="menuIcon" /><Link to="/candidate/JobList"> Candidates</Link></li>
						<li className="sideBarListItem"><AssignmentIndIcon className="menuIcon" /> Users</li>
					</ul>
				</div>

				<div className="sideBarMenu">
					<div className="sideBarTitle">Other Links</div>

					<ul className="sideBarList">
						<li className="sideBarListItem"><HomeIcon className="menuIcon" /><Link to="">Job Types</Link></li>
						<li className="sideBarListItem"><HomeIcon className="menuIcon" /><Link to="">Soft Skills</Link></li>
						<li className="sideBarListItem"><HomeIcon className="menuIcon" /><Link to="">Technical Skills</Link></li>
						<li className="sideBarListItem"><HomeIcon className="menuIcon" /><Link to="/admin/education">Departments</Link></li>
						<li className="sideBarListItem"><HomeIcon className="menuIcon" /><Link to="/admin/education">Degree Types</Link></li>
						<li className="sideBarListItem"><HomeIcon className="menuIcon" /><Link to="">Locations</Link></li>

						{/* <li className="sideBarListItem"><QueuePlayNextIcon className="menuIcon" /></li>
						<li className="sideBarListItem"><TodayIcon className="menuIcon" />Skills</li>
						<li className="sideBarListItem"><GroupAddIcon className="menuIcon" />Questions</li> */}
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