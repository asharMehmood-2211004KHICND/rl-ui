import React from 'react'
import './SideBar.css'
import HomeIcon from '@mui/icons-material/Home';
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';
import TodayIcon from '@mui/icons-material/Today';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
export default function SideBar() {
    return (
        <div className="sideBar">

            <div className="sideBarWrapper">
                <div className="sideBarMenu">
                    <div className="sideBarTitle">Dashboard</div>

                    <ul className="sideBarList">
                        <li className="sideBarListItem active"><HomeIcon className="menuIcon" /> Home</li>
                        <li className="sideBarListItem"><QueuePlayNextIcon className="menuIcon" />  Openings</li> 
                        <li className="sideBarListItem"><TodayIcon className="menuIcon" />Interview Schedule</li>
                        <li className="sideBarListItem"><GroupAddIcon className="menuIcon" /> Candidates</li>
                        <li className="sideBarListItem"><AssignmentIndIcon className="menuIcon" /> Users</li>
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
            </div>

        </div>
    )
}
