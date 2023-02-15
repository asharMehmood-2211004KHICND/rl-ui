import React from 'react'
import './Home.css'

export default function Home() {

  console.log((sessionStorage.getItem("data")));

  return (
    <div>
      <div className='hcards'>
        <div className='card'>
          <p className='cardtitle'>Openings</p>
          <h2 className='cardcount'>22</h2>
          <p className='carddetails'>Details</p>
        </div>
        <div className='card'>
          <p className='cardtitle'>Openings</p>
          <h2 className='cardcount'>22</h2>
          <p className='carddetails'>Details...</p>
        </div>
      </div>
    </div>
  )
}
