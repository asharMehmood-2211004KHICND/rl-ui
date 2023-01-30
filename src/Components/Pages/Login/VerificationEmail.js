
import React, { useState } from "react";
import mainlogo from './img/logo_5.png';
import styled from './css/signupandsignin.module.css';
import resetimg from './img/resetimg.svg';

function VerificationEmail() {

  //validation code
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});


  const validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }
    return errors;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate({ email });
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      // If there are no errors, make the login request to the server
    }
  }
  //end here
  return (
    <>

      <div className={styled.container}>
        <div className={styled.formsContainer}>
          <div className={styled.signinSignup}>
            <form action="#" className={`${styled.formLogin} ${styled.signInForm} ${styled.main_form}`} onSubmit={handleSubmit}>
              <h2 className={styled.title}>Enter Email </h2>
              <div className={styled.inputField}>
                <i className="fa-solid fa-user"></i>
                <input type="text"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Verification Email" />
              </div>
              {errors.email && <p className={styled.error}>{errors.email}</p>}
              <input type="submit" value="Send Link" className={`${styled.btn} ${styled.solid}`} />
            </form>
          </div>
        </div>

        <div className={styled.panelsContainer}>
          <div className={`${styled.panel} ${styled.leftPanel}`}>
            <div className={styled.content}>
              <div className={styled.mainlogo}><img src={mainlogo}></img></div>
              <p>

              </p>
              <a href="/">
                <button className={`${styled.btn} ${styled.transparent}`} >
                  Sign In
                </button>
              </a>
            </div>
            <img id="resetimg" src={resetimg} className={styled.image} alt="" />
          </div>

        </div>
      </div>
    </>
  )

}
export default VerificationEmail;