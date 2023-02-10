import styled from "./jobview.module.css";

const JobView = ({
  title,
  jobDescription,
  department,
  responsibilities,
  education,
  employement,
  softskills,
  technicalskills,
  benefits,
  location,
  experience,
  vacancies,
  gender,
  travelling,
  closingdate,
}) => {
  return (
    <div className={styled.jobview}>
      {" "}
      <div className={styled.herosec}>
        <h1 className={styled.heading}>Job View</h1>
        {/* <section className={styled.icon}>
      <i className={`fa-regular fa-pen-to-square ${styled.fontAwesomeEdit}`} ></i>
      <span className={styled.edit}>Edit</span></section> */}
      </div>
      <div className={styled.title}>
        <h2 className={styled.heading1}>Title:</h2>

        <p className={styled.paragrap1}>{title}</p>
      </div>
      <section className={styled.line}></section>
      <div className={styled.jobdescription}>
        <h2 className={styled.heading2}>Job Description:</h2>
        <p className={styled.paragrap2}>{jobDescription}</p>
      </div>
      <section className={styled.line}></section>
      <div className={styled.department}>
        <h2 className={styled.heading3}>Department:</h2>

        <p className={styled.paragrap3}>{department}</p>
      </div>
      <section className={styled.line}></section>
      <div className={styled.responsibilities1}>
        <div className={styled.responsibilities}>
          <h2 className={styled.heading4}>Responsibilities:</h2>
        </div>
        {responsibilities &&
          responsibilities.map((responsibility, i) => (
            <ul className={styled.responsibilitieslist}>{responsibility}</ul>
          ))}
      </div>
      <section className={styled.line}></section>
      <div className={styled.degrees1}>
        <div className={styled.degrees}>
          <h2 className={styled.heading5}>Education:</h2>
        </div>
        {education &&
          education.map((e, i) => <ul className={styled.degreelist}>{e}</ul>)}
      </div>
      <section className={styled.line}></section>
      <div className={styled.employement1}>
        <div className={styled.employement}>
          <h2 className={styled.heading6}>Employement:</h2>

          {/* <p className={styled.paragrap6}>
          
        </p> */}
        </div>

        {employement &&
          employement.map((employ, i) => (
            <ul className={styled.employmentlist}>{employ}</ul>
          ))}
      </div>
      <section className={styled.line}></section>
      <div className={styled.softskills1}>
        <div className={styled.softskills}>
          <h2 className={styled.heading7}>Soft Skills:</h2>

          {/* <p className={styled.paragrap7}>
        </p>
       */}
        </div>

        {softskills &&
          softskills.map((softSkill, i) => (
            <ul className={styled.softskillslist}>{softSkill}</ul>
          ))}
      </div>
      <section className={styled.line}></section>
      <div className={styled.technicalskills1}>
        <div className={styled.technicalskills}>
          <h2 className={styled.heading8}>Technical Skills:</h2>

          {/* <p className={styled.paragrap8}>
         
        </p> */}
        </div>

        {technicalskills &&
          technicalskills.map((technicalSkill, i) => (
            <ul className={styled.technicallist}>{technicalSkill}</ul>
          ))}
      </div>
      <section className={styled.line}></section>
      <div className={styled.perksandbenefits1}>
        <div className={styled.perksandbenefits}>
          <h2 className={styled.heading9}>Benefits</h2>

          {/* <p className={styled.paragrap9}>
         
        </p> */}
        </div>
        {benefits &&
          benefits.map((benefitPerks, i) => (
            <ul className={styled.perksandbenefitslist}>{benefitPerks}</ul>
          ))}

        <ul className={styled.perksandbenefitslist}>{benefits?.benefitPerks}</ul>
      </div>
      <section className={styled.line}></section>
      <div className={styled.location}>
        <h2 className={styled.heading10}>Location:</h2>

        <p className={styled.paragrap10}>{location}</p>
      </div>
      <section className={styled.line}></section>
      <div className={styled.experience}>
        <h2 className={styled.heading11}>Experience:</h2>

        <p className={styled.paragrap11}>{experience}</p>
      </div>
      <section className={styled.line}></section>
      <div className={styled.vacancies}>
        <h2 className={styled.heading12}>Vacancies:</h2>

        <p className={styled.paragrap12}>{vacancies}</p>
      </div>
      <section className={styled.line}></section>
      <div className={styled.gender1}>
        <div className={styled.gender}>
          <h2 className={styled.heading13}>Gender:</h2>

          <p className={styled.paragrap13}>{gender}</p>
        </div>
        {/* <ul className={styled.genderlist}>
        
      </ul> */}
      </div>
      <section className={styled.line}></section>
      <div className={styled.travelling1}>
        <div className={styled.travelling}>
          <h2 className={styled.heading14}>Travel Required:</h2>

          <p className={styled.paragrap14}>{travelling}</p>
        </div>
        <ul className={styled.travellinglist}></ul>
      </div>
      <section className={styled.line}></section>
      <div className={styled.closingdate}>
        <h2 className={styled.heading15}>Closing Date:</h2>

        <p className={styled.paragrap15}>{closingdate}</p>
      </div>
    </div>
  );
};

export default JobView;
