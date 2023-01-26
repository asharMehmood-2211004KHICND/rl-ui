import { useState } from 'react';
import './App.css';
import TopBar from './Components/Header/TopBar';
import Home from './Components/Pages/Home/Home';
import SignupSignin from './Components/Pages/Login/SignupSignin';
import ForgetPassword from './Components/Pages/Login/ForgetPassword';
import ErrorPage from './Components/Pages/Error/ErrorPage';
import SideBar from './Components/SideBar/SideBar';
import CandidatePersonalInfo from './Components/Pages/profile/CandidatePersonalInfo/CandidatePersonalInfo'
import {
	BrowserRouter,
	Routes,
	Route
} from "react-router-dom";

import CreateJobPage from './Components/Pages/JobPost/PostJob/CreateJobPage.js';


function App() {

	const [token, setToken] = useState();

	if (sessionStorage.getItem('user_id') == null) {

		return (
			<>
				<BrowserRouter>
					<Routes>
						<Route exact path="*" element={<ErrorPage />} ></Route>
						<Route path="/" element={<SignupSignin />} ></Route>
						<Route path="/Dashboard" element={<SignupSignin />} ></Route>
						<Route path="/forgetpassword" element={<ForgetPassword />} ></Route>
						<Route path="/createJob" element={< CreateJobPage />} ></Route>
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
							</Routes>
						</BrowserRouter>

					</div>
				</div>
			</div>
		);
	}
}

export default App;
