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
import auth from '../Hook/auth';

export default function SideBar() {

	const role = sessionStorage.getItem('user_roleid');
	// const role = '1';
	
	const navigate = useNavigate();
	// const {persona} = useContext(StateContext);

	function logout() {
		sessionStorage.clear();
		navigate('/login');
	}

	

	return (
		<div className="sideBar">

			<div className="sideBarWrapper">
				<div className="sideBarMenu">
					<div className="sideBarTitle">Dashboard</div>
					<ul className="sideBarList">
						{ auth(['4','2','3','1'], role) && <li><NavLink className="sideBarListItem" to="/" activeclassname="active"><HomeIcon className="menuIcon" />Home</NavLink></li>}
						{ auth(['4','3','2'], role) && <li><NavLink className="sideBarListItem" to="/job/all" activeclassname="active"><QueuePlayNextIcon className="menuIcon" />Openings</NavLink></li>}
						{ auth(['4'], role) && <li><NavLink className="sideBarListItem" to="/interviews" activeclassname="active"><QueuePlayNextIcon className="menuIcon" />Interviews</NavLink></li>}
						{ auth(['1'], role) && <li><NavLink className="sideBarListItem" to="/my-interview-schedule" activeclassname="active"><TodayIcon className="menuIcon" />My Interviews</NavLink></li>}
						{ auth(['2','3'], role) && <li><NavLink className="sideBarListItem" to="/interview-schedule" activeclassname="active"><TodayIcon className="menuIcon" />Interview Schedule</NavLink></li>}
						{ auth(['1'], role) && <li><NavLink className="sideBarListItem" to="/candidate/JobList"><GroupAddIcon className="menuIcon" />Available Jobs</NavLink></li>}
						{ auth(['1'], role) && <li><NavLink className="sideBarListItem" to="/my-applications"><AssignmentIcon className="menuIcon" />My Applicaitons</NavLink></li>}
						{ auth(['4'], role) && <li><NavLink className="sideBarListItem" to="/users/candidates/all"><AssignmentIndIcon className="menuIcon" />Candidates</NavLink></li>}
						{ auth(['4'], role) && <li><NavLink className="sideBarListItem" to="/users/staff"><AssignmentIndIcon className="menuIcon" />Staff</NavLink></li>}
					</ul>
				</div>

					{ auth(['4'], role) && (
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
					)}



				<div className="sideBarMenu">
				{ auth(['4'], role)  ? 
					<div className="sideBarTitle">Action</div> :
						<div className="sideBarTitle">Personal</div>
				}

					<ul className="sideBarList">
					{ auth(['1','2','3'], role) && <li className="sideBarListItem"><AccountBoxIcon className="menuIcon" /><Link to="/profile">Profile</Link></li> }
						<li onClick={logout} className="sideBarListItem"><LogoutIcon className="menuIcon" />Logout</li>
					</ul>
				</div>

			</div>
		</div>
	)
}