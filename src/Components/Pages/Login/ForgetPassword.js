
import React, { useState } from "react";
import mainlogo from './img/logo_5.png';
import styled from './css/signupandsignin.module.css';
import resetimg from './img/reset_img2.svg';
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

function SignupSignin() {

  const navigate = useNavigate();

  //validation code
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [eyeMode, setEyeMode] = useState('fa-eye');
  const [passwordType, setPasswordType] = useState("password");


  const validate = (values) => {
    let errors = {};

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
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    }
    else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "New password and Confirm Password should match";
    }

    return errors;
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate({ password, confirmPassword });
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      const data = {
        email: sessionStorage.getItem('forget_email'),
        password: password
      }
      fetch("http://authenticationserviceelastic-env.eba-pf8t7rhm.us-east-1.elasticbeanstalk.com/auth/forgetpassword", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((response) => {
        if (response.status === 200) {
          swal(
            {
              title: "Password Updated Successfully!",
              icon: "success",
            });
          sessionStorage.clear();
          navigate('/login');
        }
        else if (response.status === 404) {
          swal({
            title: "Server Not Responding!",
            icon: "error",
          }
          );
        }
      }
      );
    }
  }

  const handleEyeMode = () => {
    if (eyeMode === 'fa-eye') {
      setEyeMode('fa-eye-slash');
      setPasswordType("text");
    }
    else {
      setEyeMode('fa-eye');
      setPasswordType("password");
    }
  }
  //end here
  return (
    <>
      <div className={styled.container}>
        <div className={`${styled.formsContainer} ${styled.forget_password_form}`}>
          <div className={styled.signinSignup}>
            <form action="#" className={`${styled.formLogin} ${styled.signInForm} ${styled.main_form}`} onSubmit={handleSubmit}>
              <h2 className={styled.title}>Reset Password</h2>

              <div className={`${styled.inputField} ${styled.password_show}`}>
                <i className="fas fa-lock"></i>
                <input type={passwordType}
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="New Password" />
                <i className={`${styled.eye_show} fa-solid ${eyeMode}`} onClick={handleEyeMode}></i>
              </div>
              {errors.password && <p className={styled.error}>{errors.password}</p>}
              <div className={styled.inputField}>
                <i className="fas fa-lock"></i>
                <input type={passwordType}
                  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password" />
              </div>
              {errors.confirmPassword && <p className={styled.error}>{errors.confirmPassword}</p>}
              <input type="submit" value="Change" className={`${styled.btn} ${styled.solid}`} />
            </form>
          </div>
        </div>
        <div className={styled.panelsContainer}>
          <div className={`${styled.panel} ${styled.leftPanel}`}>
            <div className={styled.content}>
              <div className={styled.mainlogo}><img src={mainlogo}></img></div>
            </div>
            <img id="resetimg" src={resetimg} className={styled.image} alt="" />
          </div>

        </div>
      </div>
    </>
  )

}
export default SignupSignin;