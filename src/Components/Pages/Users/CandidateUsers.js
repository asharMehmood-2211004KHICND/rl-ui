import React, { useEffect, useState } from 'react'
import styles from './Users.module.css'
import Button from '../profile/Button/Button';
import { useNavigate } from 'react-router-dom';
import { Table, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck, faUser } from '@fortawesome/free-solid-svg-icons';


const allCandidatesURL = `${process.env.REACT_APP_API_URL2}/user/getByRole/1`
const activeCandidatesURL = `${process.env.REACT_APP_API_URL3}/api/personal_information`

const allColumns = [
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

const activeColumns = [
  {
      title: 'S.No.',
      dataIndex: 'index',
      key: 'index'
  },
  {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text, record) => `${text} ${record.lastName}`
  },
  {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
  },
  {
      title: 'Date of Birth',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
  },
  {
      title: 'City',
      dataIndex: 'city',
      key: 'city'
  },
  {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
  }
];

const CandidateUsers = () => {
  const [view, setView] = useState('all')
  const [active, setActive] = useState(0)

  const [allData, setAllData] = useState([])
  const [activeData, setActiveData] = useState([])

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
    fetchData(allCandidatesURL, setAllData)
    fetchData(activeCandidatesURL, setActiveData)

  }, [])

  let table;

  switch(view) {
    case 'all':
      table = <Table className={styles.antTable} dataSource={allData} columns={allColumns} />
      break;
    case 'active':
      table = <Table className={styles.antTable} dataSource={activeData} columns={activeColumns} />
      break;
    default:
      table = <Table className={styles.antTable} dataSource={allData} columns={allColumns} />
      break;
  }

  return (
    <>
    <div className={styles.navBtnContainer}>
      <Button onClick={() => { setView("all"); setActive(0) }} text={<><FontAwesomeIcon icon={faUser}/> Registered Candidates</>} type="button" className={active === 0 ? styles.active : styles.navBtn} />
      <Button onClick={() => { setView("active"); setActive(1) }} text={<><FontAwesomeIcon icon={faUserCheck}/> Active Candidates</>} type="button" className={active === 1 ? styles.active : styles.navBtn} />
      
    </div>
    {table}
    </>
  )
}

export default CandidateUsers