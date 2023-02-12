import React, { useEffect, useState } from 'react'
import Heading from '../profile/Heading/Heading'
import styles from './ViewCandidateProfileInfo.module.css'


export default function AcademicTab({ academicData }) {

  return (
    <div className={styles.contentBody}>
      <div className={styles.center}><Heading
        text={"Academic Information"}
        className={''}
      /></div>
      {academicData.length === 0 &&
        <div style={{ justifyContent: 'center' }} className={styles.card}>No Data</div>}
      {academicData.map(({ cgpa, currentDegree, degreeProgress, finalYearProject, graduationDate, id, institute, title }) => {
        return (
          <div className={styles.card} key={id}>
            <div className={styles.column}>
              <div className={styles.line}><p className={styles.tag}>Degree:</p><p>{currentDegree}</p></div>
              <div className={styles.line}><p className={styles.tag}>Degree Title:</p><p>{title}</p></div>
              <div className={styles.line}><p className={styles.tag}>Institute/University:</p><p>{institute}</p></div>
              <div className={styles.line}><p className={styles.tag}>Final Year Project:</p><p>{finalYearProject}</p></div>
            </div>
            <div className={styles.column}>
              <div className={styles.line}><p className={styles.tag}>Graduation Date:</p><p>{degreeProgress === 'No' ? graduationDate : 'Degree in Progress'}</p></div>
              <div className={styles.line}><p className={styles.tag}>CGPA:</p><p>{cgpa}</p></div>
            </div>
          </div>
        )
      })}

    </div>
  );
}
