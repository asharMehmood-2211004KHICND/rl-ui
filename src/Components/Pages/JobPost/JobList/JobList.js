import React, { useEffect, useState } from 'react';
import { Table, Input, DatePicker, Popconfirm } from 'antd';
import {SearchOutlined, FilterOutlined} from "@ant-design/icons";
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faExpand } from '@fortawesome/free-solid-svg-icons';
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
  deleteIcon:"#ff4747"
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
        console.log(data)
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
        // else{
        //   console.log("fdkmfk" +type(err.Error));
        //   swal({
        //     title: "Job posted sucessfully!",
        //     icon: "success",
        // });
        // }
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

  const handleViewJob = (record) => {
    // console.log(record);
    // your logic for view job
  };

  const handleDeleteJob = job => {
    setFilteredData(filteredData.filter(j => j !== job));
  };

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
        <Link state={{ ...record }} to={`/job/detail/${record.id}`}>
          <Button  variant='contained' style={{backgroundColor:CustomColor.view, color: CustomColor.edit }}>
            View
          </Button>
        </Link>
        <Link state={{...record }} to="/job/edit/1">
        <IconButton  style={{color: CustomColor.edit}}>
          <FontAwesomeIcon icon={faEdit}/>
        </IconButton>
        </Link>
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



      