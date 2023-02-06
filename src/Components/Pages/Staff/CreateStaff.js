import { Button } from "@mui/material";
import { useState, useCallback } from "react";
import DropdownField from "../profile/DropdownField/DropdownField";
import InputField from "../profile/InputField/InputField";
import styles from "./CreateStaff.module.css";
import Male from "../../images/male.png";
import swal from 'sweetalert';


const CreateStaff = () => {

    const [first_name, setfirst_name] = useState('');
    const [last_name, setlast_name] = useState('');
    const [email, setEmail] = useState('');
    const [nic, setNic] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');
    const [designation, setDesignation] = useState('');
    const [role, setRole] = useState('Hello');
    const [errors, setErrors] = useState({});


    const validate = (values) => {
        let errors = {};
        if (!values.email) {
            errors.email = "Email address is required";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Email address is invalid";
        } else if (/^\d/.test(values.email)) {
            errors.email = "Email should not contain number in start";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 8) {
            errors.password = "Password must be 8 or more characters";
        } else if (!/\d/.test(values.password)) {
            errors.password = "Password must contain atleast 1 number";
        } else if (!/[!@#$%&?]/g.test(values.password)) {
            errors.password = "Password must contain atleast 1 special character";
        } else if (!/[A-Z]/g.test(values.password)) {
            errors.password = "Password must contain atleast 1 capital letter";
        }
        if (!values.first_name) {
            errors.first_name = "First Name is required";
        }
        else if (/[!@#$%&?]/g.test(values.first_name) || /\d/.test(values.first_name)) {
            errors.first_name = "First Name should not contain numbers or any special character";
        }
        if (values.last_name) {
            if (/[!@#$%&?]/g.test(values.last_name) || /\d/.test(values.last_name)) {
                errors.last_name = "Last Name should not contain numbers or any special character";
            }
        }
        return errors;
    }

    const roleOptions = [
        {
            "label": "Interviewer",
            "value": 2
        },
        {
            "label": "Hiring Manager",
            "value": 3
        }
    ]


    const handlefirst_name = useCallback(val => {
        setfirst_name(val);
    }, []);

    const handlelast_name = useCallback(val => {
        setlast_name(val);
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

    const handleRole = useCallback(e => {
        setRole(e.target.value);
    }, []);

    const url = "http://localhost:8080/creatstaff"

    async function onSubmit(event) {
        event.preventDefault();

        const errors = validate({ email, password, first_name, last_name });
        setErrors(errors);

        const data = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            cnic: nic,
            gender: gender,
            date_of_birth: dob,
            password: password,
            designation: designation,
            role: role
        }

        const signupData = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            role: {
                id: role
            }
        }

        fetch("http://authenticationserviceelastic-env.eba-pf8t7rhm.us-east-1.elasticbeanstalk.com/auth/register", {
            method: 'POST',
            body: JSON.stringify(signupData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then((response) => {
            if (response.status == 200) {
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
                        swal({
                            title: "User Created Successfully!",
                            icon: "success",
                            buttons: {
                                confirm: { text: 'Login', className: 'btn' },
                            },
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        swal({
                            title: "Error saving info!",
                            icon: "error",
                        }
                        );
                    });
            }
            else if (response.status == 409) {
                swal(
                    {
                        title: "This Email Already Registered!",
                        icon: "warning",
                    });
            }
            else if (response.status == 404) {
                swal({
                    title: "Server Not Responding!",
                    icon: "error",
                }
                );
            }
        }
        );
    }
    return (
        <>
            <div className={styles.mainContainer}>
                <form className={styles.formCreateStaff} onSubmit={onSubmit}>
                    <h1 className={styles.createStaffHeading}>Create User</h1>
                    <table className={styles.table}>
                        <tr>
                            <td ><label >First Name:</label></td>
                            <td colSpan="3"><InputField value={first_name} handler={handlefirst_name} type='text' placeholder='First Name' pattern='[a-zA-Z]*' className={styles.halfSize} required='required' icon='fa-solid fa-user'></InputField></td>
                            <td></td>
                            <td ><label>Last Name: </label></td>
                            <td></td>
                            <td colSpan=""><InputField value={last_name} handler={handlelast_name} type='text' placeholder='Last Name' pattern='[a-zA-Z]*' className={styles.halfSize} required='required'></InputField></td>
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
                            {/* <td><DropdownField value={roles} handler={handleRoles} options={['Interviewer','Hiring Manager']} placeholder='Roles' className={styles.halfSize} required='required' icon='fa-solid fa-tasks'></DropdownField>
                            </td> */}
                            <td><select value={role} onChange={handleRole} className={styles.halfSize}>
                                {roleOptions.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select></td>

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