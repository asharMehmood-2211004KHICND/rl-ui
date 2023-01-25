import React from 'react'
import { useRouteError } from "react-router-dom";
import mainlogo from '../../images/logo_5.png';
import './ErrorPage.css'

export default function ErrorPage() {


	function goBack() {
		window.history.back();
	}

	return (
		
		<div id="error-page" className='error-page'>		
		<img className='error-image' src={mainlogo} />	
			<h1 className='error-heading'>Oops!</h1>
			<p className='error-message'>Sorry, an unexpected error has occurred.</p>



			{/* <span onClick={goBack} className="btn-darkblue">btn-primary</span>
			<span onClick={goBack} className="btn-lightblue">btn-secondary</span>
			<span onClick={goBack} className="btn-success">btn-success</span>
			<span onClick={goBack} className="btn-danger">btn-danger</span> */}
		</div>
	);

}
