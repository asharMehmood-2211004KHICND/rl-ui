import React from 'react'
import './Home.css'

export default function Home() {

  console.log((sessionStorage.getItem("data")));

  return (
    <div>
      <h1 className='mainHeading'>Home Page</h1>
      <div className='Maincontent'>Content will go here</div>
    </div>
  )
}
