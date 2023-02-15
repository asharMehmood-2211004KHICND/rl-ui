import styled from "./jobview.module.css";
import TableJob from "./Table/TableJob";

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
  console.log(benefits);
  return (
    <>
      <div className={styled.jobview}>
        {" "}
        <div className={styled.herosec}>
          <h1 className={styled.heading}>Job View</h1>
        </div>
        <table className={styled.tableJob}>
          <TableJob head={"Title:"} body={title} />
          <TableJob head={"Job Description:"} body={jobDescription} />
          <TableJob head={"Department:"} body={department} />
          <TableJob head={"Responsibilities:"} body={responsibilities} />
          <TableJob head={"Education:"} body={education} />
          <TableJob head={"Employment:"} body={employement} />
          <TableJob head={"Soft Skills:"} body={softskills} />
          <TableJob head={"Technical Skills:"} body={technicalskills} />
          <TableJob head={"Benefits:"} body={benefits} />
          <TableJob head={"Location:"} body={location} />
          <TableJob head={"Experience:"} body={experience} />
          <TableJob head={"Vacancies:"} body={vacancies} />
          <TableJob head={"Gender:"} body={gender} />
          <TableJob head={"Travel Required:"} body={travelling} />
          <TableJob head={"Closing Date:"} body={closingdate} />
        </table>
      </div>
    </>
  );
};

{
  /* <div className={styled.title}>
          <h2 className={styled.heading1}>Title:</h2>

          <p className={styled.paragrap1}>{title}</p>
        </div>
        <section className={styled.line}></section>
        <div className={styled.jobdescription}>
          <h2 className={styled.heading2}>Job Description:</h2>
          <pre className={styled.paragrap2}>{jobDescription}</pre>
        </div>
        <section className={styled.line}></section>
        <div className={styled.department}>
          <h2 className={styled.heading3}>Department:</h2>

          <p className={styled.paragrap3}>{department}</p>
        </div> */
}
{
  /* <section className={styled.line}></section> */
}
{
  /* <div className={styled.jobResponsibility}>
          <h2 className={styled.heading2}>Responsibilities:</h2>
          <pre className={styled.paragrapResponsibility}>
            {responsibilities}
          </pre>
        </div> */
}
{
  /* <div className={styled.responsibilities1}>

        <div className={styled.responsibilities}>
          <h2 className={styled.heading4}>Responsibilities:</h2>

          <pre className={styled.paragrap2}>{responsibilities}</pre>
        </div>

      </div> */
}
{
  /* <section className={styled.line}></section>
        <div className={styled.degrees1}>
          <div className={styled.degrees}>
            <h2 className={styled.heading5}>Education:</h2>
          </div>
          {education &&
            education.map((e, i) => (
              <ul key={i} className={styled.degreelist}>
                {e}
              </ul>
            ))}
        </div> */
}
{
  /* <section className={styled.line}></section>
        <div className={styled.employement1}>
          <div className={styled.employement}>
            <h2 className={styled.heading6}>Employement:</h2> */
}

{
  /* <p className={styled.paragrap6}>
          
        </p> */
}
{
  /* </div>

          {employement &&
            employement.map((employ, i) => (
              <ul key={i} className={styled.employmentlist}>
                {employ}
              </ul>
            ))}
        </div>
        <section className={styled.line}></section>
        <div className={styled.softskills1}>
          <div className={styled.softskills}>
            <h2 className={styled.heading7}>Soft Skills:</h2> */
}

{
  /* <p className={styled.paragrap7}>
        </p>
       */
}
{
  /* </div>

          {softskills &&
            softskills.map((softSkill, i) => (
              <ul key={i} className={styled.softskillslist}>
                {softSkill}
              </ul>
            ))}
        </div>
        <section className={styled.line}></section>
        <div className={styled.technicalskills1}>
          <div className={styled.technicalskills}>
            <h2 className={styled.heading8}>Technical Skills:</h2> */
}

{
  /* <p className={styled.paragrap8}>
         
        </p> */
}
{
  /* </div>

          {technicalskills &&
            technicalskills.map((technicalSkill, i) => (
              <ul key={i} className={styled.technicallist}>
                {technicalSkill}
              </ul>
            ))}
        </div>
        <section className={styled.line}></section>
        <div className={styled.perksandbenefits1}>
          <div className={styled.perksandbenefits}>
            <h2 className={styled.heading9}>Benefits</h2> */
}

{
  /* <p className={styled.paragrap9}>
         
        </p> */
}
{
  /* </div>
          {benefits &&
            benefits.map((benefitPerks, i) => (
              <ul key={i} className={styled.perksandbenefitslist}>
                {benefitPerks}
              </ul>
            ))}

          <ul className={styled.perksandbenefitslist}>
            {benefits?.benefitPerks}
          </ul>
        </div>
        <section className={styled.line}></section>
        <div className={styled.location}>
          <h2 className={styled.heading10}>Location:</h2>

          <p className={styled.paragrap10}>{location}</p>
        </div>
        <section className={styled.line}></section>
        <div className={styled.experience}>
          <h2 className={styled.heading11}>Experience:</h2>

          <p className={styled.paragrap11}>{experience}</p> */
}
{
  /* </div>
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
          </div> */
}
{
  /* <ul className={styled.genderlist}>
        
      </ul> */
}
{
  /* </div>
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
        </div> */
}

export default JobView;
