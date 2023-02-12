import React, { useEffect, useState } from "react";
import Button from "../profile/Button/Button";
import AcademicTab from "./AcademicTab";
import PersonalInfoTab from "./PersonalInfoTab";
import SkillsTab from "./SkillsTab";
import WorkTab from "./WorkTab";
import styles from "./ViewCandidateProfileInfo.module.css"
import CertificatesTab from "./CertificatesTab";

const BaseURL = process.env.REACT_APP_API_URL3;

export default function ViewCandidateProfileInfo() {
  const [view, setView] = useState("personal-info");
  const userId = sessionStorage.getItem("user_id")

  const [personalData, setPersonalData] = useState({});
  const [academicData, setAcademicData] = useState([]);
  const [workData, setWorkData] = useState([]);
  const [skillsData, setSkillsData] = useState([]);
  const [certificatesData, setCertificatesData] = useState([]);

  const [active, setActive] = useState(0);

  const personalInfoUrl = `${BaseURL}/api/personal_information/users/${userId}`;
  const academicInfoUrl = `${BaseURL}/api/educational_information/user/${userId}`;
  const workInfoUrl = `${BaseURL}/api/work_experience/user/${userId}`;
  const skillsInfoUrl = `${BaseURL}/api/users/skills/${userId}`;
  const certificatesInfoUrl = `${BaseURL}/api/file/user/${userId}`;

  let render;

  const fetchData = (url, setData) => {
    fetch(url)
      .then(async (response) => {
        const data = await response.json()
        console.log(data)
        setData(data)
      })
      .catch((error) => {
        console.log(error, "I caught this!")
      })
  }

  useEffect(() => {
    fetchData(personalInfoUrl, setPersonalData)
    fetchData(academicInfoUrl, setAcademicData)
    fetchData(workInfoUrl, setWorkData)
    fetchData(skillsInfoUrl, setSkillsData)
    fetchData(certificatesInfoUrl, setCertificatesData)

  }, [])

  switch (view) {
    case "personal-info":
      render = <PersonalInfoTab personalData={personalData} />;
      break;
    case "academic-info":
      render = <AcademicTab academicData={academicData} />;
      break;
    case "work-info":
      render = <WorkTab workData={workData} />
      break;
    case "skills-info":
      render = <SkillsTab skillsData={skillsData} />;
      break;
    case "certificates-info":
      render = <CertificatesTab certificatesData={certificatesData} />;
      break;
    default:
      render = <PersonalInfoTab personalData={personalData} />;
      break;
  }

  return (
    <>
      {/* <div style={{fontSize: '20px'}} className={styles.centerHeading}>{`${personalData.firstName} ${personalData.lastName}`}</div> */}
      <div className={styles.navBtnContainer}>
        <Button onClick={() => {setView("personal-info"); setActive(0)}} text="Personal Info" type="button" className={active === 0 ? styles.active : styles.navBtn} />
        <Button onClick={() => {setView("academic-info"); setActive(1)}} text="Academic" type="button" className={active === 1 ? styles.active : styles.navBtn} />
        <Button onClick={() => {setView("work-info"); setActive(2)}} text="Experience" type="button" className={active === 2 ? styles.active : styles.navBtn} />
        <Button onClick={() => {setView("skills-info"); setActive(3)}} text="Skills" type="button" className={active === 3 ? styles.active : styles.navBtn} />
        <Button onClick={() => {setView("certificates-info"); setActive(4)}} text="Certificates" type="button" className={active === 4 ? styles.active : styles.navBtn} />
      </div>
      <div>{render}</div>
    </>
  );
}
