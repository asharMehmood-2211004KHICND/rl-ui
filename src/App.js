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
import CandidateSkillsInfo from './Components/Pages/profile/CandidateSkillsInfo/CandidateSkillsInfo'
import ViewCandidateProfileInfo from './Components/Pages/ViewCandidateProfileInfo/ViewCandidateProfileInfo';
import MyProfile from './Components/Pages/MyProfile/MyProfile';
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
import CandidateAppliedJobs from './Components/Pages/CandidateAppliedJobs/CandidateAppliedJobs';
import CandidateInterviewSchedule from './Components/Pages/CandidateInterviewSchedule/CandidateInterviewSchedule';
import InterviewerInterviewSchedule from './Components/Pages/InterviewerInterviewSchedule/InterviewerInterviewSchedule';
import CandidateFeedback from './Components/Pages/CandidateFeedback/CandidateFeedback'
import InterviewerFeedback from './Components/Pages/InterviewerFeedback/InterviewerFeedback'
import Degree from './Components/Pages/JobPost/DropDownComponents/Degree';
import Department from './Components/Pages/JobPost/DropDownComponents/Department';
import TechnicalSkill from './Components/Pages/JobPost/DropDownComponents/TechnicalSkill';
import SoftSkill from './Components/Pages/JobPost/DropDownComponents/SoftSkill';
import Benefit from './Components/Pages/JobPost/DropDownComponents/Benefit';
import JobType from './Components/Pages/JobPost/DropDownComponents/JobType';
import Location from './Components/Pages/JobPost/DropDownComponents/Location';
import Perks from './Components/Pages/JobPost/DropDownComponents/Perks';
import CandidateUsers from './Components/Pages/Users/CandidateUsers';
import StaffUsers from './Components/Pages/Users/StaffUsers';
import Interviews from './Components/Pages/Interviews/Interviews';
import { TopAndSideBar } from './Components/TopSideBar/TopAndSideBar';



function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<SignupSignin />} path="/login" />
				<Route element={<VerificationEmail/>} path="/forgetpassword" />
				<Route element={<ForgetRoute><ForgetPassword/></ForgetRoute>} path="/resetpassword" />
			</Routes>
			<Routes>
				<Route path="/" 									element={<PrivateRoute children={Home}	  />} />
				<Route path="/Dashboard" 							element={<PrivateRoute children={Home}    />} />
				<Route path="/Home" 								element={<PrivateRoute children={Home}    />} />
				<Route path="/profile" 								element={<PrivateRoute children={CandidatePersonalInfo} />} />
				<Route path="/academic-details" 					element={<PrivateRoute children={CandidateAcademicInfo}/>} />
				<Route path="/work-experience" 						element={<PrivateRoute children={CandidateWorkInfo}/> } />
				<Route path="/skills" 								element={<PrivateRoute children={CandidateSkillsInfo}/>} />
				<Route path="/createStaff" 							element={<PrivateRoute children={CreateStaff} />}/>
				<Route path="/createJob" 							element={<PrivateRoute children={CreateJobPage} />} />
				<Route path="/job/all" 								element={<PrivateRoute children={JobsList} />} />
				<Route path="/job/update" 							element={<PrivateRoute children={UpdateJobPage}/>  } />
				<Route path="/job/view/:jodId" 						element={<PrivateRoute children={IndividualJob} />} />
				<Route path="/candidate/job/view/:jodId" 			element={<PrivateRoute children={IndividualJobCandidate} />} />
				<Route path="/candidate/JobList" 					element={<PrivateRoute children={C_JobList}/>} />
				<Route path="/scheduleInterview" 					element={<PrivateRoute children={ScheduleInterview} />} />
				<Route path="/addJobHMandInterviewer" 				element={<PrivateRoute children={AddJobHMandInterviewers} />} />
				<Route path="/view-profile" 						element={<PrivateRoute children={ViewCandidateProfileInfo}/>} />
				<Route path="/my-profile" 							element={<PrivateRoute children={MyProfile} /> } />
				<Route path="/my-interview-schedule" 				element={<PrivateRoute children={CandidateInterviewSchedule}/> } />
				<Route path="/interview-schedule" 					element={<PrivateRoute children={InterviewerInterviewSchedule}/> } />
				<Route path="/my-applications" 						element={<PrivateRoute children={CandidateAppliedJobs}/> } />
				<Route path='/candidate-feedback/:interviewId'		element={<PrivateRoute children={CandidateFeedback}/> } />
				<Route path='/interviewer-feedback/:interviewId'	element={<PrivateRoute children={InterviewerFeedback}/> } />
				<Route path='/admin/education' 						element={<PrivateRoute children={Degree} />} />
				<Route path='/admin/department' 					element={<PrivateRoute children={Department} /> } />
				<Route path='/admin/t-skill' 						element={<PrivateRoute children={TechnicalSkill}/> } />
				<Route path='/admin/s-skill' 						element={<PrivateRoute children={SoftSkill}/> } />
				<Route path='/admin/benefit' 						element={<PrivateRoute children={Benefit }/>  } />
				<Route path='/admin/jobType' 						element={<PrivateRoute children={JobType }/>} />
				<Route path='/admin/location' 						element={<PrivateRoute children={Location }/>} />
				<Route path='/admin/perks' 							element={<PrivateRoute children={Perks}/>} />
				<Route path='/users/candidates/:value' 				element={<PrivateRoute children={CandidateUsers}/>} />
				<Route path='/users/staff' 							element={<PrivateRoute children={StaffUsers}/>} />
				<Route path='/interviews' 							element={<PrivateRoute children={Interviews}/>} />
			</Routes>
		</BrowserRouter>
	)
}

export default App;
