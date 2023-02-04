import React, { useEffect, useState } from 'react';
import { Table, Input, DatePicker, Popconfirm } from 'antd';
import {SearchOutlined, FilterOutlined} from "@ant-design/icons";
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faExpand, faClone } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import './JobList.css';
import styled from "./JobList.module.css"
import swal from "sweetalert";
import { IconButton } from '@mui/material';
import env from "react-dotenv";

const CustomColor ={
  iconColor: {color:"#f0f0f0"},
  edit:   "rgb(50, 145, 240) ",
  view:   "#f1f8ff",
  viewText:   "#f1f8ff",
  deleteIcon:"#ff4747",
  coneIcone: "rgb(50, 145, 240)"
}

const { RangePicker } = DatePicker;

const JobsList = ({jobsProp}) => {

 
  const [jobs, setJobs] = useState([]);
  const [filteredData, setFilteredData] = useState(jobs);
  const [searchText, setSearchText] = useState('');
  const [filteredDate, setFilteredDate] = useState([]);

  useEffect(() => {  
    fetch(
      `http://jobserviceelasticservice-env.eba-nivmzfat.ap-south-1.elasticbeanstalk.com/job/all`,
      // `http://localhost:5000/job/post`,
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
      .then((response) =>{
        if(!(response.status>=200 && response.status<300) ){
          throw new Error(response.status);
        }  
        return response.json()
      })
      .then((data) => {
        setJobs(data);
        setFilteredData(data);
      })
      .catch((err) => {
        if(err.Error>400){
          swal(
            {
              title: "Server Down",
              icon: "error",
            });
        }
        else if(err.Error>299){
          swal({
            title: "Server Busy",
            icon: "error",
          });
        }
      });
  }, [])
  

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setFilteredData(
      jobs.filter(job => job.title.toLowerCase().includes(selectedKeys[0].toLowerCase()))
    );
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
    setFilteredData(jobs);
  };

  const handleDateChange = (dates, dateStrings) => {
    setFilteredDate(dateStrings);
    setFilteredData(
      jobs.filter(
        job => moment(job.expireDate).isBetween(moment(dateStrings[0]), moment(dateStrings[1]))
      )
    );
  };
  const handlePostDateChange = (dates, dateStrings) => {
    setFilteredDate(dateStrings);
    setFilteredData(
      jobs.filter(
        job => moment(job.postDate).isBetween(moment(dateStrings[0]), moment(dateStrings[1]))
      )
    );
  };


  const handleDeleteJob = job => {
    fetch(
      `http://jobserviceelasticservice-env.eba-nivmzfat.ap-south-1.elasticbeanstalk.com/job/delete/${job.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      },
      {
        mode: "cors",
      }
    )
      .then((response) => {
        if(!(response.status>=200 && response.status<300) ){
          throw new Error(response.status);
        }
        setJobs(job.filter(j => j !== job));
        setFilteredData(filteredData.filter(j => j !== job));
      })
      .catch((err) => {
        if(err.Error>400){
          swal(
            {
              title: "Server Down",
              icon: "error",
            });
        }
        else if(err.Error>299){
          swal({
            title: "Server Busy",
            icon: "error",
          });
        }
      });
  };

  const handleCreateClone = job=>{
    
    const {id , ...data} = job; 
    const requestData = {
      title: data.title,
      department: data.department,
      employementCategory: data.employementCategory, // ["FULL_TIME","ONLINE"],
      gender: data.gender, //["MALE","FEMALE"],
      traveling: data.traveling,
      location: data.location,
      softSkills: data.softSkills.map((ss) => {
        return  ss.softSkill ;
      }),
      technicalSkills: data.technicalSkills.map((ts) => {
        return  ts.technicalSkill ;
      }),
      closeDate: data.closeDate, //"2023-01-30"
      description: data.description,
      responsibilitiess: data.responsibilitiess.map((rs) => {
        return  rs.responsibility ;
      }),
      educations: data.educations.map((edu) => {
        return edu.education;
      }),
      benefitPerkss: data.benefitPerkss.map((pb) => {
        return  pb.benefitPerks;
      }),
      experienceLevel: parseInt(data.experienceLevel),
      vacancyCount: data.vacancyCount,
    };

    fetch(
      `http://jobserviceelasticservice-env.eba-nivmzfat.ap-south-1.elasticbeanstalk.com/job/post`,
      // `http://localhost:5000/job/post`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      },
      {
        mode: "cors",
      }
    )
      .then((response) =>{
        if(!(response.status>=200 && response.status<300) ){
          throw new Error(response.status);
        }  
        return response.json()
      })
      .then((data) => {
        swal({
            title: "Job Cloned sucessfully!",
            icon: "success",
        });

        setJobs(prev=>[data, ...prev ]);
        setFilteredData(prev=>[data, ...prev ]);

      })
      .catch((err) => {
        if(err.Error>400){
          swal(
            {
              title: "Server Down",
              icon: "error",
            });
        }
        else if(err.Error>299){
          swal({
            title: "Server Busy",
            icon: "error",
          });
        }
      });
  }
  const columns = [    
    {     title: 'Title',
          dataIndex: 'title', 
          key: 'title',
     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) =>
      (        
        <div style={{ padding: 8 }}>
          <Input placeholder="Search Title" value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      filterIcon: filtered => (
        <SearchOutlined style={CustomColor.iconColor} />

        // <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record.title.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
         if (visible) {
           setTimeout(() => {
             document.getElementById('titleSearch').select();
           });
         }
  },
  render: text =>
    searchText ? (
      <span>
        {text
          .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))
          .map((fragment, i) =>
            fragment.toLowerCase() === searchText.toLowerCase() ? (
              <span key={i} className="highlight">
                {fragment}
              </span>
            ) : (
              fragment
            )
          )}
      </span>
    ) : (
      text
    ),
  },
  {
    title: 'Department',
    dataIndex: 'department',
    key: 'type',
  }, {
    title: 'Applied Candidates',
    dataIndex: 'appliedCandidate',
    key: 'appliedCandidate',
  },
  {
    title: 'Post Date',
    dataIndex: 'postDate',
    key: 'postDate',
    render: text => <span>{moment(text).format('YYYY-MM-DD')}</span>,
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <RangePicker onChange={handlePostDateChange} />
      </div>
    ),
    filterIcon: filtered => (
      <FilterOutlined style={CustomColor.iconColor} />
    ),
  },
  {
    title: 'End Date',
    dataIndex: 'expireDate',
    key: 'expireDate',
    render: text => <span>{moment(text).format('YYYY-MM-DD')}</span>,
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <RangePicker onChange={handleDateChange} />
      </div>
    ),
    filterIcon: filtered => (
      <FilterOutlined style={CustomColor.iconColor} />
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span >
        {/* <Button onClick={() => handleViewJob(record)}>View</Button> */}
        <Link state={{ ...record }} to={`/job/view/${record.id}`}>
          <Button  variant='contained' style={{backgroundColor:CustomColor.view, color: CustomColor.edit }}>
            View
          </Button>
        </Link>
        <Link state={{...record }} to="/job/update">
        <IconButton  style={{color: CustomColor.edit}}>
          <FontAwesomeIcon icon={faEdit}/>
        </IconButton>
        </Link>
        <Popconfirm
            title="Do you need a Clone of this Job?"
            onConfirm={() => handleCreateClone(record)}
            okText="Yes"
            cancelText="No"
          >
          <IconButton >
            <FontAwesomeIcon icon={faClone} style={{color:CustomColor.coneIcone}} />
          </IconButton>
        </Popconfirm>
        <Popconfirm
            title="Are you sure delete this job?"
            onConfirm={() => handleDeleteJob(record)}
            okText="Yes"
            cancelText="No"
          >
          <IconButton >
            <FontAwesomeIcon icon={faTrash} style={{color:CustomColor.deleteIcon}} />
          </IconButton>
        </Popconfirm>
        
      </span>
    ),
  },
];

return <Table
   rowKey={(record) => record.uid} 
   columns={columns} 
   dataSource={filteredData} />;
};

export default JobsList;



      