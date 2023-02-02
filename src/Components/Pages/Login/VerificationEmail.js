
import React, { useState, useEffect } from "react";
import mainlogo from './img/logo_5.png';
import styled from './css/signupandsignin.module.css';
import resetimg from './img/resetimg.svg';
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

function VerificationEmail() {

  const navigate = useNavigate();

  //validation code
  const [pin, setPin] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [hidden, setHidden] = useState(styled.hidden);
  const [hiddenButton, setHiddenButton] = useState('');
  const [hiddenResend, setHiddenResend] = useState(styled.hidden);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [btnText, setBtnText] = useState("Send OTP");

  const validatePin = (my_pin) => {
    let errors = {};
    if (!my_pin) {
      errors.pin = "Pin is required";
    } else if (my_pin.length !== 4) {
      errors.pin = "Pin must be 4 digits";
    } else if (!/^\d+$/.test(my_pin)) {
      errors.pin = "Pin must contain only numbers";
    }
    return errors;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validatePin(pin);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      const data = {
        email: email,
        otp: pin
      }
      fetch("http://authenticationserviceelastic-env.eba-pf8t7rhm.us-east-1.elasticbeanstalk.com/auth/otp-verification", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((response) => {
        if (response.status === 200) {
          sessionStorage.clear();
          response.json().then(function (result) {
            sessionStorage.setItem('user_email', result.email);
            navigate('/resetpassword');
          });
        }
        else if (response.status === 403) {
          swal(
            {
              title: "Incorrect PIN!",
              icon: "warning",
            });
        }
        else if (response.status === 401) {
          swal(
            {
              title: "OTP Expired!",
              icon: "warning",
            });
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

  const handleSendEmail = () => {
    setBtnDisabled(true);
    setBtnText("Sending.....");
    setHiddenResend(styled.hidden);
    const data = {
      email: email
    }

    fetch("http://authenticationserviceelastic-env.eba-pf8t7rhm.us-east-1.elasticbeanstalk.com/auth/otp-expire", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => {
      if (response.status === 200) {

        fetch("http://authenticationserviceelastic-env.eba-pf8t7rhm.us-east-1.elasticbeanstalk.com/auth/forgetpassword-link", {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }).then((response) => {
          if (response.status === 200) {
            setHidden('');
            setHiddenButton(styled.hidden);
            setReadOnly(true);
            console.log('OTP Expire After 10 Second!')
            setTimeout(() => {
              console.log('OTP Expired!')
              fetch("http://authenticationserviceelastic-env.eba-pf8t7rhm.us-east-1.elasticbeanstalk.com/auth/otp-expire", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              });
              setHiddenResend('');
            }, 60000);
          }
          else if (response.status === 403) {
            setBtnDisabled(false);
            setBtnText("Send OTP");
            swal(
              {
                title: "Email Not Found!",
                icon: "warning",
              });
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
      else if (response.status === 403) {
        setBtnDisabled(false);
        setBtnText("Send OTP");
        swal(
          {
            title: "Email Not Found!",
            icon: "warning",
          });
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
                  placeholder="Verification Email" readOnly={readOnly} />
              </div>
              {errors.email && <p className={styled.error}>{errors.email}</p>}
              <div className={`${styled.inputField} ${hidden}`}>
                <i className="fa-solid fa-key"></i>
                <input type="text"
                  value={pin} onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter Pin " />
              </div>
              {errors.pin && <p className={styled.error}>{errors.pin}</p>}
              <h6 className={`${styled.resendOtp} ${hiddenResend}`} onClick={handleSendEmail}>Resend Otp</h6>

              <button type="button" onClick={handleSendEmail} disabled={btnDisabled} className={`${styled.btn} ${styled.solid} ${hiddenButton}`} >{btnText}</button>
              <input type="submit" value="Verify" className={`${styled.btn} ${styled.solid} ${hidden}`} />
            </form>
          </div>
        </div>

        <div className={styled.panelsContainer}>
          <div className={`${styled.panel} ${styled.leftPanel}`}>
            <div className={styled.content}>
              <div className={styled.mainlogo}><img src={mainlogo}></img></div>
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