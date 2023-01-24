import React from 'react'
import { useRouteError } from "react-router-dom";
import './ErrorPage.css'

export default function ErrorPage() {


  function goBack(){
    window.history.back();
  }

  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
        <p onClick={goBack} className="btn-danger">Go Back</p>
      </p>
    </div>
  );
  
}
