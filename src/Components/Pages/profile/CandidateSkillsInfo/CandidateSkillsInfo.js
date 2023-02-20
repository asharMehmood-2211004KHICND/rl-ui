import React, { useCallback, useEffect, useRef, useState } from "react";
import Heading from "../Heading/Heading";
import styles from "../CandidateAcademicInfo/CandidateAcademicInfo.module.css";
import InputField from "../InputField/InputField";
import DropdownField from "../DropdownField/DropdownField";
import Button from "../Button/Button";
import { message, Popconfirm, Spin } from "antd";
import style from "./CandidateSkillsInfo.module.css";
import { useNavigate } from "react-router-dom";

const BaseURL = process.env.REACT_APP_API_URL3;

const fileCategories = ["Front-end", "Back-end", "Data Science", "UI/UX", "Other"]

export default function CandidateskillInfo() {
  const [skill, setSkill] = useState("");
  const [level, setLevel] = useState("");
  const [skillData, setSkillData] = useState([]);
  const [certificate, setCertificate] = useState("");
  const [certificateData, setCertificateData] = useState([]);
  const [category, setCategory] = useState("")
  const [deleteId, setDeleteId] = useState(null);

  // -------------xxxxxxxxxx-----------certificate-xxxxxxxxxxxx-----------
  const [deleteFileId, setDeleteFileId] = useState();
  const [userId, setUserId] = useState(sessionStorage.getItem("user_id"));

  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [skillLoading, setSkillLoading] = useState(false)
  const [skillDeleting, setSkillDeleting] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const [disDoneBtn, setDisDoneBtn] = useState(true)

  const fileRef = useRef();

  const basicRoute = `${BaseURL}/api/users/skills`;
  const getSkillsbyUserId = `${basicRoute}/${userId}`;
  const postUrl = `${basicRoute}`
  const deleteUrl = `${basicRoute}/${deleteId}`


  const fileRoute = `${BaseURL}/api/file`

  const fileUploadUrl = `${fileRoute}/upload`
  const getAllFilesUrl = `${fileRoute}/user/${userId}`
  const downloadFileUrl = `${fileRoute}/download`
  const deleteFileUrl = `${fileRoute}/delete/${deleteFileId}`

  useEffect(() => {
    const fetchSkills = () => {
      fetch(getSkillsbyUserId)
        .then(async (response) => {
          console.log(response);
          const data = await response.json();
          console.log(data);
          setSkillData(data);
          if (data.length !== 0) {
            setDisDoneBtn(false)
          }
        })
        .catch((err) => {
          console.log("Hello! I caught this error.");
        });
    }
    fetchSkills()

    const fetchCertificates = () => {
      fetch(getAllFilesUrl)
        .then(async (response) => {
          console.log(response);
          const data = await response.json();
          console.log(data);
          setCertificateData(data);
        })
        .catch((err) => {
          console.log("Hello! I caught this error.");
        });
    }
    fetchCertificates()
  }, []);

  const handleskill = useCallback((value) => {
    setSkill(value);
  }, []);

  const handleLevel = useCallback((value) => {
    setLevel(value);
  }, []);
  const handleCertificate = useCallback((value) => {
    setCertificate(value);
  }, []);
  const handleCategory = useCallback((value) => {
    setCategory(value);
  }, []);


  const onSubmit = (e) => {
    e.preventDefault();
    for (let element of skillData) {
      if (element.skill === skill) {
        alert(`${skill} Already exists`);
        setSkill("");
        setLevel("");
        return;
      }
    }

    setSkillLoading(true)

    const obj = {
      userId,
      skill,
      proficiency: level
    }

    console.log(obj);
    fetch(postUrl, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(obj),
    })
      .then(async (response) => {
        const data = await response.json();
        setSkillLoading(false)
        console.log(response);
        console.log(data)
        const res = response ? response.ok : false;
        const updateUser = res
          ? "Info saved successfully!"
          : "Error saving info!";
        // setDisNextBtn(!res);
        if (res) {
          messageApi.success(updateUser);
        } else {
          messageApi.error(updateUser);
        }
        setSkillData([...skillData, data]);
        setDisDoneBtn(false)
      })
      .catch((err) => {
        setSkillLoading(false)
        console.log(err);
        const updateUser = "Error saving info!";
        messageApi.error(updateUser);
        // setDisNextBtn(true);
      });

    setSkill("");
    setLevel("");
  };

  const onDelete = (id) => {
    setDeleteId(id);
  };

  const deleteField = () => {
    setSkillDeleting(true)
    fetch(deleteUrl, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then((response) => {
        const res = response ? response.ok : false;
        console.log(response);
        setSkillDeleting(false)
        if (res) {
          messageApi.success("Details deleted successfully!");
          const newData = skillData.filter((item) => item.id !== deleteId);
          if (newData.length === 0) {
            setDisDoneBtn(true)
          }
          setSkillData(newData);
        }
        else {
          messageApi.error("Error deleting details!");
        }

        setDeleteId(null);
      })
      .catch((err) => {
        messageApi.error("Error deleting details!");
        console.log(err);
        setSkillDeleting(false)
        setDeleteId(null);
      });
  };

  const dontDeleteField = () => {
    setDeleteId(null)
  }

  //-----------xxxxxxxxx Cerificate Methods xxxxxxxxxxxxx----------------

  const onUpload = (e) => {
    e.preventDefault();
    if (certificate) {
      setLoading(true)
      uploadFile(certificate, certificate.name, userId, category)
      setCertificate("");
      setCategory("")
      fileRef.current.value = null;
    }

  };

  const uploadFile = (cert, filename, userId, category) => {
    let formData = new FormData();

    formData.append('file', cert);
    formData.append('user_id', userId);
    formData.append('filename', filename);
    formData.append('category', category);

    fetch(fileUploadUrl, {
      method: "POST",
      mode: "cors",
      body: formData,
    })
      .then(async response => {
        const data = await response.json();
        console.log(data)
        setLoading(false)
        const res = response ? response.ok : false;
        const updateUser = res
          ? "certificate saved successfully!"
          : "Error saving certificate!";
        // setDisNextBtn(!res);
        if (res) {
          setCertificateData([...certificateData, data])
          messageApi.success(updateUser);
        } else {
          messageApi.error(updateUser);
        }

      })
      .catch(err => {
        setLoading(false)
        console.log(err);
        const updateUser = "Error saving certificate!";
        messageApi.error(updateUser);
      });
  }

  const deleteFile = () => {
    // const newFileData = certificateData.filter((item) => item.id !== deleteFileId);
    //       setCertificateData(newFileData);
    setDeleting(true)
    fetch(deleteFileUrl, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then(async (response) => {
        const res = response ? response.ok : false;
        setDeleting(false)
        console.log(response);
        if (res) {
          messageApi.success("certificate deleted successfully!");
          const newFileData = certificateData.filter((item) => item.id !== deleteFileId);
          setCertificateData(newFileData);
        }
        else {
          messageApi.error("Error deleting certificate!");
        }

        setDeleteFileId(null);
      })
      .catch((err) => {
        messageApi.error("Error deleting certificate!");
        setDeleting(false)
        console.log(err);
        setDeleteFileId(null);
      })
  }

  const dontDeleteFile = () => {
    setDeleteFileId(null)
  }

  const onDeleteFile = (id) => {
    setDeleteFileId(id)
  }

  const onDownload = (fileName) => {
    window.location.href = `${downloadFileUrl}/${fileName}`
  }

  const navigate = useNavigate();
  const onBack = () => {
    navigate("/work-experience")
  }

  const onDone = () => {
    navigate("/")
  }

  return (
    <>
      {contextHolder}
      <div className={styles.mainContainer} style={{ display: "block" }}>
        <form className={styles.formPersonalInfo} onSubmit={onSubmit}>
          <Heading className={styles.personalInfoHeading} text="Skills" optional={'(Required)'} />
          <table className={styles.formTable}>
            <tr>
              <td>
                <InputField
                  value={skill}
                  handler={handleskill}
                  type="text"
                  placeholder="skill"
                  className={styles.halfSize}
                  required="required"
                />
              </td>
              <td>
                <DropdownField
                  value={level}
                  handler={handleLevel}
                  options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                  placeholder="Level"
                  className={''}
                />
              </td>
              <td>
                <Button type="submit" text="Add" className={styles.saveButton} />

              </td>
              <td>{skillLoading && <Spin />}</td>
              {/* <Heading className={styles.personalInfoHeading} text="Skills" /> */}
            </tr>
          </table>
        </form>
      </div>
      <div className={styles.mainContainer} style={{ display: 'block' }}>
        <div className={styles.tableContainer}>
          <table className={styles.eduTable}>
            <thead>
              <tr>
                <th>S.no</th>
                <th>Skills</th>
                <th>Proficiency</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {skillData.length === 0 && <tr>
                <td style={{ textAlign: 'center' }} colSpan={4}>No data to show</td>
              </tr>}
              {skillData.map((element, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{element["skill"]}</td>
                    <td>{element["proficiency"]}</td>
                    <td>
                      <Popconfirm
                        title="Delete details"
                        description="Are you sure to delete this details?"
                        onConfirm={deleteField}
                        onCancel={dontDeleteField}
                        okText="Yes"
                        cancelText="No"
                      >
                        {deleteId === element.id & skillDeleting ? <Spin /> :
                          <Button
                            onClick={() => onDelete(element.id)}
                            type="button"
                            text={<i class="fa fa-trash"></i>}
                            className={`${styles.actionBtn} ${styles.deleteBtn}`}
                          />}
                      </Popconfirm>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ----------------xxxxxxxxxxxxx-------------------- */}

      <div className={styles.mainContainer} style={{ display: "block" }}>
        <form className={styles.formPersonalInfo} onSubmit={onUpload}>
          {/* <Heading className={`${styles.personalInfoHeading} ${style.certificatHeading}`} text="Add Certificates" type="medium" /> */}
          <Heading className={`${styles.personalInfoHeading} ${style.certificatHeading}`} text="Certificates" optional="(Optional)" />
          <table className={styles.formTable}>
            <tr>
              <td>
                <InputField
                  refling={fileRef}
                  accept=".pdf, .odf"
                  // value={certificate}
                  handler={handleCertificate}
                  type="file"
                  placeholder="Certificate"
                  className={`${styles.halfSize} ${style.certificateField}`}
                />
              </td>
              <td>
                <DropdownField
                  value={category}
                  handler={handleCategory}
                  options={fileCategories}
                  placeholder="Category"
                  className={''}
                />
              </td>
              <td>
                <Button type="submit" text="Upload" className={styles.saveButton} />
                
              </td>
              <td>{loading && <Spin />}</td>
              {/* <Heading className={styles.personalInfoHeading} text="Certificates" optional="(Optional)" /> */}
            </tr>
          </table>
        </form>
      </div>
      <div className={styles.mainContainer} style={{ display: 'block' }}>
        <div className={styles.tableContainer}>
          <table className={styles.eduTable} >
            <thead>
              <tr>
                <th>S.no</th>
                <th>Certificates</th>
                <th>Category</th>
                <th colSpan='2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {certificateData.length === 0 && <tr>
                <td style={{ textAlign: 'center' }} colSpan={5}>No data to show</td>
              </tr>}
              {certificateData.map((element, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{element.originalFileName}</td>
                    <td>{element.category}</td>
                    <td>
                      <Button
                        onClick={() => onDownload(element.bucketFileName)}
                        type="button"
                        text={<i className="fa-solid fa-cloud-arrow-down"></i>}
                        className={`${styles.actionBtn} ${style.downloadBtn}`}
                      />
                    </td>
                    <td>
                      <Popconfirm
                        title="Delete File"
                        description="Are you sure to delete this file?"
                        onConfirm={deleteFile}
                        onCancel={dontDeleteFile}
                        okText="Yes"
                        cancelText="No"
                      >
                        {deleting && deleteFileId === element.id ? <Spin /> :
                          <Button
                            onClick={() => onDeleteFile(element.id)}
                            type="button"
                            text={<i className="fa fa-trash"></i>}
                            className={`${styles.actionBtn} ${styles.deleteBtn}`}
                          />}
                      </Popconfirm>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button onClick={onBack} text="Back" type="button" className={styles.nextButton} />
        <Button disabled={disDoneBtn} onClick={onDone} text="Done" type="button" className={styles.nextButton} />
      </div>
    </>
  );
}
