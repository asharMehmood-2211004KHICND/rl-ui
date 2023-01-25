import { useState } from 'react';
import './App.css';
import TopBar from './Components/Header/TopBar';
import Home from './Components/Pages/Home/Home';
import SignupSignin from './Components/Pages/Login/SignupSignin';
import ErrorPage from './Components/Pages/Error/ErrorPage';
import SideBar from './Components/SideBar/SideBar';
import {
	BrowserRouter,
	Routes,
	Route
} from "react-router-dom";


function App() {

	const [token, setToken] = useState();

	if (sessionStorage.getItem('user_id') == null) {
		return <SignupSignin />
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
							</Routes>

						</BrowserRouter>

					</div>
				</div>
			</div>
		);
	}
}

export default App;
