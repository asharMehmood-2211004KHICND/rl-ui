import React, { useState } from "react";
import { Calander } from "../components/Calander";

import { MultiSelectDropDown } from "../components/MultiSelectDropDown";
import { SimpleDropDown } from "../components/SimpleDropDown";
import { Textfeild } from "../components/Textfeild";
import styled from "./CreateJobPage.module.css";
import { useNavigate } from "react-router-dom";
import env from "react-dotenv";
import swal from "sweetalert";
import { type } from "@testing-library/user-event/dist/type";
import { useLocation, useParams } from "react-router-dom";

const UpdateJobPage = () => {
  const navigate = useNavigate();

  const params = useParams();
  const {state} = useLocation();
  // console.log(state)
  const [data, setData] = useState(state);

  const [jobTitle, setJobTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [department, setDepartment] = useState(data.department); // for single drop down
  const [degrees, setDegrees] = useState(data.educations.map(data=>data.education));
  //data problem
  // const [employmentCategories, setEmploymentCategories] = useState(data.employementCategory);

  const [employmentCategories, setEmploymentCategories] = useState(["Full Time","Part Time"]);

  const [genders, setGenders] = useState(data.gender); // for single drop down
  const [location, setLocation] = useState(data.location ); // for single drop down
  const [softskills, setSoftskills] = useState(data.softSkills.map(data=>data.softSkill));
  const [technicalskills, setTechnicalskills] = useState(data.technicalSkills.map(data=>data.technicalSkill));
  const [experienceLevel, setExperienceLevel] = useState(data.experienceLevel); // for single drop down
  const [perksAndBenefits, setPerksAndBenefits] = useState(data.benefitPerkss.map(data=>data.benefitPerks));
  const [travelling, setTravelling] = useState(data.traveling); // for single drop down
  const [vacancies, setVacancies] = useState(data.vacancyCount);
  const [closingDate, setClosingDate] = useState(new Date(data.closeDate));
  const [selectedResponsibilites, setSelectedResponsibilities] = useState(data.responsibilitiess.map(data=>data.responsibility));
  const [buttonDisable, setButtonDisable] = useState(false);
  const [buttonText, setButtonText] = useState("UPDATE")

  const experienceLevelOptionsValue = ["1 Year", "2 Year", "3 Year", "4 Year", "5 Year"];
  const experienceLevelOptions = [1,2,3,4,5];
  const genderOptions = ["Male", "Female", "Anyone"];
  const travellingOptions = ["Yes", "No", "MayBe "];


  let responsibilityOptions = [
    "Contribute in all phases of the development lifecycle",
    "Write well designed, testable, efficient code",
    "Ensure designs are in compliance with specifications",
  ];

  let departmentOptions = ["Cloud Engineering", "Data Engineering"];

  let degreeOptions = ["BE", "BS","MS"];

  let employmentCategoriesOptions = [
    "Part Time",
    "Full Time",
    "Contract Base",
    "Remote",
    "Onsite",
    "Internship"
  ];

  let softSkillsOptions = ["Java", "JUnit", "SQL", "React.JS"];

  let technicalskillsOptions = ["technical Skill A", "technical Skill B"];

  let benefitsAndPerksOptions = ["benefit A", "benefit B", "benefit C"];

  let locationOptions = ["Karachi", "Lahore", "Islamabad"];

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(degrees.length)
    console.log( employmentCategories.length)
    console.log( softskills.length)
    console.log( technicalskills.length)
    console.log( selectedResponsibilites.length)
    console.log( experienceLevel.length) 
    console.log(perksAndBenefits.length  )
    setButtonText("Loading...");
    setButtonDisable(true);
    if (
      !degrees.length ||
      !employmentCategories.length ||
      !softskills.length ||
      !technicalskills.length ||
      !selectedResponsibilites.length ||
      !perksAndBenefits.length ||
      !experienceLevel
    ) {

      console.log(degrees)
      // alert("Please fill out all the required fields");
      swal({
        
        title: "Please fill out all the required fields",
        icon: "error",
      });
      setButtonText("SUBMIT");
      setButtonDisable(false);

      return;
    }

    const dataResponse = {

      title: jobTitle,
      department: department,
      employementCategory: employmentCategories, // ["FULL_TIME","ONLINE"],
      gender: genders, //["MALE","FEMALE"],
      traveling: travelling,
      location: location,
      softSkills: softskills ,
      technicalSkills: technicalskills,
      closeDate: closingDate, //"2023-01-30"
      description: description,
      responsibilitiess: selectedResponsibilites,
      educations: degrees,
      benefitPerkss: perksAndBenefits,
      experienceLevel: parseInt(experienceLevel),
      vacancyCount: vacancies,
    

    }

    console.log(dataResponse)

    let requestData = {
      title: jobTitle,
      department: department,
      employementCategory: employmentCategories, // ["FULL_TIME","ONLINE"],
      gender: genders, //["MALE","FEMALE"],
      traveling: travelling,
      location: location,
      softSkills: softskills.map((ss) => {
        return { softSkill: ss };
      }),
      technicalSkills: technicalskills.map((ts) => {
        return { technicalSkill: ts };
      }),
      closeDate: closingDate, //"2023-01-30"
      description: description,
      responsibilitiess: selectedResponsibilites.map((rs) => {
        return { responsibility: rs };
      }),
      educations: degrees.map((edu) => {
        return { education: edu };
      }),
      benefitPerkss: perksAndBenefits.map((pb) => {
        return { benefitPerks: pb };
      }),
      experienceLevel: parseInt(experienceLevel),
      vacancyCount: vacancies,
    };


    fetch(
      `http://jobserviceelasticservice-env.eba-nivmzfat.ap-south-1.elasticbeanstalk.com/job/update/${data.id}`,
      // `http://localhost:5000/job/post`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
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
        swal({
            title: "Job posted sucessfully!",
            icon: "success",
        });

        setButtonText("SUBMIT");
        setButtonDisable(false);

        setJobTitle("");
        setDepartment("");
        setEmploymentCategories([]);
        setGenders([]);
        setTravelling("");
        setLocation("");
        setSoftskills([]);
        setTechnicalskills([]);
        setClosingDate("");
        setDescription("");
        setSelectedResponsibilities([]);
        setDegrees([]);
        setPerksAndBenefits([]);
        setExperienceLevel(0);
        setVacancies(undefined);
        navigate('/job/all');

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
        setButtonText("SUBMIT");
        setButtonDisable(false);
      });
  };

  return (
    <div className={styled.mainContainer}>
      <div className={styled.create_job_page}>
        {" "}
        <h1 className={`${styled.heading} afnan`}>Update Job</h1>
        <div className={styled.FormCreateJob}>
          <form onSubmit={handleSubmit}>
           
            <div className={styled.enterjobtitle}>
              <h4 className={styled.heading2}>Job Title</h4>
              <Textfeild
                ChildrenTag={{ type: "text" }}
                data-testid="title-input"
                inputValue={jobTitle}
                setInputValue={setJobTitle}
                labelText="title"
                placeholderText="Enter Job Title"
              ></Textfeild>
            </div>


            {/* <div className={styled.jobdescription}>
            <h4 className={styled.heading3}>Job Description</h4>
            
            <Textfeild
            inputValue={description}
            setInputValue={setDescription}
            placeholderText="Enter Job Description"
            ></Textfeild>
          </div> */}
            <div className={styled.job_description_container}>
              <h4 className={styled.heading3}>Job Description</h4>
              <textarea
                className={styled.job_description_input}
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                placeholder="Enter Job Description"
              ></textarea>
            </div>
            <br></br>

            <div className={styled.div2}>
              <div className={styled.employmentcategory}>
                <h4 className={styled.heading4}>Employment Category</h4>

                <MultiSelectDropDown
                  fetchedOptions={employmentCategoriesOptions}
                  selected={employmentCategories}
                  setSelected={setEmploymentCategories}
                ></MultiSelectDropDown>
              </div>

              <div className={styled.responsibilities}>
                <h4 className={styled.heading5}>Responsibilities</h4>

                <MultiSelectDropDown
                  fetchedOptions={responsibilityOptions}
                  selected={selectedResponsibilites}
                  setSelected={setSelectedResponsibilities}
                ></MultiSelectDropDown>
              </div>
            </div>
            <br></br>
            <div className={styled.div3}>
              <div className={styled.education}>
                <h4 className={styled.heading6}>Education</h4>

                <MultiSelectDropDown
                  fetchedOptions={degreeOptions}
                  selected={degrees}
                  setSelected={setDegrees}
                ></MultiSelectDropDown>
              </div>

              <div className={styled.dropdown}>
                <h4 className={styled.heading4}>Department</h4>
                <SimpleDropDown
                  title="Department"
                  selectedOption={department}
                  setSelectedOption={setDepartment}
                  options={departmentOptions}
                ></SimpleDropDown>
              </div>

              {/* <div className={styled.employmentcategory}>
                <h4 className={styled.heading7}>Employment Category</h4>

                <MultiSelectDropDown
                  fetchedOptions={employmentCategoriesOptions}
                  selected={employmentCategories}
                  setSelected={setEmploymentCategories}
                ></MultiSelectDropDown>
              </div> */}
            </div>
            <br></br>
            <div className={styled.div4}>
              <div className={`${styled.softskills}`}>
                <h4 className={styled.heading8}>Soft Skills</h4>

                <MultiSelectDropDown
                  fetchedOptions={softSkillsOptions}
                  selected={softskills}
                  setSelected={setSoftskills}
                >
                  {" "}
                </MultiSelectDropDown>
              </div>

              <div className={styled.technicalskills}>
                <h4 className={styled.heading9}>Technical Skills</h4>

                <MultiSelectDropDown
                  fetchedOptions={technicalskillsOptions}
                  selected={technicalskills}
                  setSelected={setTechnicalskills}
                >
                  {" "}
                </MultiSelectDropDown>
              </div>
            </div>
            <br></br>
            <div className={styled.div5}>
              <div className={styled.perksandbenifits}>
                <h4 className={styled.heading10}>Benifits</h4>

                <MultiSelectDropDown
                  fetchedOptions={benefitsAndPerksOptions}
                  selected={perksAndBenefits}
                  setSelected={setPerksAndBenefits}
                ></MultiSelectDropDown>
              </div>
              <div className={styled.experience}>
                <h4 className={styled.heading12}>Experience</h4>

                <SimpleDropDown
                  optionLabel="Year"
                  selectedOption={experienceLevel}
                  setSelectedOption={setExperienceLevel}
                  options={experienceLevelOptions}
                  optionText={experienceLevelOptionsValue}
                ></SimpleDropDown>
              </div>
            </div>

            <br></br>

            <section className={styled.form2}>
              <div className={styled.div6}>
               <div className={styled.gender}>
                  <h4 className={styled.heading14}>Gender</h4>

                  <SimpleDropDown
                    optionLabel="Select"
                    selectedOption={genders}
                    setSelectedOption={setGenders}
                    options={genderOptions}
                  ></SimpleDropDown>
                </div>
                <div className={styled.vacancies}>
                  <h4 className={styled.heading13}>Vacancies</h4>

                  <Textfeild
                    ChildrenTag={{ type: "number", required: "htmlRequired" }}
                    inputValue={vacancies}
                    setInputValue={setVacancies}
                    labelText="title"
                    placeholderText="Number of vacancies"
                  ></Textfeild>
                </div>
              </div>
              <br></br>
              <div className={styled.div7}>
                
                <div className={styled.Location}>
                  <h4 className={styled.heading11}>City</h4>

                  <SimpleDropDown
                    optionLabel="City"
                    selectedOption={location}
                    setSelectedOption={setLocation}
                    options={locationOptions}
                  ></SimpleDropDown>
                </div>
                <div className={styled.requirestravelling}>
                  <h4 className={styled.heading15}>Requires Travelling</h4>

                  <SimpleDropDown
                    optionLabel="Travelling..."
                    selectedOption={travelling}
                    setSelectedOption={setTravelling}
                    options={travellingOptions}
                  ></SimpleDropDown>
                </div>
                
                
              </div>

              <br></br>
              <h4 className={styled.heading16}>Closing date</h4>

              <div className={styled.closingdate}>
                <Calander
                  selectedDate={closingDate}
                  setSelectedDate={setClosingDate}
                ></Calander>
                <div className="button">
                  <button type="button" className={styled.button} onClick={handleSubmit} disabled={buttonDisable}>
                    {buttonText}
                  </button>
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateJobPage;
