import styled from "./jobview.module.css";
import TableJob from "./Table/TableJob";

const JobView = ({
  title,
  jobDescription,
  department,
  responsibilities,
  education,
  employements,
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
          <TableJob head={"Employment:"} body={employements} />
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



export default JobView;
