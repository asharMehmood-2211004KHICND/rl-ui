import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import JobView from "../../JobView/JobView";
import swal from "sweetalert";
import { Button } from "@mui/material";
import styled from "../../JobView/jobview.module.css";

const BaseURL = process.env.REACT_APP_API_URL1;

function IndividualJobCandidate() {
  const params = useParams();
  const { state } = useLocation();
  const [data, setData] = useState(state);

  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState("Apply");
  const [buttonDisable, setButtonDisable] = useState(false);

  useEffect(() => {
    if (!data) {
      fetch(
        `${BaseURL}/job/detail/${params.jodId}`,
        // `http://localhost:5000/job/post`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
        {
          mode: "cors",
        }
      )
        .then((response) => {
          if (!(response.status >= 200 && response.status < 300)) {
            throw new Error(response.status);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setData(data);
        })
        .catch((err) => {
          if (err.Error > 400) {
            swal({
              title: "Server Down",
              icon: "error",
            });
          } else if (err.Error > 299) {
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
  }, []);

  const handleApply = () => {
    fetch(
      `${BaseURL}/apply/job/${data?.id}/candidate/${sessionStorage.getItem(
        "user_id"
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
      {
        mode: "cors",
      }
    )
      .then((response) => {
        if (!(response.status >= 200 && response.status < 300)) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((response) => {
        swal({
          title: `${response.message}`,
          icon: "success",
        });
        // return response.json();
        navigate("/candidate/JobList");
      })
      .catch((err) => {
        if (err.Error > 400) {
          swal({
            title: "Server Down",
            icon: "error",
          });
        } else if (err.Error > 299) {
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
        setButtonText("Apply");
        setButtonDisable(false);
      });
  };

  return (
    // <div>IndividualJob</div>
    <div className={styled.individualParentDiv}>
      <JobView
        id={data?.id}
        title={data?.title}
        jobDescription={data?.description}
        department={data?.departments.departmentName}
        responsibilities={data?.responsibilities}
        education={data?.educations.map((res) => res.educationName)}
        employements={data?.jobTypes.map((res) => res.jobTypeName)}
        softskills={data?.softSkills.map((res) => res.softSkillName)}
        technicalskills={data?.technicalSkills.map(
          (res) => res.technicalSkillName
        )}
        benefits={data?.benefits.map((res) => res.benefitsName)}
        location={data?.locations.locationName}
        experience={data?.experienceLevel}
        vacancies={data?.vacancyCount}
        gender={data?.gender}
        travelling={data?.traveling}
        closingdate={data?.closeDate.substring(0, 10)}
      >
        <div className={styled.herosec}>
          <h1 >Job View</h1>
          <Button variant="contained" onClick={handleApply} disabled={buttonDisable} className={styled.viewBtn}>
            {buttonText}
          </Button>
        </div>
      </JobView>
    </div>
  );
}

export default IndividualJobCandidate;
