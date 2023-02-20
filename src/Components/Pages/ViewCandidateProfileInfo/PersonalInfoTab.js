import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../profile/Button/Button";
import Heading from "../profile/Heading/Heading";
import styles from "./ViewCandidateProfileInfo.module.css"

function PersonalInfoTab({ personalData }) {

  const navigate = useNavigate();
  const { firstName, lastName, gender, nationalIdentityNumber, maritalStatus, phoneNumber,
    email, dateOfBirth, city, address, linkedProfile } = personalData

  return (
    <div className={styles.contentBody}>
      <div className={styles.center}><Heading
        text={"Personal Information"}
        className={''}
      /></div>
      <h3 className={styles.subHeading}>Basic Information</h3>
      <div className={styles.card}>
        <div className={styles.column}>
          <div className={styles.line}><p className={styles.tag}>First Name:</p><p>{firstName}</p></div>
          <div className={styles.line}><p className={styles.tag}>Last Name:</p><p>{lastName}</p></div>
          <div className={styles.line}><p className={styles.tag}>Date of Birth:</p><p>{dateOfBirth}</p></div>
          <div className={styles.line}><p className={styles.tag}>CNIC:</p><p>{nationalIdentityNumber}</p></div>
        </div>
        <div className={styles.column}>
          <div className={styles.line}><p className={styles.tag}>Gender:</p><p>{gender}</p></div>
          <div className={styles.line}><p className={styles.tag}>Marital Status:</p><p>{maritalStatus}</p></div>
          <div className={styles.line}><p className={styles.tag}>Phone Number:</p><p>{phoneNumber}</p></div>
          <div className={styles.line}><p className={styles.tag}>LinkedIn Profile:</p><p>{linkedProfile}</p></div>
        </div>
      </div>
      <h3 className={styles.subHeading}>Address Information</h3>
      <div className={styles.card}>
        <div className={styles.column}>
          <div className={styles.line}><p className={styles.tag}>Address:</p><p>{address}</p></div>
          <div className={styles.line}><p className={styles.tag}>City:</p><p>{city}</p></div>
        </div>
        <div className={styles.column}>
          {/* <div className={styles.line}><p className={styles.tag}>Postal Code:</p><p>---</p></div> */}
          <div className={styles.line}><p className={styles.tag}>Country:</p><p>Pakistan</p></div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoTab