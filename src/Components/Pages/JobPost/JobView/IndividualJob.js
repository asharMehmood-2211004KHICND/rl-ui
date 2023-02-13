import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import JobView from './JobView';
import swal from "sweetalert";
import AppliedCandidates from './AppliedCandidates';

const BaseURL = process.env.REACT_APP_API_URL1;


function IndividualJob() {

    const params = useParams();
    const {state} = useLocation();
    const [data, setData] = useState(state);

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
  <>
    {/* // <div>IndividualJob</div> */}
    <JobView 
      title={data?.title}
      jobDescription={data?.description}
      department={data?.department }
      responsibilities={data?.responsibilitiess?.map(res=>res.responsibility)}
      education={data?.educations.map(res=>res.education)}
      employement={data?.employementCategory}
      softskills={data?.softSkills.map(res=>res.softSkill)}
      technicalskills={data?.technicalSkills.map(res=>res.technicalSkill)}
      benefits={data?.benefitPerkss.map(res=>res.benefitPerks)}
      location={data?.location}
      experience={data?.experienceLevel}
      vacancies={data?.vacancyCount}
      gender={data?.gender}
      travelling={data?.traveling}
      closingdate={data?.closeDate.substring(0, 10)}
    />
    <AppliedCandidates JobData={data}/>

  </>  
  )
}

export default IndividualJob


