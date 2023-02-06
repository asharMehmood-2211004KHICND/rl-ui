import { useState } from 'react';
import './App.css';
import TopBar from './Components/Header/TopBar';
import Home from './Components/Pages/Home/Home';
import SignupSignin from './Components/Pages/Login/SignupSignin';
import ErrorPage from './Components/Pages/Error/ErrorPage';
import SideBar from './Components/SideBar/SideBar';
import CandidatePersonalInfo from './Components/Pages/profile/CandidatePersonalInfo/CandidatePersonalInfo'
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


function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<SignupSignin />} path="/login" />
			</Routes>


			
			<div className="App">
				<TopBar />
				<div className="containerz">
					<SideBar />
					<div className="pages">
						<Routes>
							<Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} ></Route>
							<Route path="/Dashboard" element={<PrivateRoute><Home /></PrivateRoute>} ></Route>
							<Route path="/Home" element={<PrivateRoute><Home /></PrivateRoute>} ></Route>
							<Route path="/profile" element={<PrivateRoute><CandidatePersonalInfo /></PrivateRoute>} ></Route>
							<Route path="/createJob" element={<PrivateRoute><CreateJobPage /></PrivateRoute>} ></Route>
							<Route path="/job/all" element={<PrivateRoute><JobsList /></PrivateRoute>} ></Route>
            				<Route path="/job/detail/:jodId" element={<IndividualJob/>}/>
            				<Route path="/job/edit/:jodId" element={<UpdateJobPage/>}/>
						</Routes>
						{/* <Route element={<About />} path="/about" /> */}
					</div>
				</div>
			</div>
			


		</BrowserRouter>

	)
}

export default App;
