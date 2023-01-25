import React from 'react'
import { useRouteError } from "react-router-dom";
import './ErrorPage.css'

export default function ErrorPage() {


	function goBack() {
		window.history.back();
	}

	return (
		
		<div id="error-page" className='error-page'>			
			<h1 className='error-heading'>Oops!</h1>
			<p className='error-message'>Sorry, an unexpected error has occurred.</p>

<img className='error-image' src='https://static.vecteezy.com/system/resources/thumbnails/009/369/008/small/3d-rendering-yellow-warning-icon-isolated-free-png.png' />

			{/* <span onClick={goBack} className="btn-darkblue">btn-primary</span>
			<span onClick={goBack} className="btn-lightblue">btn-secondary</span>
			<span onClick={goBack} className="btn-success">btn-success</span>
			<span onClick={goBack} className="btn-danger">btn-danger</span> */}
		</div>
	);

}
