import Heading from "../profile/Heading/Heading"
import styles from './ViewCandidateProfileInfo.module.css'

const CertificatesTab = ({ certificatesData }) => {
    return (
        <div className={styles.contentBody}>
            <div className={styles.center}><Heading
                text={"Certificates"}
                className={''}
            /></div>
            <div style={{ justifyContent: 'center' }} className={styles.card}>
                {certificatesData.length === 0 && 'No Data'}
                {certificatesData.map(({ id }) => {
                    return (<div key={id}>Hello World</div>)
                })}
            </div>
        </div>
    )
}

export default CertificatesTab