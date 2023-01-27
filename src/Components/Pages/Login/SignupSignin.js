import React, { useState } from "react";
import logo from './img/logo.svg';
import logo2 from './img/register.svg';
import mainlogo from './img/logo_5.png';
import signin from './img/signin.svg';
import signup from './img/signup.svg';
import './css/signupandsignin.css';
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

//import { useLinkedIn } from 'react-linkedin-login-oauth2';




function SignupSignin() {

	const navigate = useNavigate();

	const [first_name, setFirst_name] = useState('');
	const [last_name, setLast_name] = useState('');
	const [email, setEmail] = useState('');
	const [login_email, setLoginEmail] = useState('');
	const [password, setPassword] = useState('');
	const [login_password, setLoginPassword] = useState('');
	const [errors, setErrors] = useState({});


	const validate = (values) => {
		let errors = {};
		if (!values.email) {
			errors.email = "Email address is required";
		} else if (!/\S+@\S+\.\S+/.test(values.email)) {
			errors.email = "Email address is invalid";
		} else if (/^\d/.test(values.email)) {
			errors.email = "Email should not contain number in start";
		}
		if (!values.password) {
			errors.password = "Password is required";
		} else if (values.password.length < 8) {
			errors.password = "Password must be 8 or more characters";
		} else if (!/\d/.test(values.password)) {
			errors.password = "Password must contain atleast 1 number";
		} else if (!/[!@#$%&?]/g.test(values.password)) {
			errors.password = "Password must contain atleast 1 special character";
		} else if (!/[A-Z]/g.test(values.password)) {
			errors.password = "Password must contain atleast 1 capital letter";
		}
		if (!values.first_name) {
			errors.first_name = "First Name is required";
		}
		else if (/[!@#$%&?]/g.test(values.first_name) || /\d/.test(values.first_name)) {
			errors.first_name = "First Name should not contain numbers or any special character";
		}
		if (values.last_name) {
			if (/[!@#$%&?]/g.test(values.last_name) || /\d/.test(values.last_name)) {
				errors.last_name = "Last Name should not contain numbers or any special character";
			}
		}
		return errors;
	}

	const validateLogin = (values) => {
		let errors = {};
		if (!values.login_email) {
			errors.login_email = "Email address is required";
		}
		if (!values.login_password) {
			errors.login_password = "Password is required";
		}
		return errors;
	}
	//This code for linkedin

	// const { linkedInLogin } = useLinkedIn({
	//   clientId: '775lxvvy64z4lo',
	//   redirectUri: `${window.location.origin}/linkedin`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
	//   onSuccess: (code) => {
	//     console.log(code);
	//   },
	//   onError: (error) => {
	//     console.log(error);
	//   },
	// });


	const handleSubmit = (event) => {
		event.preventDefault();
		const errors = validateLogin({ login_email, login_password });
		setErrors(errors);
		if (Object.keys(errors).length === 0) {
			//Local API Call Login
			const data = {
				email: login_email,
				password: login_password
			}
			//fetch("http://34.204.50.31:8080/auth/login", {
			fetch("http://54.227.72.189:8080/auth/login", {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}).then((response) => {
				if (response.status == 200) {
					sessionStorage.clear();
					response.json().then(function (result) {

						sessionStorage.setItem("user_id", result.id);
						sessionStorage.setItem('user_email', result.email);
						sessionStorage.setItem('user_firstname', result.first_name);
						sessionStorage.setItem('user_lastname', result.last_name);
						sessionStorage.setItem('user_roleid', result.role.id);
						sessionStorage.setItem('user_rolename', result.role.name);
						navigate('/Dashboard');
					});
					


					setLoginEmail('');
					setLoginPassword('');
				}
				else if (response.status == 403) {
					swal({
						title: "Invalid Email or Password!",
						icon: "error",

					});
				}
			}
			);
			//Local API Call Login


			/**
			 * Live API call - Abdul Wasey
			 */
			// const data = {
			// 	username: login_email,
			// 	password: login_password
			// }
			// fetch("http://100.25.33.0:8080/auth-api/login", {
			// 	method: 'POST',
			// 	body: JSON.stringify(data),
			// 	headers: {
			// 		'Content-type': 'application/json; charset=UTF-8',
			// 	},
			// }).then((response) => {
			// 	if (response.status == 200) {
			// 		sessionStorage.clear();
			// 		response.json().then(function (result) {

			// 			if (result.message) {
			// 				swal("Invalid Email or Password!");
			// 			}
			// 			else {
			// 				sessionStorage.setItem("user_id", result.id);
			// 				sessionStorage.setItem('user_email', result.email);
			// 				//sessionStorage.setItem('user_firstname', result.first_name);
			// 				//sessionStorage.setItem('user_lastname', result.last_name);
			// 				//sessionStorage.setItem('user_roleid', result.role.id);
			// 				//sessionStorage.setItem('user_rolename', result.role.name);
			// 				window.location.assign('/Dashboard');
			// 			}

			// 		});


			// 		setLoginEmail('');
			// 		setLoginPassword('');
			// 	}
			// 	else if (response.status == 404) {
			// 		swal("Invalid Email or Password!");
			// 	}
			// }
			// );
			/**
		 * Live API call - Abdul Wasey
		 */
		}
	}

	const handleSignupSubmit = (event) => {
		event.preventDefault();
		const errors = validate({ email, password, first_name, last_name });
		setErrors(errors);
		if (Object.keys(errors).length === 0) {

			/** Registration API Live Hunain*/
			const data = {
				first_name: first_name,
				last_name: last_name,
				email: email,
				password: password,
				role: {
					id: 1
				}
			}
			//fetch("http://34.204.50.31:8080/auth/register", {
			fetch("http://54.227.72.189:8080/auth/register", {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}).then((response) => {
				if (response.status == 200) {
					swal({
						title: "Thanks For Registration!",
						icon: "success",
						buttons: {
							confirm: { text: 'Login', className: 'btn' },
						},
					});
					setFirst_name('');
					setLast_name('');
					setEmail('');
					setPassword('');
					changeSignupMode('');
				}
				else if (response.status == 409) {
					swal(
						{
							title: "This Email Already Registered!",
							icon: "warning",
						});
				}
				else if (response.status == 404) {
					swal({
						title: "Server Not Responding!",
						icon: "error",
					}
					);
				}
			}
			);
			/** Registration API Live Hunain*/

			/** Registration API LIve abdul wasey */
			// 	const data = {
			// 		fullname: first_name + ' ' + last_name,
			// 		email: email,
			// 		username: email,
			// 		password: password
			// 	}
			// 	fetch("http://100.25.33.0:8080/auth-api/register", {
			// 		method: 'POST',
			// 		body: JSON.stringify(data),
			// 		headers: {
			// 			'Content-type': 'application/json; charset=UTF-8',
			// 		},
			// 	}).then((response) => {
			// 		if (response.status == 200) {

			// 			response.json().then(function (result) {

			// 				if (result.message == "Account Created Successfully") {
			// 					swal({
			// 						title: "Thanks For Registration!",
			// 						icon: "success",
			// 						buttons: {
			// 							confirm: { text: 'Login', className: 'btn' },
			// 						},
			// 					});
			// 					setFirst_name('');
			// 					setLast_name('');
			// 					setEmail('');
			// 					setPassword('');
			// 					changeSignupMode('');
			// 				}
			// 				else {
			// 					swal({
			// 						title: result.message,
			// 						icon: "info"
			// 					});
			// 				}
			// 			});

			// 		}	
			// }
			// );

			/** Registration API LIve abdul wasey */


		}
	}
	const [signupmode, changeSignupMode] = useState('');
	const containerClass = 'container ' + signupmode;
	const ChangeToSignupMode = () => {
		changeSignupMode('sign-up-mode');
	}

	const ChangeToSignInMode = () => {
		changeSignupMode('');
	}
	return (
		<>
			<div className={containerClass}>
				<div className="forms-container">
					<div className="signin-signup">
						<form action="#" className="formLogin sign-in-form" onSubmit={handleSubmit}>
							<h2 className="title">Sign in</h2>
							<div className="input-field">
								<i className="fa-solid fa-user"></i>
								<input
									type="text"
									value={login_email}
									onChange={(e) => setLoginEmail(e.target.value)}
									placeholder="Email" />
							</div>
							{errors.login_email && <p className="error">{errors.login_email}</p>}
							<div className="input-field">
								<i className="fas fa-lock"></i>
								<input
									type="password"
									value={login_password}
									onChange={(e) => setLoginPassword(e.target.value)}
									placeholder="Password" />
							</div>
							{errors.login_password && <p className="error">{errors.login_password}</p>}
							<div>
								<a href="/forgetpassword">Forget Password?</a>
							</div>
							<input type="submit" value="Login" className="btn solid" />
							<p className="social-text">Or Sign in with social platforms</p>
							<div className="social_icons">
								<a href="#"><i className="fa-brands fa-linkedin"></i></a>
								<a href="#"><i className="fa-brands fa-microsoft"></i></a>
								<a href="#"><i className="fa-brands fa-google"></i></a>
							</div>

						</form>
						<form action="#" className="formLogin sign-up-form" onSubmit={handleSignupSubmit}>
							<h2 className="title">Sign up</h2>
							<div className="input-field">
								<i className="fas fa-user"></i>
								<input type="text" value={first_name} onChange={(e) => setFirst_name(e.target.value)} placeholder="First Name" />
							</div>
							{errors.first_name && <p className="error">{errors.first_name}</p>}
							<div className="input-field">
								<i className="fas fa-user"></i>
								<input type="text" value={last_name} onChange={(e) => setLast_name(e.target.value)} placeholder="Last Name" />
							</div>
							{errors.last_name && <p className="error">{errors.last_name}</p>}
							<div className="input-field">
								<i className="fas fa-envelope"></i>
								<input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
							</div>
							{errors.email && <p className="error">{errors.email}</p>}
							<div className="input-field">
								<i className="fas fa-lock"></i>
								<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
							</div>
							{errors.password && <p className="error">{errors.password}</p>}
							<input type="submit" className="btn" value="Sign up" />
							<p className="social-text">Or Sign up with social platforms</p>
							<div className="social_icons">
								<a href="#"><i className="fa-brands fa-linkedin"></i></a>
								<a href="#"><i className="fa-brands fa-microsoft"></i></a>
								<a href="#"><i className="fa-brands fa-google"></i></a>
							</div>

						</form>
					</div>
				</div>

				<div className="panels-container">
					<div className="panel left-panel">
						<div className="content">
							<div className="mainlogo"><img src={mainlogo}></img></div>
							<h3>New here ?</h3>
							<p>

							</p>
							<button className="btn transparent" onClick={ChangeToSignupMode}>
								Sign up
							</button>
						</div>
						<img id="signin" src={signin} className="image" alt="" />
					</div>
					<div className="panel right-panel">
						<div className="content">
							<div className="mainlogo"><img src={mainlogo}></img></div>
							<h3>One of us ?</h3>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
								laboriosam ad deleniti.
							</p>
							<button className="btn transparent" id="sign-in-btn" onClick={ChangeToSignInMode}>
								Sign in
							</button>
						</div>
						<img id="signup" src={signup} className="image" alt="" />
					</div>
				</div>
			</div>
		</>
	)

}
export default SignupSignin;
