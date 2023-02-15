import React, { useState } from "react";
import { Calander } from "../components/Calander";

import { MultiSelectDropDown } from "../components/MultiSelect/MultiSelectDropDown";
import { SimpleDropDown } from "../components/SelectDropDown/SimpleDropDown";
import { Textfeild } from "../components/Textfeild";
import styled from "./UpdateJobPage.module.css";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useLocation } from "react-router-dom";
import Radio from '@mui/material/Radio';
import { useEffect } from "react";


const BaseURL = process.env.REACT_APP_API_URL1;


const UpdateJobPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [data, setData] = useState(state);

  const [jobTitle, setJobTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [department, setDepartment] = useState(data.department ); // for single drop down
  const [degrees, setDegrees] = useState(
    data.educations.map((data) => data.education)
  );
  //data problem
  // const [employmentCategories, setEmploymentCategories] = useState(data.employementCategory);

  const [employmentCategories, setEmploymentCategories] = useState([
    "Full Time",
    "Part Time",
  ]);

  const [genders, setGenders] = useState(data.gender); // for single drop down
  const [location, setLocation] = useState(data.location); // for single drop down
  const [softskills, setSoftskills] = useState(
    data.softSkills.map((data) => data.softSkill)
  );
  const [technicalskills, setTechnicalskills] = useState(
    data.technicalSkills.map((data) => data.technicalSkill)
  );
  const [experienceLevel, setExperienceLevel] = useState(data.experienceLevel); // for single drop down
  const [perksAndBenefits, setPerksAndBenefits] = useState(
    data.benefitPerkss.map((data) => data.benefitPerks)
  );
  const [travelling, setTravelling] = useState(data.traveling); // for single drop down
  const [vacancies, setVacancies] = useState(data.vacancyCount);
  const [closingDate, setClosingDate] = useState(new Date(data.closeDate));
  const [selectedResponsibilites, setSelectedResponsibilities] = useState(
    data.responsibilities
  );
  const [buttonDisable, setButtonDisable] = useState(false);
  const [buttonText, setButtonText] = useState("UPDATE");

  const [active_status, setActive_status] = useState(data.active);
  const [departmentOptions, setDepartmentOptions] = useState([])
  const [degreeOptions, setDegreeOptions] = useState([])
  const [softSkillsOptions, setSoftSkillsOptions] = useState([])
  const [technicalskillsOptions, setTechnicalskillsOptions] = useState([])
  const [benefitsAndPerksOptions, setBenefitsAndPerksOptions] = useState([])


  useEffect(()=>{

    fetch(`${BaseURL}/department/all`)
    .then( async (response) =>{
      if(!(response.status>=200 && response.status<300) ){ throw new Error(response.status);}  
        return await response.json()}
        )
    .then((data) => {
      data = data.map(d=>d.departmentName)
      setDepartmentOptions(data);
    })
    .catch((err) => {
      if(err.Error>400){ swal( {  title: "Server Down", icon: "error",});}
      else if(err.Error>299){ swal({  title: "Server Busy",  icon: "error",});}
    });

    fetch(`${BaseURL}/benefits/all`)
      .then( async (response) =>{
        if(!(response.status>=200 && response.status<300) ){ throw new Error(response.status);}  
          return await response.json()}
          )
      .then((data) => {
        data = data.map(d=>d.benefitPerks)
        setBenefitsAndPerksOptions(data);
      })
      .catch((err) => {
        if(err.Error>400){ swal( {  title: "Server Down", icon: "error",});}
        else if(err.Error>299){ swal({  title: "Server Busy",  icon: "error",});}
      });

      fetch(`${BaseURL}/education/all`)
        .then( async (response) =>{
          if(!(response.status>=200 && response.status<300) ){ throw new Error(response.status);}  
            return await response.json()}
            )
        .then((data) => {
          data = data.map(d=>d.education)
          setDegreeOptions(data);
        })
        .catch((err) => {
          if(err.Error>400){ swal( {  title: "Server Down", icon: "error",});}
          else if(err.Error>299){ swal({  title: "Server Busy",  icon: "error",});}
        });

        fetch(`${BaseURL}/softSkill/all`)
          .then( async (response) =>{
            if(!(response.status>=200 && response.status<300) ){ throw new Error(response.status);}  
              return await response.json()}
              )
          .then((data) => {
            data = data.map(d=>d.softSkill) 
            setSoftSkillsOptions(data);
          })
          .catch((err) => {
            if(err.Error>400){ swal( {  title: "Server Down", icon: "error",});}
            else if(err.Error>299){ swal({  title: "Server Busy",  icon: "error",});}
          });

          fetch(`${BaseURL}/technicalskill/all`)
            .then( async (response) =>{
              if(!(response.status>=200 && response.status<300) ){ throw new Error(response.status);}  
                return await response.json()}
                )
            .then((data) => {
              data = data.map(d=>d.technicalSkill) 
              setTechnicalskillsOptions(data);
            })
            .catch((err) => {
              if(err.Error>400){ swal( {  title: "Server Down", icon: "error",});}
              else if(err.Error>299){ swal({  title: "Server Busy",  icon: "error",});}
            });


            console.log(degreeOptions)
            console.log(departmentOptions)
            console.log(benefitsAndPerksOptions)
            console.log(benefitsAndPerksOptions)
            console.log(softSkillsOptions)
            console.log(technicalskillsOptions)
  },[])

  const experienceLevelOptionsValue = [
    "Fresh Graduate",
    "1 Year",
    "2 Year",
    "3 Year",
    "4 Year",
    "5 Year",
    "6 Year",
    "7 Year",
    "8 Year",
    "9 Year",
    "10 Year",
    "11 Year",
    "12 Year",
    "13 Year",
    "14 Year",
    "15 Year",
    "16 Year",
    "17 Year",
    "18 Year",
    "19 Year",
    "20 Year",
  ];
  
  const experienceLevelOptions = [0, 1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  const genderOptions = ["Male", "Female", "Anyone"];
  const travellingOptions = ["Yes", "No", "MayBe "];

 

  // let departmentOptions = ["Cloud Engineering", "Data Engineering"];

  // let degreeOptions = ["BE", "BS", "MS"];

  let employmentCategoriesOptions = [
    "Part Time",
    "Full Time",
    "Contract Base",
    "Remote",
    "Onsite",
    "Internship",
  ];

  // let softSkillsOptions = [
  //   "Communication",
  //   "Teamwork",
  //   "Adaptability",
  //   "Problem-solving",
  //   "Critical thinking",
  //   "Time management",
  //   "Leadership",
  //   "Creativity",
  //   "Interpersonal skills",
  //   "Conflict resolution",
  //   "Active listening",
  //   "Emotional intelligence",
  //   "Negotiation",
  //   "Stress management",
  //   "Goal setting",
  //   "Organization",
  //   "Presentation skills",
  //   "Decision making",
  //   "Customer service",
  //   "Positive attitude",
  // ];

  // const technicalskillsOptions = [
  //   "JavaScript",
  //   "Java",
  //   "Python",
  //   "C++",
  //   "C#",
  //   "PHP",
  //   "Ruby",
  //   "SQL",
  //   "HTML",
  //   "CSS",
  //   "React",
  //   "Angular",
  //   "Vue.js",
  //   "Node.js",
  //   "Express",
  //   "MongoDB",
  //   "PostgreSQL",
  //   "MySQL",
  //   "Redis",
  //   "AWS",
  //   "Docker",
  //   "Kubernetes",
  //   "Git",
  //   "GitHub",
  //   "Bitbucket",
  //   "Agile methodologies",
  //   "Scrum",
  //   "Kanban",
  //   "JIRA",
  //   "Trello",
  //   "RESTful APIs",
  //   "GraphQL",
  //   "Microservices",
  //   "Unit testing",
  //   "Integration testing",
  //   "Automated testing",
  //   "Load testing",
  //   "Security testing",
  //   "Object-Oriented Programming (OOP)",
  //   "Functional Programming",
  //   "Design Patterns",
  //   "Architecture design",
  //   "Data structures",
  //   "Algorithms",
  //   "Continuous Integration (CI)",
  //   "Continuous Deployment (CD)",
  //   "Automated deployment",
  //   "Automated scaling",
  //   "Continuous monitoring",
  //   "Debugging",
  //   "Troubleshooting",
  //   "Performance optimization",
  //   "Code reviews",
  //   "Refactoring",
  //   "Code versioning",
  //   "Code documentation",
  //   "Cloud computing",
  //   "Virtualization",
  //   "Infrastructure as Code (IaC)",
  //   "Network security",
  //   "Firewall management",
  //   "Encryption",
  //   "Machine learning",
  //   "Artificial intelligence",
  //   "Natural language processing (NLP)",
  //   "Computer vision",
  //   "Big data",
  //   "Data science",
  //   "DevOps",
  //   "IT Operations",
  //   "IT Support",
  //   "Project management",
  //   "Requirements gathering",
  //   "User experience (UX) design",
  //   "User interface (UI) design",
  //   "Mobile application development",
  //   "Cross-platform development",
  //   "Hybrid mobile development",
  //   "Native mobile development",
  //   "Augmented reality (AR)",
  //   "Virtual reality (VR)",
  //   "Game development",
  //   "Web development",
  //   "Backend development",
  //   "Full-stack development",
  //   "Software engineering",
  //   "Software testing",
  //   "Software quality assurance (QA)",
  //   "Software maintenance",
  //   "Software configuration management (SCM)",
  //   "Software project management",
  //   "Software release management",
  //   "Software risk management",
  //   "Software change management",
  //   "Software asset management",
  //   "Software licensing",
  // ];

  // const benefitsAndPerksOptions = [
  //   "Competitive salary",
  //   "Performance bonuses",
  //   "Stock options",
  //   "401(k) plan",
  //   "Health insurance",
  //   "Dental insurance",
  //   "Vision insurance",
  //   "Life insurance",
  //   "Disability insurance",
  //   "Paid time off (PTO)",
  //   "Sick leave",
  //   "Vacation time",
  //   "Holiday pay",
  //   "Flexible schedules",
  //   "Remote work options",
  //   "Work-life balance",
  //   "Education and training opportunities",
  //   "Certification programs",
  //   "Career advancement opportunities",
  //   "Mentorship programs",
  //   "Collaborative work environment",
  //   "Team building activities",
  //   "Wellness programs",
  //   "Gym memberships",
  //   "Free snacks and beverages",
  //   "Casual dress code",
  //   "Corporate discounts",
  //   "Commuter benefits",
  //   "Parental leave",
  //   "Family care leave",
  //   "On-site child care",
  //   "Pet-friendly workplace",
  //   "Free parking or transportation reimbursement",
  //   "Ergonomic workstations",
  //   "Standing desks",
  //   "Relocation assistance",
  //   "International assignments",
  //   "Company outings and events",
  //   "Team bonding activities",
  //   "Philanthropy opportunities",
  //   "Diversity and inclusion initiatives",
  //   "Sustainability initiatives",
  //   "Company-sponsored sports teams",
  //   "Free or subsidized meals",
  //   "Break rooms with amenities",
  //   "Collaborative workspaces",
  //   "Standing desks",
  //   "Nap rooms",
  //   "Pet-friendly office policies",
  //   "On-site massage therapy",
  //   "Free or discounted transportation options",
  //   "Sponsored community service opportunities",
  // ];

  let locationOptions = ["Karachi", "Lahore", "Islamabad"];

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(degrees.length);
    // console.log(employmentCategories.length);
    // console.log(softskills.length);
    // console.log(technicalskills.length);
    // console.log(selectedResponsibilites.length);
    // console.log(experienceLevel.length);
    // console.log(perksAndBenefits.length);
    setButtonText("Loading...");
    setButtonDisable(true);
    if (
      !degrees.length ||
      !employmentCategories.length ||
      !softskills.length ||
      !technicalskills.length ||
      !perksAndBenefits.length ||
      !experienceLevel
    ) {
      console.log(degrees);
      // alert("Please fill out all the required fields");
      swal({
        title: "Please fill out all the required fields",
        icon: "error",
      });
      setButtonText("SUBMIT");
      setButtonDisable(false);
      return;
    }

    let requestData = {
      title: jobTitle,
      department: { id: 1, departmentName: department },
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
      responsibilities: selectedResponsibilites,
      educations: degrees.map((edu) => {
        return { education: edu };
      }),
      benefitPerkss: perksAndBenefits.map((pb) => {
        return { benefitPerks: pb };
      }),
      experienceLevel: parseInt(experienceLevel),
      vacancyCount: vacancies,
      active:active_status,
      hmId: sessionStorage.getItem('user_id')
    };

    fetch(
      `${BaseURL}/job/update/${data.id}`,
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
      .then((response) => {
        if (!(response.status >= 200 && response.status < 300)) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((data) => {
        swal({
          title: "Job Updated sucessfully!",
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
        setSelectedResponsibilities();
        setDegrees([]);
        setPerksAndBenefits();
        setActive_status(undefined);
        setExperienceLevel(0);
        setVacancies(undefined);
        navigate("/job/all");
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
            <div className={styled.div2}>
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
              <div className={styled.active_status_container}>
                <h4 className={styled.heading2}>Job Status</h4>
                <label htmlFor="ActiveJob">Active</label>
                <Radio
                  id="ActiveJob"
                  checked={active_status}
                  // className={styled.ActiveJob}
                  onChange={(event)=>setActive_status(true)}
                  color='success'
                  value={true}
                  name="radio-button1"
                  />
                <label htmlFor="InActiveJob">InActive</label>
                <Radio
                  id="InActiveJob"
                  color='warning'
                  // className={styled.InActiveJob}
                  checked={!active_status}
                  onChange={(event)=>setActive_status(false)}
                  value={false}
                  name="radio-button2"

                />
              </div>
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
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Job Description"
              ></textarea>
            </div>
            <div className={styled.job_description_container}>
              <h4 className={styled.heading3}>Responsibilities</h4>
              <textarea
                className={styled.job_description_input}
                onChange={(e) => setSelectedResponsibilities(e.target.value)}
                value={selectedResponsibilites}
                placeholder="Enter Responsibilities"
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
             {/* responsibility */}
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
                <h4 className={styled.heading10}>Benefits</h4>

                <MultiSelectDropDown
                  fetchedOptions={benefitsAndPerksOptions}
                  selected={perksAndBenefits}
                  setSelected={setPerksAndBenefits}
                ></MultiSelectDropDown>
              </div>  
              <div className={styled.perksandbenifits}>
                <h4 className={styled.heading10}>Perks</h4>

                <MultiSelectDropDown
                  fetchedOptions={benefitsAndPerksOptions}
                  // selected={perksAndBenefits}
                  // setSelected={setPerksAndBenefits}
                ></MultiSelectDropDown>
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
                  <button
                    type="button"
                    className={styled.button}
                    onClick={handleSubmit}
                    disabled={buttonDisable}
                  >
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
