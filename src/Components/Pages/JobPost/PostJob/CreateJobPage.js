import React, { useState } from "react";
import { Calander } from "../components/Calander";

import { MultiSelectDropDown } from "../components/MultiSelectDropDown";
import { SimpleDropDown } from "../components/SimpleDropDown";
import { Textfeild } from "../components/Textfeild";
import styled from "./CreateJobPage.module.css";

import env from "react-dotenv";
import swal from "sweetalert";
import { style } from "@mui/system";


const CreateJobPage = () => {

  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState(""); // for single drop down
  const [degrees, setDegrees] = useState([]);
  const [employmentCategories, setEmploymentCategories] = useState([]);
  const [genders, setGenders] = useState(""); // for single drop down
  const [location, setLocation] = useState(""); // for single drop down
  const [softskills, setSoftskills] = useState([]);
  const [technicalskills, setTechnicalskills] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState(""); // for single drop down
  const [perksAndBenefits, setPerksAndBenefits] = useState([]);
  const [travelling, setTravelling] = useState(""); // for single drop down
  const [vacancies, setVacancies] = useState("");
  const [closingDate, setClosingDate] = useState(null);
  const [selectedResponsibilites, setSelectedResponsibilities] = useState([]);

  const experienceLevelOptions = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
  ];
  const genderOptions = ["MALE", "FEMALE", "BOTH_MALE_FEMALE", "ALL"];
  const travellingOptions = ["YES", "NO", "MAYBE "];

  let responsibilityOptions = [
    "Contribute in all phases of the development lifecycle",
    "Write well designed, testable, efficient code",
    "Ensure designs are in compliance with specifications",
  ];

  let departmentOptions = ["CLOUD_NATIVE_ENGINEERING", "DATA_ENGINEERING"];

  let degreeOptions = ["B.E - CIS", "BSCS"];

  let employmentCategoriesOptions = [
    "PART_TIME",
    "FULL_TIME",
    "CONTRACT_BASE",
    "ONLINE",
    "ONSITE",
  ];

  let softSkillsOptions = ["JAVA", "JUNIT", "SQL", "REACT"];

  let technicalskillsOptions = ["technical Skill A", "technical Skill B"];

  let benefitsAndPerksOptions = ["benefit A", "benefit B", "benefit C"];

  let locationOptions = ["karachi", "lahore", "islamabad"];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !degrees.length ||
      !employmentCategories.length ||
      !softskills.length ||
      !technicalskills.length ||
      !selectedResponsibilites.length ||
      !perksAndBenefits.length ||
      !experienceLevel.length
    ) {
      // alert("Please fill out all the required fields");
      swal({
        title:"Please fill out all the required fields",
        icon:"error"
      })
      return;
    }

    let requestData = {
      title: jobTitle,
      department: department,
      employementCategory: employmentCategories[0], // ["FULL_TIME","ONLINE"],
      gender: genders, //["MALE","FEMALE"],
      traveling: travelling,
      location: location,
      softSkills: softskills[0].map((ss) => {
        return { softSkill: ss };
      }),
      technicalSkills: technicalskills[0].map((ts) => {
        return { technicalSkill: ts };
      }),
      closeDate: closingDate, //"2023-01-30"
      description: description,
      responsibilitiess: selectedResponsibilites[0].map((rs) => {
        return { responsibility: rs };
      }),
      educations: degrees[0].map((edu) => {
        return { education: edu };
      }),
      benefitPerkss: perksAndBenefits[0].map((pb) => {
        return { benefitPerks: pb };
      }),
      experienceLevel: experienceLevel,
      vacancyCount: vacancies,
    };

    fetch(
      env.REACT_APP_API_URL1,
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
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // alert("sucessful");
        swal({
          title:"Job posted sucessfully!",
          icon:"success"
        })
      })
      .catch((err) => {
        // setError("Server is busy or crediential is invalid");
      });
  };

  return (
    <div className={styled.mainContainer}>
      <div className={styled.create_job_page}>
        
        {" "}
        
        <h1 className={styled.heading}>CREATE JOB PAGE</h1>
        <div className={styled.FormCreateJob}>
        <form onSubmit={handleSubmit}>
          
          <div className={styled.enterjobtitle}>
            <h4 className={styled.heading2}>Job Title</h4>
            <Textfeild
              data-testid="title-input"
              inputValue={jobTitle}
              setInputValue={setJobTitle}
              labelText="title"
              placeholderText="enter job title"
            ></Textfeild>
          </div>

          <div className={styled.jobdescription}>
            <h4 className={styled.heading3}>Job Description</h4>

            <Textfeild
              inputValue={description}
              setInputValue={setDescription}
              placeholderText="enter job description"
            ></Textfeild>
          </div>
          <br></br>

          <div className={styled.div2}>
            <div className={styled.dropdown}>
              <h4 className={styled.heading4}>Department</h4>

              <SimpleDropDown
                title="Department"
                selectedOption={department}
                setSelectedOption={setDepartment}
                options={departmentOptions}
              ></SimpleDropDown>
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

          <div className={styled.div3}>
            <div className={styled.education}>
              <h4 className={styled.heading6}>Degrees/Education</h4>

              <MultiSelectDropDown
                fetchedOptions={degreeOptions}
                selected={degrees}
                setSelected={setDegrees}
              ></MultiSelectDropDown>
            </div>

            <div className={styled.employmentcategory}>
              <h4 className={styled.heading7}>Employment Category</h4>

              <MultiSelectDropDown
                fetchedOptions={employmentCategoriesOptions}
                selected={employmentCategories}
                setSelected={setEmploymentCategories}
              ></MultiSelectDropDown>
            </div>
          </div>
          <br></br>
          <div className={styled.div4}>
            <div className={styled.softskills}>
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
              <h4 className={styled.heading10}>Perks and Benifits</h4>

              <MultiSelectDropDown
                fetchedOptions={benefitsAndPerksOptions}
                selected={perksAndBenefits}
                setSelected={setPerksAndBenefits}
              ></MultiSelectDropDown>
            </div>

            <div className={styled.Location}>
              <h4 className={styled.heading11}>Location</h4>

              <SimpleDropDown
                selectedOption={location}
                setSelectedOption={setLocation}
                options={locationOptions}
              ></SimpleDropDown>
            </div>
          </div>

          <br></br>
          <br></br>
          <br></br>

          <br></br>

          <section className={styled.form2}>
            <div className={styled.div6}>
              <div className={styled.experience}>
                <h4 className={styled.heading12}>Experience</h4>

                <SimpleDropDown
                  selectedOption={experienceLevel}
                  setSelectedOption={setExperienceLevel}
                  options={experienceLevelOptions}
                ></SimpleDropDown>
              </div>
              <div className={styled.vacancies}>
                <h4 className={styled.heading13}>No# Vacancies</h4>

                <Textfeild
                  inputValue={vacancies}
                  setInputValue={setVacancies}
                  labelText="title"
                  placeholderText="enter the number of vacancies"
                ></Textfeild>
              </div>
            </div>
            <div className={styled.div7}>
              <div className={styled.gender}>
                <h4 className={styled.heading14}>Gender</h4>

                <SimpleDropDown
                  selectedOption={genders}
                  setSelectedOption={setGenders}
                  options={genderOptions}
                ></SimpleDropDown>
              </div>

              <div className={styled.requirestravelling}>
                <h4 className={styled.heading15}>Requires Travelling</h4>

                <SimpleDropDown
                  selectedOption={travelling}
                  setSelectedOption={setTravelling}
                  options={travellingOptions}
                ></SimpleDropDown>
              </div>
            </div>

            <div className={styled.closingdate}>
              <h4 className={styled.heading16}>Closing date</h4>
              <Calander
                selectedDate={closingDate}
                setSelectedDate={setClosingDate}
              ></Calander>
            </div>
          </section>
          <button className={styled.button} onClick={handleSubmit}>
            SUBMIT
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJobPage;
