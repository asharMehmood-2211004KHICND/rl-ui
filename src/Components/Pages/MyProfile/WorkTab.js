import React, { useEffect, useState } from "react";
import Heading from "../profile/Heading/Heading";
import styles from './ViewCandidateProfileInfo.module.css'

export default function WorkTab({ workData }) {

  return (
    <div className={styles.contentBody}>
      <div className={styles.center}><Heading
        text={"Work Experience"}
        className={''}
      /></div>
      {workData.length === 0 &&
        <div style={{ justifyContent: 'center' }} className={styles.card}>No Data</div>}
      {workData.map(({ id, company, currentStatus, startDate, endDate, jobTitle, jobType }) => {
        return (
          <div className={styles.card} key={id}>
            <div className={styles.column}>
              <div className={styles.line}><p className={styles.tag}>Company:</p><p>{company}</p></div>
              <div className={styles.line}><p className={styles.tag}>Job Title:</p><p>{jobTitle}</p></div>
              <div className={styles.line}><p className={styles.tag}>Job Type:</p><p>{jobType}</p></div>
            </div>
            <div className={styles.column}>
              <div className={styles.line}><p className={styles.tag}>Start Date:</p><p>{startDate}</p></div>
              <div className={styles.line}><p className={styles.tag}>End Date:</p><p>{currentStatus === 'No' ? endDate : 'Currently working here'}</p></div>
            </div>
          </div>
        )
      })}
    </div>
  );
}