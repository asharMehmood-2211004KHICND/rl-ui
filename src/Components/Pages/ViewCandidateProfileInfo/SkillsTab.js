import React, { useEffect, useState } from "react";
import Heading from "../profile/Heading/Heading";
import { Divider, Space, Tag } from 'antd';
import styles from './ViewCandidateProfileInfo.module.css'

export default function SkillsTab({ skillsData }) {

  const giveMeSkillLevel = (proficiency) => {
    if (proficiency <= 5) {
      return ["BEGINNER", "#e64219"];
    } else if (proficiency > 5 && proficiency <= 7) {
      return ["INTERMEDIATE", "#eb9915"];
    } else {
      return ["MASTER", "#15eb35"];
    }
  };

  return (
    <div className={styles.contentBody}>
      <div className={styles.center}><Heading
        text={"Skills"}
        className={''}
      /></div>
      <div style={{ flexWrap: 'wrap', justifyContent: 'center' }} className={styles.card}>
        {skillsData.length === 0 && 'No Data'}
        {skillsData.map(({ id, skill, proficiency }) => {
          const [level, color] = giveMeSkillLevel(proficiency)
          return (<div className={styles.skill}>{skill} <Tag color={color} >{level}</Tag></div>)
        })}
      </div>
    </div>
  );
}
