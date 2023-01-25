import { useState, useCallback, useEffect } from "react";
import DropdownField from "../DropdownField/DropdownField";
import InputField from "../InputField/InputField"
import PhoneComponent from "../PhoneComponent/PhoneComponent";
import Button from "../Button/Button";
import Heading from "../Heading/Heading";
import "./CandidatePersonalInfo.css";
import { AlertMessage } from "../AlertMessage/AlertMessage";
//import swal from 'sweetalert';


function CandidatePersonalInfo() {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [nin, setNin] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [maritalstat, setMaritalstat] = useState('');
    const [email, setEmail] = useState('dummy@email.com');
    const [phone, setPhone] = useState('');

    const [showAlert, setShowAlert] = useState(false)
    const [alertType, setalertType] = useState('alert');
    const [message, setMessage] = useState('')
    const [disableNextBtn, setDisableNextBtn] = useState(true)

    const [userData, setUserData] = useState(null);
    const signupServiceUrl = '';

    useEffect(() => {
        // fetch(signupServiceUrl)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log(data)
        //         setUserData(null)
        //     });
        //
        setEmail(sessionStorage.getItem("user_email"));
    }, [])

    

    const handleFirstname = useCallback(val => {
        setFirstname(val);
    }, []);

    const handleLastname = useCallback(val => {
        setLastname(val);
    }, []);

    const handleDob = useCallback(val => {
        setDob(val);
    }, []);

    const handleGender = useCallback(val => {
        setGender(val);
    }, []);

    const handleNin = useCallback(val => {
        setNin(val);
    }, []);

    const handleCity = useCallback(val => {
        setCity(val);
    }, []);

    const handleAddress = useCallback(val => {
        setAddress(val);
    }, []);

    const handleLinkedin = useCallback(val => {
        setLinkedin(val);
    }, []);

    const handleMaritalstat = useCallback(val => {
        setMaritalstat(val);
    }, []);

    const handlePhone = useCallback(val => {
        setPhone(val);
    }, []);

    const url = 'http://192.168.0.128:8080/api/personal-information'

    async function onSubmit(event) {
        event.preventDefault();

        const data = {
            firstName: firstname,
            lastName: lastname,
            dateOfBirth: dob,
            gender: gender,
            nationalIdentityNumber: nin,
            city: city,
            address: address,
            linkedProfile: linkedin,
            maritalStatus: maritalstat,
            phone: phone
        }

       

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
                setDisableNextBtn(!res)
                setTimeout(() => {
                    setShowAlert(false)
                }, "2000")

                // swal({
                //     title: "Personal Information Saved!",
                //     icon: "success",
                // })
            })
            .catch(err => {
                const updateUser = 'Error saving info!';
                const alertUser = 'danger';
                setShowAlert(true);
                setMessage(updateUser)
                setalertType(alertUser)
                setDisableNextBtn(true)
                setTimeout(() => {
                    setShowAlert(false)
                }, "2000")
            });
    }

    return (
        <>
            <div className="main-container">
                <form className="formpersonalinfo" onSubmit={onSubmit}>
                    {showAlert ? <AlertMessage showAlert={showAlert} setAlert={setShowAlert} alertType={alertType} message={message} /> : ''}
                    <Heading className="personal-info-heading" text="Personal Information" />
                    <table className="formTable">
                        <tr>
                            <td><InputField value={firstname} handler={handleFirstname} type='text' placeholder='First Name' pattern="[a-zA-Z ]*" className='first-name-input' required='required' icon='fa-solid fa-user'></InputField></td>
                            <td><InputField value={lastname} handler={handleLastname} type='text' placeholder='Last Name' pattern="[a-zA-Z ]*" className='last-name-input' required='required' icon='fa-regular fa-user'></InputField></td>
                        </tr>
                        <tr>
                            <td><DropdownField value={gender} handler={handleGender} options={['Male', 'Female']} placeholder='Gender' icon='fa-sharp fa-solid fa-person-dress' /></td>
                            <td><InputField value={dob} handler={handleDob} type='date' placeholder='' className='date-input' required='required' icon='fa-solid fa-calendar-days'></InputField> </td>
                        </tr>
                        <tr>
                            <td><InputField value={nin} handler={handleNin} type='text' pattern="[0-9]*" placeholder='CNIC/Nation ID' className='cnic-input' required='required' icon='fa-solid fa-address-card'></InputField></td>
                            <td><DropdownField value={maritalstat} handler={handleMaritalstat} options={['Single', 'Married']} placeholder='Marital Status' icon='fa-solid fa-heart' /></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><InputField disabled={true} value={email} type='email' placeholder='Email' className='email-input' required='required' icon='fa-solid fa-envelope'></InputField> </td>
                        </tr>
                        <tr>
                            <td colSpan="2"><PhoneComponent value={phone} handler={handlePhone} placeholder='Mobile Number' type='text' className='contact-input' required='required' /></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><InputField value={city} handler={handleCity} type='text' placeholder='City' pattern="[a-zA-Z ]*" className='city-input' required='required' icon='ffa-sharp fa-solid fa-city'></InputField> </td>
                        </tr>
                        <tr>
                            <td colSpan="2"><InputField value={address} handler={handleAddress} type='text' placeholder='Address' className='address-input' required='required' icon='fa-solid fa-location-dot'></InputField></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><InputField value={linkedin} handler={handleLinkedin} type='text' placeholder='LinkedIn Profile' className='linkedin-input' required='required' icon='fa-brands fa-linkedin'></InputField> </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <Button disabled={disableNextBtn} text="Next" type="button" className='next-button' />
                                <Button type="submit" text="Save" className='save-button' />
                            </td>
                        </tr>
                    </table>



                </form>
            </div>
        </>

    )
}

export default CandidatePersonalInfo;