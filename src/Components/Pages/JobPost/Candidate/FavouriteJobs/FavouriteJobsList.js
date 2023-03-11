import React from 'react'
import { useEffect } from 'react';

export const FavouriteJobsList = ({favouritesJobs,setFavoriteJobs}) => {
    const user_id= sessionStorage.getItem("user_id") 


    useEffect(() => {
        fetch(`http://localhost:5000/favourites/${user_id}`)
          .then((response) => response.json())
          .then((data) => {setFavoriteJobs(data)
        
            // console.log("response ok ok",favouritesJobs)
        });
          
      }, []);

    
      return (
        <div>
          <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Favorite Jobs</h1>
          {favouritesJobs.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {favouritesJobs.map((job) => (
                <li key={job.id} style={{ marginBottom: '8px' ,border: '1px solid #ccc', borderRadius: '4px', padding: '8px'}}>
                  <p style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}> Job Title:  {job.title}</p>
                  <p style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}> Company Name:  {job.companyName}</p>
                  {/* <p style={{ fontSize: '12px', margin: 0 }}> Traveling:  {job.traveling}</p> */}
                  <p style={{ fontSize: '12px', fontWeight: 'bold', color:'red', margin: 0 }}> Deadline:  {job.closeDate.substring(0, 10)}</p>


                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#777', margin: 0 }}>No favorite jobs yet.</p>
          )}
        </div>
      );
}
