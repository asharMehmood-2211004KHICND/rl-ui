import { Button } from "@mui/material";
import { useState, useCallback } from "react";
import DropdownField from "../profile/DropdownField/DropdownField";
import InputField from "../profile/InputField/InputField";
import styles from "./CreateStaff.module.css";
import Male from "../../images/male.png";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const BaseURL = process.env.REACT_APP_API_URL2;


// function isValidIDCardNumber(idCardNumber) {
//     const idCardNumberRegex = /^\d{10}$/;
//     return idCardNumberRegex.test(idCardNumber);
//   }

const CreateStaff = () => {
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
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
        if (!values.firstName) {
            errors.first_name = "First Name is required";
        }
        else if (/[!@#$%&?]/g.test(values.firstName) || /\d/.test(values.firstName)) {
            errors.first_name = "First Name should not contain numbers or any special character";
        }
        if (values.lastName) {
            if (/[!@#$%&?]/g.test(values.lastName) || /\d/.test(values.lastName)) {
                errors.last_name = "Last Name should not contain numbers or any special character";
            }
        }
        if (!values.gender) {
            errors.gender = "Select Your Gender";
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

    const genderOptions = [
        {
            "label": "Male",
            "value": 1
        },
        {
            "label": "Female",
            "value": 2
        }
    ]

    const designationOption = [
        {
            "label": "Manager",
            "value": 1
        },
        {
            "label": "Trainer",
            "value": 2
        },
        {
            "label": "Developer",
            "value": 3
        },
        {
            "lable": "Data Engineer",
            "value": 4
        },
    ]



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

    const handleGender = useCallback(e => {
        setGender(e.target.value);
    }, []);

    const handleDob = useCallback(val => {
        setDob(val);
    }, []);

    const handlePassword = useCallback(val => {
        setPassword(val);
    }, []);

    const handleDesignation = useCallback(e => {
        setDesignation(e.target.value);
    }, []);

    const handleRole = useCallback(e => {
        setRole(e.target.value);
    }, []);

    const url = "http://createstaffelasticbean-env.eba-aftp3we4.ap-south-1.elasticbeanstalk.com/creatstaff"

    async function onSubmit(event) {
        event.preventDefault();

        const errors = validate({ email, password, firstName, lastName });
        setErrors(errors);
        // if (Object.keys(errors).length === 0) {
            const data = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                cnic: nic,
                gender: gender,
                date_of_birth: dob,
                password: password,
                designation: designation,
                role: role
            }

            const signupData = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                role: {
                    id: role
                }
            }

            fetch(`${BaseURL}/auth/register`, {
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
        // }
    }

    const onCancel = () => {
        navigate('/users/staff')
    }

    return (
        <>
            <div className={styles.mainContainer}>
                <div>
                    <h1 className={styles.createStaffHeading}>Create User</h1>
                </div>
                <form className={styles.formCreateStaff} onSubmit={onSubmit}>
                    <div className={styles.form_row}>
                        <div className={styles.form_column}>
                            <div className={styles.row}>
                                <div className={styles.column}>
                                    <label>First Name:</label>
                                    <InputField value={firstName} handler={handleFirstname} type='text' placeholder='First Name' pattern='[a-zA-Z]*' className={styles.halfSize} ></InputField>
                                </div>
                                {errors.first_name && <p className={styles.error}>{errors.first_name}</p>}
                            </div>
                            <div className={styles.row}>
                                <div className={styles.column}>
                                    <label>Email:</label>
                                    <InputField value={email} handler={handleEmail} type='text' placeholder='Email' className={styles.halfSize} icon='fa-solid fa-envalope'></InputField>
                                </div>
                                {errors.email && <p className={styles.error}>{errors.email}</p>}
                            </div>
                            <div className={styles.row}>
                                <div className={styles.column}>
                                    <label>CNIC:</label>
                                    <InputField value={nic} handler={handleNic} type='text' pattern="[0-9]*" placeholder='CNIC/Nation ID' className={styles.halfSize} icon='fa-solid fa-address-card'></InputField>
                                </div>
                                {errors.email && <p className={styles.error}>{errors.email}</p>}
                            </div>
                            <div className={styles.row}>
                                <div className={styles.column}>
                                    <label>Password:</label>
                                    <InputField value={password} handler={handlePassword} type='password' placeholder='Password' className={styles.halfSize} icon='fa-solid fa-key'></InputField>
                                </div>
                                {errors.email && <p className={styles.error}>{errors.email}</p>}
                            </div>
                            <div className={styles.row}>
                                <div className={styles.column}>
                                    <label>Gender:</label>
                                    <select value={gender} onChange={handleGender} className={`${styles.halfSize} ${styles.select}`}>
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                {errors.email && <p className={styles.error}>{errors.email}</p>}
                            </div>
                            
                        </div>
                        <div className={styles.form_column}>
                            <div className={styles.row}>
                                <div className={styles.column}>
                                    <label>Last Name:</label>
                                    <InputField value={lastName} handler={handleLastname} type='text' placeholder='Last Name' pattern='[a-zA-Z]*' className={styles.halfSize} ></InputField>
                                </div>
                                {errors.last_name && <p className={styles.error}>{errors.last_name}</p>}
                            </div>
                            {/* <div className={styles.row}>
                                <div className={styles.picColumn}>
                                    <img className={styles.usericon} src={Male} />
                                </div>
                            </div> */}
                            <div className={styles.row}>
                                <div className={styles.column}>
                                    <label className={styles.dob_label}>Date of Birth:</label>
                                    <InputField value={dob} handler={handleDob} type='date' placeholder='Date of Birth' className={styles.halfSize} icon='fa-solid fa-calendar-days'></InputField>
                                </div>
                                {errors.email && <p className={styles.error}>{errors.email}</p>}
                            </div>
                            <div className={styles.row}>
                                <div className={styles.column}>
                                    <label>Role:</label>
                                    <select value={role} onChange={handleRole} className={`${styles.halfSize} ${styles.select}`}>
                                        <option value="">Select Roles</option>
                                        {roleOptions.map((option) => (
                                            <option className={styles.option} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                </div>
                                {errors.email && <p className={styles.error}>{errors.email}</p>}
                            </div>
                            <div className={styles.row}>
                                <div className={styles.column}>
                                    <label>Designation:</label>
                                    <select value={designation} onChange={handleDesignation} className={`${styles.halfSize} ${styles.select}`}>
                                        <option value="">Select Designation</option>
                                        {designationOption.map((option) => (
                                            <option className={styles.option} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                </div>
                                {errors.email && <p className={styles.error}>{errors.email}</p>}
                            </div>
                        </div>
                    </div>
                    <div className={styles.btnDiv}>
                        <Button type="submit" text="Save" className={styles.saveButtonStaff}>Submit</Button>
                        <Button onClick={onCancel} type="button" text="Save" className={styles.saveButtonStaff}>Cancel</Button>
                    </div>
                </form>
                {/* <form className={styles.formCreateStaff} onSubmit={onSubmit}>
                    <h1 className={styles.createStaffHeading}>Create User</h1>
                    <table className={styles.table}>
                        <tr>
                            <td ><label >First Name:</label></td>
                            <td colSpan="3"><InputField value={firstName} handler={handleFirstname} type='text' placeholder='First Name' pattern='[a-zA-Z]*' className={styles.halfSize} ></InputField>
                                {errors.first_name && <p className={styles.error}>{errors.first_name}</p>}
                            </td>
                            <td></td>
                            <td ><label>Last Name: </label></td>
                            <td></td>
                            <td colSpan=""><InputField value={lastName} handler={handleLastname} type='text' placeholder='Last Name' pattern='[a-zA-Z]*' className={styles.halfSize} ></InputField>
                                {errors.last_name && <p className={styles.error}>{errors.last_name}</p>}
                            </td>
                        </tr>
                        <tr>
                            <td><label className={styles.label}>Email:</label></td>
                            <td colSpan="5"><InputField value={email} handler={handleEmail} type='text' placeholder='Email' className={styles.maxSize} icon='fa-solid fa-envalope'></InputField>
                                {errors.email && <p className={styles.error}>{errors.email}</p>}
                            </td>
                            <td></td>
                            <td rowSpan="3"><img className={styles.usericon} src={Male} /></td>

                        </tr>
                        <tr>
                            <td><label className={styles.label}>CNIC/ID:</label></td>
                            <td colSpan="5"><InputField value={nic} handler={handleNic} type='text' pattern="[0-9]*" placeholder='CNIC/Nation ID' className={styles.maxSize} icon='fa-solid fa-address-card'></InputField></td>
                        </tr>
                        <tr>
                            <td><label className={styles.label}>Password:</label></td>
                            <td colSpan="5"><InputField value={password} handler={handlePassword} type='password' placeholder='Password' className={styles.maxSize} icon='fa-solid fa-key'></InputField>
                                {errors.password && <p className={styles.error}>{errors.password}</p>}
                            </td>
                        </tr>
                        <tr>
                            <td><label className={styles.label}>Gender: </label></td>
                            <td>
                                <select value={gender} onChange={handleGender} className={`${styles.halfSize} ${styles.select}`}>
                                    <option value="">Select Gender</option>
                                    {genderOptions.map((option) => (
                                        <option className={styles.option} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                                {errors.gender && <p className={styles.error}>{errors.gender}</p>}
                            </td>
                            <td></td>
                            <td><label className={styles.label}>Date of Birth: </label></td>
                            <td></td>
                            <td><InputField value={dob} handler={handleDob} type='date' placeholder='Date of Birth' className={styles.halfSize} icon='fa-solid fa-calendar-days'></InputField></td>

                        </tr>
                        <tr>
                            <td><label className={styles.label}>Designation: </label></td>
                            <td>
                                <select value={designation} onChange={handleDesignation} className={`${styles.halfSize} ${styles.select}`}>
                                    <option value="">Select Designation</option>
                                    {designationOption.map((option) => (
                                        <option className={styles.option} value={option.value}>{option.label}</option>
                                    ))}
                                </select></td>
                            <td><label className={styles.label}>Role: </label></td>
                            <td>
                                <select value={role} onChange={handleRole} className={`${styles.halfSize} ${styles.select}`}>
                                    <option value="">Select Roles</option>
                                    {roleOptions.map((option) => (
                                        <option className={styles.option} value={option.value}>{option.label}</option>
                                    ))}
                                </select></td>

                        </tr>
                    </table>
                    <div className={styles.buttonContainerStaff}>
                        <Button type="submit" text="Save" className={styles.saveButtonStaff}>Submit</Button>
                    </div>
                </form> */}

            </div>
        </>
    );
};

export default CreateStaff;