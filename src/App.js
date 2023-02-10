import { useState } from 'react';
import './App.css';
import TopBar from './Components/Header/TopBar';
import Home from './Components/Pages/Home/Home';
import SignupSignin from './Components/Pages/Login/SignupSignin';
import ErrorPage from './Components/Pages/Error/ErrorPage';
import SideBar from './Components/SideBar/SideBar';
import CandidatePersonalInfo from './Components/Pages/profile/CandidatePersonalInfo/CandidatePersonalInfo'
import CandidateAcademicInfo from './Components/Pages/profile/CandidateAcademicInfo/CandidateAcademicInfo'
import CandidateWorkInfo from './Components/Pages/profile/CandidateWorkInfo/CandidateWorkInfo'
import {
	BrowserRouter,
	Routes,
	Route
} from "react-router-dom";

import CreateJobPage from './Components/Pages/JobPost/CreateJob/CreateJobPage.js';
import VerificationEmail from './Components/Pages/Login/VerificationEmail';
import UpdateJobPage from './Components/Pages/JobPost/UpdatePageComponent/UpdateJobPage';
import PrivateRoute from './Components/PrivateRoute';
import JobsList from './Components/Pages/JobPost/JobList/JobList';
import IndividualJob from './Components/Pages/JobPost/JobView/IndividualJob';
import C_JobList from './Components/Pages/JobPost/Candidate/C_JobList';
import ForgetRoute from './Components/ForgetRoute';
import ForgetPassword from './Components/Pages/Login/ForgetPassword';
import CreateStaff from './Components/Pages/Staff/CreateStaff';
import ScheduleInterview from './Components/Pages/Schedule Interview/ScheduleInterview';
import AddJobHMandInterviewers from './Components/Pages/JobHMandInterviewers/AddJobHMandInterviewers';
import IndividualJobCandidate from './Components/Pages/JobPost/Candidate/JobView/IndividualJobCandidate';


function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<SignupSignin />} path="/login" />
				<Route element={<VerificationEmail/>} path="/forgetpassword" />
				<Route element={<ForgetRoute><ForgetPassword/></ForgetRoute>} path="/resetpassword" />
			</Routes>

			<Routes>
				<Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} ></Route>
				<Route path="/Dashboard" element={<PrivateRoute><Home /></PrivateRoute>} ></Route>
				<Route path="/Home" element={<PrivateRoute><Home /></PrivateRoute>} ></Route>
				<Route path="/profile" element={<PrivateRoute><CandidatePersonalInfo /></PrivateRoute>} ></Route>
				<Route path="/academic-details" element={<PrivateRoute><CandidateAcademicInfo /></PrivateRoute>} ></Route>
				<Route path="/work-experience" element={<PrivateRoute><CandidateWorkInfo /></PrivateRoute>} ></Route>
				<Route path="/skills" element={<PrivateRoute><h1>Skills Page</h1></PrivateRoute>} ></Route>
				<Route path="/createStaff" element={<PrivateRoute><CreateStaff /></PrivateRoute>}></Route>
				<Route path="/createJob" element={<PrivateRoute><CreateJobPage /></PrivateRoute>} ></Route>
				<Route path="/job/all" element={<PrivateRoute><JobsList /></PrivateRoute>} ></Route>
				<Route path="/job/update" element={<PrivateRoute><UpdateJobPage /></PrivateRoute>} ></Route>
				<Route path="/job/view/:jodId" element={<PrivateRoute><IndividualJob /></PrivateRoute>} ></Route>
				<Route path="/candidate/job/view/:jodId" element={<PrivateRoute><IndividualJobCandidate /></PrivateRoute>} ></Route>
				<Route path="/candidate/JobList" element={<PrivateRoute>< C_JobList/></PrivateRoute>} ></Route>
				<Route path="/scheduleInterview" element={<PrivateRoute><ScheduleInterview /></PrivateRoute>} ></Route>
				<Route path="/addJobHMandInterviewer" element={<PrivateRoute><AddJobHMandInterviewers/></PrivateRoute>} ></Route>

			</Routes>
		</BrowserRouter>
	)
}

export default App;
