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

import CreateJobPage from './Components/Pages/JobPost/PostJob/CreateJobPage.js';
import VerificationEmail from './Components/Pages/Login/VerificationEmail';
import UpdateJobPage from './Components/Pages/JobPost/PostJob/UpdateJobPage.js';
import PrivateRoute from './Components/PrivateRoute';
import JobsList from './Components/Pages/JobPost/JobList/JobList';
import IndividualJob from './Components/Pages/JobPost/JobList/JobView/IndividualJob';


function App() {

	const [token, setToken] = useState();

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
							<Route path="/updateJob" element={<PrivateRoute><UpdateJobPage /></PrivateRoute>} ></Route>
							<Route path="/job/all" element={<PrivateRoute><JobsList /></PrivateRoute>} ></Route>
            				<Route path="/job/detail/:jodId" element={<IndividualJob/>}/>
						</Routes>
						{/* <Route element={<About />} path="/about" /> */}
					</div>
				</div>
			</div>
			


		</BrowserRouter>

	)
	/*
	if (sessionStorage.getItem('user_id') == null) {

		return (
			<>
				<BrowserRouter>
					<Routes>
						<Route exact path="*" element={<ErrorPage />} ></Route>
						<Route path="/" element={<SignupSignin />} ></Route>
						<Route path="/Dashboard" element={<SignupSignin />} ></Route>
						<Route path="/forgetpassword" element={<VerificationEmail/>} ></Route>
						<Route path="/createJob" element={< SignupSignin />} ></Route>
					</Routes>
				</BrowserRouter>
			</>
		)
	}
	else {
		return (
			<div className="App">
				<TopBar />
				<div className="containerz">
					<SideBar />
					<div className="pages">
						<BrowserRouter>
							<Routes>
								<Route exact path="*" element={<ErrorPage />} ></Route>
								<Route path="/" element={<Home />} ></Route>
								<Route path="/Dashboard" element={<Home />} ></Route>
								<Route path="/Home" element={<Home />} ></Route>
								<Route path="/profile" element={<CandidatePersonalInfo />} ></Route>
								<Route path="/createJob" element={< CreateJobPage />} ></Route>	
								<Route path="/updateJob" element={< UpdateJobPage />} ></Route>
							</Routes>
						</BrowserRouter>

					</div>
				</div>
			</div>
		);
	}
	*/
}

export default App;
