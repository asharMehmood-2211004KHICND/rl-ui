import React from 'react'
import { useParams } from 'react-router-dom';
import JobView from './JobView';

function IndividualJob() {

    const params = useParams();
    console.log(params);
    
    const data = {
        "department" :"Cloud Engineer",
        "title": "Backend Engineer",
        "employementCategory":["Full Time","Online"],
        "gender":"Male",
        "traveling":"No",
        "location":"Karachi",
        "softSkills":[
            {
                "softSkill":"Communication"
              },{
                "softSkill":"Communication"
              },{
                "softSkill":"Communication"
              },{
                "softSkill":"Communication"
              },{
                "softSkill":"Communication"
              },
        ].map(s=>s.softSkill),
        "technicalSkills":[
            {
                "technicalSkill" : "Java"
            },{
                "technicalSkill" : "Java"
            },{
                "technicalSkill" : "Java"
            },{
                "technicalSkill" : "Java"
            },
        ].map(t=>t.technicalSkill),
        "closeDate": "2023-01-30",
        "description":"Software Engineer Position",
        "responsibilitiess":[
            {
                "responsibility":"Develop and maintain software applications"
              },{
                "responsibility":"Develop and maintain software applications"
              },{
                "responsibility":"Develop and maintain software applications"
              },{
                "responsibility":"Develop and maintain software applications"
              },{
                "responsibility":"Develop and maintain software applications"
              },
        ].map(res=>res.responsibility),
        "educations":[
          {"education":"Bachelors in Computer Science"},
          {"education":"Bachelors in Computer Science"},
          {"education":"Bachelors in Computer Science"},
          {"education":"Bachelors in Computer Science"},
          {"education":"Bachelors in Computer Science"},
          ].map(edu=>edu.education),
        "benefitPerkss":[
          {"benefitPerks":"Bachelors in Computer Science"},
          {"benefitPerks":"Bachelors in Computer Science"},
          {"benefitPerks":"Bachelors in Computer Science"},
          {"benefitPerks":"Bachelors in Computer Science"},
          {"benefitPerks":"Bachelors in Computer Science"},
          ].map(benef=>benef.benefitPerks),
        "experienceLevel":3,
        "vacancyCount":5
      };

  return (
    // <div>IndividualJob</div>
    <JobView 
    title={data.title}
    jobDescription={data.description}
    department={data.department}
    responsibilities={data.responsibilitiess}
    education={data.educations}
    employement={data.employementCategory}
    softskills={data.softSkills}
    technicalskills={data.technicalSkills}
    benefits={data.benefitPerkss}
    location={data.location}
    experience={data.experienceLevel}
    vacancies={data.vacancyCount}
    gender={data.gender}
    travelling={data.traveling}
    closingdate={data.closeDate}
    />
  )
}

export default IndividualJob


