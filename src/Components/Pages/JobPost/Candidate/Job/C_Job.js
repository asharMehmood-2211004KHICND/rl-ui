import * as React from "react";
import Card from "@mui/material/Card";
import {  Button, Tag } from "antd";
import { CiHeart } from 'react-icons/ci';
import styled from "./C_Job.module.css";
import moment from "moment/moment";
import { Link } from 'react-router-dom';
import logo from '../../../../Header/image.png'

export default function Job({ job }) {
  const isNew = Date.now() - Date.parse(job.postDate) < 604800000;
  // const companyLogo = "https://picsum.photos/200";
  
  // const momentDate = moment(job.postDate);

  return (
    <div className={styled.JobCard}>
      <Card className={styled.muiCard} sx={{ minWidth: 275 }}>

        <div
          style={{ display: "flex", marginBottom: 16 }}
        >
               <div>
            <img src={logo} className={styled.logoImg}   />
          </div>
          <div style={{ marginLeft: 16 }}>
     
           <h3 style={{ margin: 0 }}>{job.title}
              {isNew &&
              <Tag style={{ marginLeft: 8 }} className={styled.newTag}>
                NEW
              </Tag>}
            </h3>
            <p style={{ margin: 0, fontSize: 12 }}>{job.companyName}</p>
            <p style={{ margin: 0, fontSize: 12 }}>
              {job.location} | {moment(job.postDate).fromNow()}
            </p>
            <div className={styled.locationDate}>
              {job.employementCategory?.map((category,i)=>
                { return <Tag  className={styled.categoryTag} key={i}>{category}</Tag>}
              )}
            </div>
            <div
            
              className={styled.description}
            >
              {job.description}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background:
                    "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))",
                  height: 50,
                }}
              />
            </div>

            {/* <CardActions> */}
              <div>
          <Link state={{ ...job }} to={`/candidate/job/view/${job.id}`}>

              <Button type="link" className={styled.DetailBtn} size="small">View More</Button>
          </Link>
              </div>
            {/* {isNew && ( */}
              
            {/* )} */}
          </div>
          <div
            style={{
              marginLeft: "auto",
            }}
          >
            {/* <FontAwesomeIcon icon={faHeart} /> */}
            {/* <FontAwesomeIcon
              icon={faHeart  }
              style={{ fontSize: 20, marginRight: 8 }}
            /> */}
            <CiHeart className={styled.HeartIcon} />
          </div>
        </div>
      </Card>
    </div>
  );
}


