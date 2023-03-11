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
           {console.log("response ok ok",favouritesJobs)} 
          <h1>Favorite Jobs</h1>
          {favouritesJobs.length > 0 ? (
            <ul>
              {favouritesJobs.map((job) => (
                <li key={job.id}>
                  <p>Job Title: {job.title}</p>
                  {/* <p>Company: {job.company}</p> */}
                  {/* <p>Location: {job.location}</p> */}
                </li>
              ))}
            </ul>
          ) : (
            <p>No favorite jobs yet.</p>
          )}
        </div>
      );
}
