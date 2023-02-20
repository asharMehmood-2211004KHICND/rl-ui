import Heading from '../profile/Heading/Heading';
import styles from './InterviewerInterviewSchedule.module.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import { render } from '@testing-library/react';

const HunainUrl = process.env.REACT_APP_API_URL4;

const interviewStatus = [{status: 'Pending', color: '#ff8c00'}, 
    {status: 'Approved', color: 'green'}, 
    {status: 'Rejected', color: 'red'}
]

const InterviewerInterviewSchedule = () => {
    const userId = sessionStorage.getItem("user_id")

    const scheduleInterviewUrl = `${HunainUrl}/interview/getByInterviewer/${userId}`;

    const [scheduleData, setScheduleData] = useState([]);

    const fetchData = (url, setData) => {
        fetch(url)
            .then(async (response) => {
                const data = await response.json();
                setData(data);
                console.log(data)
            })
            .catch((error) => {
                console.log(error, "I caught this!")
            })
    }

    useEffect(() => {
        fetchData(scheduleInterviewUrl, setScheduleData)
    }, [])

    const columns = [
        {
            title: 'Job Title',
            dataIndex: 'jobTitle',
            key: 'jobTitle',
            render: (text, record) => <Link to={`/candidate/job/view/${record.jobId}`}><span className={styles.link}>{text}</span></Link>,
            
        },
        {
            title: 'Candidate',
            dataIndex: 'candidate_name',
            key: 'candidate_name',
        },
        {
            title: 'Interview Date',
            dataIndex: 'interview_date',
            key: 'interview_date',
        },
        {
            title: 'Interview Time',
            dataIndex: 'interview_time',
            key: 'interview_time',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => <span style={{color: interviewStatus[text].color, fontWeight: '500', textTransform: 'uppercase'}}>{interviewStatus[text].status}</span>,
        },
        {
            title: 'Your comments',
            dataIndex: 'interviewer_feedback',
            key: 'interviewer_feedback',
            render: (text, record) => text === null ? <Link to={`/interviewer-feedback/${record.id}`}><span className={styles.link}>Give feedback</span></Link> : text,
        },
        {
            title: 'Candidate Feedback',
            dataIndex: 'candidate_feedback',
            key: 'candidate_feedback',
            render: (text, record) => text === null ? '---' : text,
        },
    ];

    return (
        <>
            <div className={styles.contentBody}>
                <div className={styles.center}><Heading
                    text={"Interviews you have to take"}
                    className={''}
                /></div>
                <Table className={styles.antTable} dataSource={scheduleData} columns={columns} />
                {/* <table className={styles.dataTable} >
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Job Title</th>
                            <th>Interviewer</th>
                            <th>Interview Date</th>
                            <th>Interview Time</th>
                            <th>Status</th>
                            <th>Interviewer Feedback</th>
                            <th>Your Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scheduleData.length === 0 &&
                            <tr><td style={{ textAlign: 'center', color: '#000' }} colSpan={8}>No Data</td></tr>}
                        {scheduleData.map((element, i) => {
                            const { id, jobId, jobTitle, status } = element
                            return (
                                <tr key={id}>
                                    <td>{i + 1}</td>
                                    <td><Link to={`/candidate/job/view/${jobId}`}>{jobTitle}</Link></td>
                                    <td>{element['interviewer_name']}</td>
                                    <td>{element['interview_date']}</td>
                                    <td>{element['interview_time']}</td>
                                    <td>{interviewStatus[status]}</td>
                                    {status === 0 ? <td colSpan={2}>Interview not conducted yet</td> :
                                        <>
                                            <td>{element['interviewer_feedback'] === null ? '---' : element['interviewer_feedback']}</td>
                                            <td>{element['candidate_feedback'] === null ? 'feedback link' : element['candidate_feedback']}</td>
                                        </>
                                    }
                                </tr>
                            );
                        })}
                    </tbody>
                </table> */}
            </div >
        </>
    )
}

export default InterviewerInterviewSchedule;