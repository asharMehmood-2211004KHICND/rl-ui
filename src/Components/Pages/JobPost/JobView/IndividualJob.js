import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import JobView from './JobView';
import swal from "sweetalert";
import AppliedCandidates from './AppliedCandidates';
import styled from "./jobview.module.css";
import auth from '../../../Hook/auth';

const BaseURL = process.env.REACT_APP_API_URL1;


function IndividualJob() {

    const params = useParams();
    const {state} = useLocation();
    const [data, setData] = useState(state);

    console.log(data);
    useEffect(() => {  
      if(!data){
      fetch(
        `${BaseURL}/job/detail/`+params.jodId,
        // `http://localhost:5000/job/post`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        },
        {
          mode: "cors",
        }
      )
        .then((response) =>{
          if(!(response.status>=200 && response.status<300) ){
            throw new Error(response.status);
          }  
          return response.json()
        })
        .then((data) => {
          console.log(data)
          setData(data);
        })
        .catch((err) => {
          if(err.Error>400){
            swal(
              {
                title: "Server Down",
                icon: "error",
              });
          }
          else if(err.Error>299){
            swal({
              title: "Server Busy",
              icon: "error",
            });
          }
          // else{
          //   console.log("fdkmfk" +type(err.Error));
          //   swal({
          //     title: "Job posted sucessfully!",
          //     icon: "success",
          // });
          // }
        });
      }

    }
    , [])

  return (
  <div className={styled.individualParentDiv}>
    {/* // <div>IndividualJob</div> */}
    <JobView 
      title={data?.title}
      jobDescription={data?.description}
      department={data?.departments.departmentName}
      responsibilities={data?.responsibilities}
      education={data?.educations.map(res=>res.educationName)}
      employements={data?.jobTypes.map(res=>res.jobTypeName)}
      softskills={data?.softSkills.map(res=>res.softSkillName)}
      technicalskills={data?.technicalSkills.map(res=>res.technicalSkillName)}
      benefits={data?.benefits.map(res=>res.benefitsName)}
      location={data?.locations.locationName}
      experience={data?.experienceLevel}
      vacancies={data?.vacancyCount}
      gender={data?.gender}
      travelling={data?.traveling}
      closingdate={data?.closeDate.substring(0, 10)}
    >
      <div>
        <h1 style={{textAlign:"center"}} >Job View</h1>
      </div>

    </JobView>
    <AppliedCandidates JobData={data}/>

  </div>  
  )
}  

export default IndividualJob


