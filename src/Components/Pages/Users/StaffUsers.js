import React, { useEffect, useState } from 'react'
import styles from './Users.module.css'
import Button from '../profile/Button/Button';
import { useNavigate, Link } from 'react-router-dom';
import { Table, Spin } from 'antd';
import { IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faUserSecret, faUserShield, faUserTie } from '@fortawesome/free-solid-svg-icons';


const interviewerURL = `${process.env.REACT_APP_API_URL2}/user/getByRole/2`
const hmURL = `${process.env.REACT_APP_API_URL2}/user/getByRole/3`

const columns = [
  {
      title: 'S.No.',
      dataIndex: 'index',
      key: 'index'
  },
  {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
  },
  {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
  },
  {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
  }
];

const StaffUsers = () => {
    const navigate = useNavigate();

  const [view, setView] = useState('interviewer')
  const [active, setActive] = useState(0)

  const [interviewerData, setInterviewerData] = useState([])
  const [hmData, setHmData] = useState([])

  const fetchData = async (url, setData) => {
    const response = await fetch(url);
    const data = await response.json()
    if(response.status >= 200 && response.status <300){
      const newData = data.map((item, i) => {return {...item, index:i+1}} )
      setData(newData);
    }
    else 
      setData([]);
  }

  useEffect(() => {
    fetchData(interviewerURL, setInterviewerData)
    fetchData(hmURL, setHmData)

  }, [])

  let table;

  switch(view) {
    case 'interviewer':
      table = <Table className={styles.antTable} dataSource={interviewerData} columns={columns} />
      break;
    case 'hm':
      table = <Table className={styles.antTable} dataSource={hmData} columns={columns} />
      break;
    default:
      table = <Table className={styles.antTable} dataSource={interviewerData} columns={columns} />
      break;
  }

  return (
    <>
    <div className={styles.JobsTableHeading}>
      <h1>Create Staff User</h1>
      <Link to="/createStaff">
        <IconButton >
              <FontAwesomeIcon icon={faCirclePlus} className={styles.addBtn}  />
        </IconButton>
      </Link>
    </div>
    {/* <div className={styles.navBtnContainer}>
      <Button onClick={() => { navigate('/createStaff') }} text="Create Staff User" type="button" className={styles.navBtn} />
    </div> */}
    <div className={styles.navBtnContainer}>
      <Button onClick={() => { setView("interviewer"); setActive(0) }} text={<><FontAwesomeIcon icon={faUserTie}/> Interviewers</>} type="button" className={active === 0 ? styles.active : styles.navBtn} />
      <Button onClick={() => { setView("hm"); setActive(1) }} text={<><FontAwesomeIcon icon={faUserSecret}/> Hiring Managers</>} type="button" className={active === 1 ? styles.active : styles.navBtn} />
      
    </div>
    {table}
    </>
  )
}

export default StaffUsers