import React from "react";
import styles from "./AddJobHMandInterviewers.module.css";
import { Button } from "@mui/material";
import { useState, useCallback } from "react";
import ReactSelect from "react-select";

const AddJobHMandInterviewers = () => {
  const [hiringManager, sethiringManager] = useState("");
  const [interviewer, setInterviewer] = useState("");
  const [errors, setErrors] = useState({});

  const validate = (values) => {
    let errors = {};
    if (!values.hiringManager) {
      errors.hiringManager = "Select Hiring Manager";
    }
    if (!values.interviewer) {
      errors.interviewer = "Select Interviewer";
    }
    return errors;
  };

  const handleHiringManager = useCallback((e) => {
    sethiringManager(e.target.value);
  }, []);

  const handleInterviewer = useCallback(e => {
    setInterviewer(e.target.value);
  }, []);

  async function onSubmit(event) {
    event.preventDefault();

    const errors = validate({ hiringManager, interviewer});
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      const data = {
        hiringManager: hiringManager,
        interviewer: interviewer
      };
    }
  }

  const selectHiringMangerOption = [
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
    }
  ];

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
    }
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
                  <label>Select Hiring Manager:</label>
                  <select
                    value={hiringManager}
                    onChange={handleHiringManager}
                    className={`${styles.halfSize} ${styles.select}`}
                  >
                    <option value="">Select Hiring Manager</option>
                    {selectHiringMangerOption.map((option) => (
                      <option className={styles.option} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.hiringManager && (
                  <p className={styles.error}>{errors.hiringManager}</p>
                )}
              </div>
              {/* <div className={styles.row}>
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
              </div> */}
              <ReactSelect className={styles.option} value={selectInterviewerOption.value} 
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              onChange={handleInterviewer}
              allowSelectAll={true}
              ></ReactSelect>
            </div>
          </div>
          <div className={styles.btnDiv}>
            <Button
              type="submit"
              text="Add"
              className={styles.buttonSchedule}
            >
              ADD
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddJobHMandInterviewers;
