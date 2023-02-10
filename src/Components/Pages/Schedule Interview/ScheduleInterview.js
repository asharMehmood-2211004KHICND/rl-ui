import React from "react";
import TimePicker from "react-time-picker";
import styles from "./ScheduleInterview.module.css";
import { Button } from "@mui/material";
import { useState, useCallback } from "react";
import InputField from "../profile/InputField/InputField";
import '../../../index.css';

const ScheduleInterview = () => {
  const [candidateName, setCandidateName] = useState("");
  const [interviewer, setInterviewer] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [errors, setErrors] = useState({});

  const validate = (values) => {
    let errors = {};
    if (!values.candidateName) {
      errors.candidateName = "Candidate Name is required";
    } else if (
      /[!@#$%&?]/g.test(values.candidateName) ||
      /\d/.test(values.candidateName)
    ) {
      errors.candidateName =
        "Candidate Name should not contain numbers or any special character";
    }
    if (!values.interviewer) {
      errors.interviewer = "Select Interviewer";
    }
    if (!values.date) {
      errors.date = "Set Date";
    }
    if (!values.time) {
      errors.time = "Set Time";
    }
    return errors;
  };

  const handleCandidatename = useCallback((val) => {
    setCandidateName(val);
  }, []);

  const handleInterviewer = useCallback(e => {
    setInterviewer(e.target.value);
  }, []);

  const handleDate = useCallback((val) => {
    setDate(val);
  }, []);

  async function onSubmit(event) {
    event.preventDefault();

    const errors = validate({ candidateName, interviewer, date, time });
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      const data = {
        candidateName: candidateName,
        interviewer: interviewer,
        date: date,
        time: time,
      };
    }
  }

  const selectInterviewerOption = [
    {
      label: "Kamran Zahid",
      value: 1,
    },
    {
      label: "Afnaan Yousuf",
      value: 2,
    },
    {
      label: "Abdul Wasay",
      value: 3,
    },
    {
      label: "Hunain Parekh",
      value: 4,
    },
  ];
  return (
    <>
      <div className={styles.mainContainer}>
        <div>
          <h1 className={styles.scheduleInterview}>Schedule Interview</h1>
        </div>
        <form className={styles.formInterview} onSubmit={onSubmit}>
          <div className={styles.form_row}>
            <div className={styles.form_column}>
              <div className={styles.row}>
                <div className={styles.column}>
                  <label>Candidate Name:</label>
                  <InputField
                    readonly
                    value={candidateName}
                    handler={handleCandidatename}
                    type="text"
                    className={styles.halfSize}
                  ></InputField>
                </div>
                {errors.candidateName && (
                  <p className={styles.error}>{errors.candidateName}</p>
                )}
              </div>
              <div className={styles.row}>
                <div className={styles.column}>
                  <label>Select Interviewer:</label>
                  <select
                    value={interviewer}
                    onChange={handleInterviewer}
                    className={`${styles.halfSize} ${styles.select}`}
                  >
                    <option value="">Select Interviewer</option>
                    {selectInterviewerOption.map((option) => (
                      <option className={styles.option} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.interviewer && (
                  <p className={styles.error}>{errors.interviewer}</p>
                )}
              </div>

              <div className={styles.row}>
                <div className={styles.column}>
                  <label className={styles.dob_label}>Date:</label>
                  <InputField
                    value={date}
                    handler={handleDate}
                    type="date"
                    placeholder="Date"
                    className={styles.halfSize}
                  ></InputField>
                </div>
                {errors.date && <p className={styles.error}>{errors.date}</p>}
              </div>
              <div className={styles.row}>
                <div className={styles.column}>
                  <label className={styles.time_label}>Time:</label>
                  <TimePicker
                    className={styles.time_picker}
                    onChange={setTime}
                    value={time}
                  />
                </div>
                {errors.time && <p className={styles.error}>{errors.time}</p>}
              </div>
            </div>
          </div>
          <div className={styles.btnDiv}>
            <Button
              type="submit"
              text="Schedule"
              className={styles.buttonSchedule}
            >
              Schedule
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ScheduleInterview;
