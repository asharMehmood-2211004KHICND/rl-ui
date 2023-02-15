import React from "react";
import { Rate, Spin } from 'antd';
import { useState } from "react";
import styles from "./InterviewerFeedback.module.css"
import { useNavigate, useParams } from "react-router-dom";
import { style } from "@mui/system";
import styled from "@emotion/styled";

export default function InterviewerFeedback() {
    const BaseURL = process.env.REACT_APP_API_URL4;
    const { interviewId } = useParams();
    const [rating, setRating] = useState(0);
    const [status, setStatus] = useState("");
    const [comment, setComment] = useState("Nice");
    const [loading, setLoading] = useState(false)
    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

    const handleSubmit = (event) => {
        setLoading(true)
        event.preventDefault();
        const feedbackForm = {
            id: interviewId,
            status: status,
            interviewer_feedback: comment
        }
        fetch(`${BaseURL}/interview`, {
            method: 'PUT',
            body: JSON.stringify(feedbackForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then((response) => {
            if (response.status === 200) {
                setLoading(false)
                console.log("Successfull");
                navigate('/interview-schedule')
            }
        }
        );
    }

    const handleStatusChange = (event) => {
        setStatus(event.target.value)
    }

    const handleCommentChange = (event) => {
        setComment(event.target.value)
    }

    const navigate = useNavigate()

    const onCancel = () => {
        navigate('/interview-schedule')
    }

    return (
        <>
            <div className={styles.outerDiv}>
                <h3>Rating and Review</h3>
                <form onSubmit={handleSubmit}>

                    <div className={styles.selection}>

                        <label className={styles.radLabel}>
                            <input className={styles.radInput} type="radio" id="accepted" name="rad" value="1" checked={status === "1"} onChange={handleStatusChange} />
                            <div className={`${styles.radDesign} ${styles.radDesignH}`}></div>
                            <div className={styles.radText}>Accepted</div>
                        </label>




                        <label className={styles.radLabel}>
                            <input className={styles.radInput} type="radio" id="rejected" name="rad" value="2" checked={status === "2"} onChange={handleStatusChange} />
                            <div className={styles.radDesign}></div>
                            <div className={styles.radText}>Rejected</div>
                        </label>

                    </div>
                    <div>
                        <div className={styles.ratingDiv}>
                            <div className={styles.rating1}>
                            <label className={styles.ratingCommentLabel}>Rating</label></div>
                            <div className={styles.rating2} >
                                <Rate tooltips={desc} onChange={setRating} value={rating} />
                                {rating ? <span className={styles.antRateStar}>{desc[rating - 1]}</span> : ''}
                            </div>


                        </div>
                        <div className={styles.commentDiv}>
                            <label className={styles.ratingCommentLabel}>Overall Comments</label>
                            <div className={styles.text1}>
                            <textarea className={styles.textArea} value={comment} onChange={handleCommentChange} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.innerDiv}>
                        {loading && <Spin/>}
                        <button className={styles.submitButton} type="submit">Submit</button>
                        <button onClick={onCancel} className={styles.cancelButton} type="button">Cancel</button>
                    </div>
                </form>

            </div>

        </>
    );
}