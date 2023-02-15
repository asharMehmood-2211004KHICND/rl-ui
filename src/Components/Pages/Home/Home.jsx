import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Home.css'
import swal from "sweetalert";
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import WorkIcon from '@mui/icons-material/Work';

export default function Home() {

  //console.log((sessionStorage.getItem("data")));
  const BaseURL = process.env.REACT_APP_API_URL1;
  const BaseURL2 = process.env.REACT_APP_API_URL2;
  const BaseURL3 = process.env.REACT_APP_API_URL3;
  const BaseURL4 = process.env.REACT_APP_API_URL4;


  const [total, setTotal] = useState({ "opening": 0, "profile": 0, "interviewsPending": 0, "registeredUsers": 0 });

  useEffect(() => {
    //Count of Opening
    fetch(
      `${BaseURL}/job/all`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      },
      {
        mode: "cors",
      }
    )
      .then((response) => {
        if (!(response.status >= 200 && response.status < 300)) {
          throw new Error(response.status);
        }
        return response.json()
      })
      .then((data) => {
        data = data.map(eachData => { return { ...eachData } })
        setTotal(prev => { return { ...prev, "opening": data.length } });

        //setFilteredData(data);
        //setLoading(false);
      })
      .catch((err) => {
        if (err.Error >= 400) {
          swal(
            {
              title: "Server Down",
              icon: "error",
            });
        }
        else if (err.Error >= 299) {
          swal({
            title: "Server Busy",
            icon: "error",
          });
        }
      });
    //Count of Active Profiles
    fetch(
      `${BaseURL3}/api/personal_information`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      },
      {
        mode: "cors",
      }
    )
      .then((response) => {
        if (!(response.status >= 200 && response.status < 300)) {
          throw new Error(response.status);
        }
        return response.json()
      })
      .then((data) => {
        data = data.map(eachData => { return { ...eachData } })
        setTotal(prev => { return { ...prev, "profile": data.length } });

        //setFilteredData(data);
        //setLoading(false);
      })
      .catch((err) => {
        if (err.Error >= 400) {
          swal(
            {
              title: "Server Down",
              icon: "error",
            });
        }
        else if (err.Error >= 299) {
          swal({
            title: "Server Busy",
            icon: "error",
          });
        }
      });
    //Count of Interviews Pending
    fetch(
      `${BaseURL4}/interview`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      },
      {
        mode: "cors",
      }
    )
      .then((response) => {
        if (!(response.status >= 200 && response.status < 300)) {
          throw new Error(response.status);
        }
        return response.json()
      })
      .then((data) => {
        data = data.map(eachData => { return { ...eachData } })
        setTotal(prev => { return { ...prev, "interviewsPending": data.length } });

        //setFilteredData(data);
        //setLoading(false);
      })
      .catch((err) => {
        if (err.Error >= 400) {
          swal(
            {
              title: "Server Down",
              icon: "error",
            });
        }
        else if (err.Error >= 299) {
          swal({
            title: "Server Busy",
            icon: "error",
          });
        }
      });

    //Count of Registered User
    fetch(
      `${BaseURL2}/user/getByRole/1`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      },
      {
        mode: "cors",
      }
    )
      .then((response) => {
        if (!(response.status >= 200 && response.status < 300)) {
          throw new Error(response.status);
        }
        return response.json()
      })
      .then((data) => {
        data = data.map(eachData => { return { ...eachData } })
        setTotal(prev => { return { ...prev, "registeredUsers": data.length } });

        //setFilteredData(data);
        //setLoading(false);
      })
      .catch((err) => {
        if (err.Error >= 400) {
          swal(
            {
              title: "Server Down",
              icon: "error",
            });
        }
        else if (err.Error >= 299) {
          swal({
            title: "Server Busy",
            icon: "error",
          });
        }
      });

  }, [])



  return (
    <div>
      <div className='hcards'>
        <div className='card'>
          <div className='cardupper'>
            <p className='cardtitle'>Openings</p>
            <h2 className='cardcount'>{total.opening}</h2>
            <p className='carddetails'><Link to='/job/all' className='link'>Details...</Link></p>
          </div>
          <div className='cardlower'>
            <QueuePlayNextIcon className='cardicon' />
          </div>
        </div>

        <div className='card'>
          <div className='cardupper'>
            <p className='cardtitle'>Candidates</p>
            <h2 className='cardcount'>{total.registeredUsers}</h2>
            <p className='carddetails'><Link to='/interview-schedule' className='link'>Details...</Link></p>
          </div>
          <div className='cardlower'>
            <PeopleIcon className='cardicon' />
          </div>
        </div>

        <div className='card'>
          <div className='cardupper'>
            <p className='cardtitle'>Active Profiles</p>
            <h2 className='cardcount'>{total.profile}</h2>
            <p className='carddetails'><Link to='/' className='link'>Details...</Link></p>
          </div>
          <div className='cardlower'>
            <PersonAddIcon className='cardicon' />
          </div>
        </div>

        <div className='card'>
          <div className='cardupper'>
            <p className='cardtitle'>Interviews</p>
            <h2 className='cardcount'>{total.interviewsPending}</h2>
            <p className='carddetails'><Link to='/interview-schedule' className='link'>Details...</Link></p>
          </div>
          <div className='cardlower'>
            <WorkIcon className='cardicon' />
          </div>
        </div>
      </div>
    </div>
  )
}
