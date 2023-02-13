import React, { useEffect, useState } from 'react'
import styles from './ViewCandidateProfileInfo.module.css'
import Heading from '../profile/Heading/Heading';
import Button from '../profile/Button/Button';

const FileUrl = process.env.REACT_APP_API_URL3;
// const FileUrl = 'http://192.168.0.129:5000';

export default function CertificateTab({ certificatesData }) {

    const downloadFileUrl = `${FileUrl}/api/file/download`

    const onDownload = (fileName) => {
        window.location.href = `${downloadFileUrl}/${fileName}`
    }
    return (
        <div className={styles.contentBody}>
            <div className={styles.center}><Heading
                text={"Certificates"}
                className={''}
            /></div>
            <table className={styles.dataTable} >
                <thead>
                    <tr>
                        <th>File Name</th>
                        <th>Category</th>
                        <th>Download</th>
                    </tr>
                </thead>
                <tbody>
                    {certificatesData.length === 0 &&
                    <tr><td style={{textAlign: 'center', color: '#000'}} colSpan={3}>No Data</td></tr>}
                    {certificatesData.map((element) => {
                        return (
                            <tr key={element.id}>
                                <td><i className="fa-regular fa-file-pdf" style={{ margin: "0px 10px", color: "red", fontSize: "1.3rem" }}></i>{element.originalFileName}</td>
                                <td>{element.category}</td>
                                <td>
                                    <Button
                                        onClick={() => onDownload(element.bucketFileName)}
                                        type="button"
                                        text={<i className="fa-solid fa-cloud-arrow-down"></i>}
                                        className={styles.downBtn}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div >
    )
}