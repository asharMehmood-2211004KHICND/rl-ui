import Heading from '../profile/Heading/Heading';
import styles from './CandidateAppliedJobs.module.css'
import { useState, useEffect } from 'react';

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
                setData(data);
            })
            .catch((error) => {
                console.log(error, "I caught this!")
            })
    }

    useEffect(() => {
        fetchData(jobUrl, setJobsData);
    }, [])

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
                            <th>S.No.</th>
                            <th>Job Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobsData.length === 0 &&
                            <tr><td style={{ textAlign: 'center', color: '#000' }} colSpan={7}>No Data</td></tr>}
                        {jobsData.map((element, i) => {
                            const { id, title } = element
                            return (
                                <tr key={id}>
                                    <td>{i+1}</td>
                                    <td>{title}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div >
        </>
    )

}

export default CandidateAppliedJobs