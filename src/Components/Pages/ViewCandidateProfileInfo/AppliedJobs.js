import Button from '../profile/Button/Button';
import Heading from '../profile/Heading/Heading';
import styles from './ViewCandidateProfileInfo.module.css'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// `http://192.168.0.98:8080/interview/getByJob/1`
const WaqarUrl = process.env.REACT_APP_API_URL1;
const HunainUrl = 'http://192.168.0.98:8080'

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

const AppliedJobs = () => {

    const userId = sessionStorage.getItem("user_id")

    const scheduleInterviewUrl = `${HunainUrl}/interview/getByCandidate/${userId}`;
    const jobUrl = `${WaqarUrl}/apply/list/getJob/${userId}`

    const [jobsData, setJobsData] = useState([jobsMock]);
    const [scheduleData, setScheduleData] = useState([]);

    const fetchData = (url, setData) => {
        fetch(url)
            .then(async (response) => {
                const data = await response.json();
                setData(data);
            })
            .catch((error) => {
                console.log(error, "I caught this!")
            })
    }

    useEffect(() => {
        fetchData(jobUrl, setJobsData);
        fetchData(scheduleInterviewUrl, setScheduleData)
    }, [])

    const newList = []

    return (
        <>
            <div className={styles.contentBody}>
                <div className={styles.center}><Heading
                    text={"Applied Jobs"}
                    className={''}
                /></div>
                <table className={styles.dataTable} >
                    <thead>
                        <tr>
                            <th>Job Title</th>
                            <th>Interviewer</th>
                            <th>Interview Date</th>
                            <th>Interview Time</th>
                            <th>Status</th>
                            <th>Feedback</th>
                            <th>Schedule</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobsData.length === 0 &&
                            <tr><td style={{ textAlign: 'center', color: '#000' }} colSpan={7}>No Data</td></tr>}
                        {jobsData.map((element) => {
                            const { id, title } = element
                            return (
                                <tr key={id}>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div >
        </>
    )

}

export default AppliedJobs