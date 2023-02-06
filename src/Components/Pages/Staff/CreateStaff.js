import { Button } from "@mui/material";
import { useState, useCallback } from "react";
import DropdownField from "../profile/DropdownField/DropdownField";
import InputField from "../profile/InputField/InputField";
import styles from "./CreateStaff.module.css";
import Male from "../../images/male.png";
import { AlertMessage } from "../profile/AlertMessage/AlertMessage.js";


const CreateStaff = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [nic, setNic] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');
    const [designation, setDesignation] = useState('');
    const [roles, setRoles] = useState('');

    const [showAlert, setShowAlert] = useState(false)
    const [alertType, setalertType] = useState('alert');
    const [message, setMessage] = useState('')



    const handleFirstname = useCallback(val => {
        setFirstName(val);
    }, []);

    const handleLastname = useCallback(val => {
        setLastName(val);
    }, []);

    const handleEmail = useCallback(val => {
        setEmail(val);
    }, []);

    const handleNic = useCallback(val => {
        setNic(val);
    }, []);

    const handleGender = useCallback(val => {
        setGender(val);
    }, []);

    const handleDob = useCallback(val => {
        setDob(val);
    }, []);

    const handlePassword = useCallback(val => {
        setPassword(val);
    }, []);

    const handleDesignation = useCallback(val => {
        setDesignation(val);
    }, []);

    const handleRoles = useCallback(val => {
        setRoles(val);
    }, []);

    const url = "http://localhost:8080/creatstaff"

    async function onSubmit(event) {
        event.preventDefault();

        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            cnic: nic,
            gender: gender,
            date_of_birth: dob,
            password: password,
            designation: designation,
            role: roles
        }

        console.log(data)
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        })
            .then(response => {
                console.log(response);
                const res = response ? response.ok : false;
                const updateUser = res ? 'Info saved successfully!' : 'Error saving info!';
                const alertUser = res ? 'info' : 'danger';
                setShowAlert(true);
                setMessage(updateUser)
                setalertType(alertUser)
                setTimeout(() => {
                    setShowAlert(false)
                }, "2000")

                // swal({
                //     title: "Personal Information Saved!",
                //     icon: "success",
                // })
            })
            .catch(err => {
                console.log(err)
                const updateUser = 'Error saving info!';
                const alertUser = 'danger';
                setShowAlert(true);
                setMessage(updateUser)
                setalertType(alertUser)
                setTimeout(() => {
                    setShowAlert(false)
                }, "2000")
            });
    }
    


    return (
        <>
            <div className={styles.mainContainer}>
                <form className={styles.formCreateStaff} onSubmit={onSubmit}>
                    {showAlert ? <AlertMessage showAlert={showAlert} setAlert={setShowAlert} alertType={alertType} message={message} /> : ''}
                    <h1 className={styles.createStaffHeading}>Create User</h1>
                    <table className={styles.table}>
                        <tr>
                            <td ><label >First Name:</label></td>
                            <td colSpan="3"><InputField value={firstName} handler={handleFirstname} type='text' placeholder='First Name' pattern='[a-zA-Z]*' className={styles.halfSize} required='required' icon='fa-solid fa-user'></InputField></td>
                            <td></td>
                            <td ><label>Last Name: </label></td>
                            <td></td>
                            <td colSpan=""><InputField value={lastName} handler={handleLastname} type='text' placeholder='Last Name' pattern='[a-zA-Z]*' className={styles.halfSize} required='required'></InputField></td>
                        </tr>
                        <tr>
                            <td><label className={styles.label}>Email:</label></td>
                            <td colSpan="5"><InputField value={email} handler={handleEmail} type='text' placeholder='Email' className={styles.maxSize} required='required' icon='fa-solid fa-envalope'></InputField></td>
                            <td></td>
                            <td rowSpan="3"><img className={styles.usericon} src={Male} /></td>

                        </tr>
                        <tr>
                            <td><label className={styles.label}>CNIC/ID:</label></td>
                            <td colSpan="5"><InputField value={nic} handler={handleNic} type='text' pattern="[0-9]*" placeholder='CNIC/Nation ID' className={styles.maxSize} required='required' icon='fa-solid fa-address-card'></InputField></td>
                        </tr>
                        <tr>
                            <td><label className={styles.label}>Password:</label></td>
                            <td colSpan="5"><InputField value={password} handler={handlePassword} type='password' placeholder='Password' className={styles.maxSize} required='required' icon='fa-solid fa-key'></InputField>
                            </td>
                        </tr>
                        <tr>
                            <td><label className={styles.label}>Gender: </label></td>
                            <td colSpan="3"><DropdownField handler={handleGender} value={gender} options={['Male', 'Female']} className={styles.halfSize} placeholder='Gender' icon='fa-sharp fa-solid fa-person-dress' /></td>
                            <td></td>
                            <td><label className={styles.label}>Date of Birth: </label></td>
                            <td></td>
                            <td><InputField value={dob} handler={handleDob} type='date' placeholder='Date of Birth' className={styles.halfSize} required='required' icon='fa-solid fa-calendar-days'></InputField></td>

                        </tr>
                        <tr>
                            <td><label className={styles.label}>Designation: </label></td>
                            <td colSpan="3"><DropdownField value={designation} handler={handleDesignation} options={['Manager', 'Trainer', 'Developer', 'Data Engineer']} placeholder='Designation' className={styles.halfSize} required='required' icon='fa-solid fa-level-up'></DropdownField></td>
                            <td></td>
                            <td><label className={styles.label}>Roles: </label></td>
                            <td></td>
                            <td><DropdownField value={roles} handler={handleRoles} options={['Hiring Manager', 'Interviewer']} placeholder='Roles' className={styles.halfSize} required='required' icon='fa-solid fa-tasks'></DropdownField>
                            </td>
                            
                        </tr>
                    </table>
                    <div className={styles.buttonContainerStaff}>
                        <Button type="submit" text="Save" className={styles.saveButtonStaff}>Submit</Button>
                    </div>
                </form>

            </div>
        </>
    );
};

export default CreateStaff;