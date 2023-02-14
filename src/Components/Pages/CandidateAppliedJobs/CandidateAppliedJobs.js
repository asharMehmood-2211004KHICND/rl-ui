import Heading from '../profile/Heading/Heading';
import styles from './CandidateAppliedJobs.module.css'
import { useState, useEffect } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';

const WaqarUrl = process.env.REACT_APP_API_URL1;

const jobsMock = [
    {
        name: 'Dunkin Donuts job',
        interviewer: "Saeed",
        Date: '11/7/22',
        Time: '22:00',
        status: 'pending',
        schedule: "",
        feedback: "Candidates' can give feedback to interviewer",
    },
    {
        name: 'Dunkin Donuts job',
        interviewer: "Saeed",
        Date: '11/7/22',
        Time: '22:00',
        status: 'pending',
        schedule: "",
        feedback: "Candidates' can give feedback to interviewer",
    }
]

const CandidateAppliedJobs = () => {

    const userId = sessionStorage.getItem("user_id")

    const jobUrl = `${WaqarUrl}/apply/list/getJob/${userId}`

    const [jobsData, setJobsData] = useState([]);

    const fetchData = (url, setData) => {
        fetch(url)
            .then(async (response) => {
                const data = await response.json();
                const newData = data.map((item) => {
                    const {id, title, closeDate, status} = item 
                    const obj = {
                        id, title, closeDate, 
                        status: status ? status : 'Pending' 
                    }
                    return obj
                })
                setData(newData);
            })
            .catch((error) => {
                console.log(error, "I caught this!")
            })
    }

    useEffect(() => {
        fetchData(jobUrl, setJobsData);
    }, [])

    const columns = [
        {
            title: 'Job Title',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => <Link to={`/candidate/job/view/${record.id}`}><span className={styles.link}>{text}</span></Link> 
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Closing Date',
            dataIndex: 'closeDate',
            key: 'closeDate',
            render: (text) => moment(text).format('DD-MM-YYYY')
        }
    ];

    return (
        <>
            <div className={styles.contentBody}>
                <div className={styles.center}><Heading
                    text={"Applied Jobs"}
                    className={''}
                /></div>
                <Table className={styles.antTable} dataSource={jobsData} columns={columns} />
            </div >
        </>
    )

}

export default CandidateAppliedJobs