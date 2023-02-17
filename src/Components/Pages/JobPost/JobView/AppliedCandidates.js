import { faCalendarAlt, faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, IconButton } from "@mui/material";
import { Table } from "antd";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Styled from "./jobview.module.css";


const BaseURL = process.env.REACT_APP_API_URL1;

function  AppliedCandidates({JobData}) {


  const [loading, setLoading] = useState(true);
  const [candidates, setCandidate] = useState([]);
  const [filteredData, setFilteredData] = useState(candidates);

  useEffect(() => {
    // setLoading(true);
    fetch(
      `${BaseURL}/apply/list/${JobData.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      {
        mode: "cors",
      }
    )
      .then((response) => {
        if (!(response.status >= 200 && response.status < 300)) {
          throw new Error(response.status);
        }
        setLoading(false);
        return response.json();
      })
      .then((data) => {
        data = data.map((eachData) => {
          return {
            ...eachData,
            key: eachData?.id||4,
            email: eachData?.email || "abc@abc.com",
            name: `${eachData?.firstName} ${eachData?.lastName}`,
            contact: eachData?.phoneNumber,
            appliedDate: moment(eachData?.appliedDate).format('YYYY-MM-DD'),
            status: "Approved",
          };
        });
        setCandidate(data);
        setFilteredData(data);
      })
      .catch((err) => {
        if (err.Error > 400) {
          swal({
            title: "Server Down",
            icon: "error",
          });
        } else if (err.Error > 299) {
          swal({
            title: "Server Busy",
            icon: "error",
          });
        }
      });
  }, []);

  const columns = [
    {
      title: "Name",
      width: 200,
      dataIndex: "name",
      key: "type",
      sorter: (a, b) => a.name.localeCompare(b.name),
      // sorter: true,
    },
    {
      title: "Email",
      width: 200,
      dataIndex: "email",
      key: "type",
      sorter: (a, b) => a.email.localeCompare(b.email),
      // sorter: true,
    },
    {
      title: "Contact",
      width: 200,
      dataIndex: "contact",
      key: "type",
    },
    {
      title: "Applied Date",
      width: 200,
      dataIndex: "appliedDate",
      key: "type",
    },
    {
      title: "Status",
      width: 200,
      dataIndex: "status",
      key: "type",
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      responsive: ["md"],
      render: (text, record) => (
        <span      >
          {/* <Button onClick={() => handleViewJob(record)}>View</Button> */}
          
          <Link state={{ ...record}} to={`/view-profile`}>
            {
            /* <Button  variant='contained' 
            className={Styled.viewBtn}
            >
              Profile
            </Button> */
            }
            <IconButton >
              <FontAwesomeIcon icon={faUserGraduate} className={Styled.profileIcon}  />
            </IconButton>
          </Link>
          <Link state={{ ...record, JobData }} to={`/scheduleInterview`}>
            
            <IconButton >
              <FontAwesomeIcon icon={faCalendarAlt}   className={Styled.profileIcon} />
            </IconButton>

            {/* <Button  variant='contained' 
              className={Styled.viewBtn}
              >
              Schedule
            </Button> */}
          </Link>
         </span>
      ),
    },
  ];

  return (
    <>
      <Table
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "30", "40", "50"],
          defaultPageSize: 5,
        }}
        // scroll={{
        //   x:124,y: 224  }}
        loading={loading}
        className={Styled.JobTable}
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={filteredData}
      />
    </>
  );
}

export default AppliedCandidates;
