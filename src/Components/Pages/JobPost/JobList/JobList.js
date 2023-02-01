import React, { useState } from 'react';
import { Table, Input, DatePicker, Button, Popconfirm } from 'antd';
import {SearchOutlined, FilterOutlined} from "@ant-design/icons";
import moment from 'moment';
import 'antd/dist/reset.css';

const { RangePicker } = DatePicker;

const JobsList = () => {

  const jobs = [
    {id:"1",title: "Software Engineer", type: "DEG Engineer",postDate:"2023-01-15", expireDate: "2023-02-28", appliedCandidate: 20},
    {id:"1",title: "Data Analyst", type: "CND Engineer",postDate:"2023-01-15", expireDate: "2023-03-15", appliedCandidate: 15},
    {id:"1",title: "Data Analyst", type: "CND Engineer",postDate:"2023-01-15", expireDate: "2023-03-15", appliedCandidate: 15},
    {id:"1",title: "Data Analyst", type: "CND Engineer",postDate:"2023-01-15", expireDate: "2023-03-15", appliedCandidate: 15},
    {id:"1",title: "Data Analyst", type: "CND Engineer",postDate:"2023-01-15", expireDate: "2023-03-15", appliedCandidate: 15},
    {id:"1",title: "Data Analyst", type: "CND Engineer",postDate:"2023-01-15", expireDate: "2023-03-15", appliedCandidate: 15},
    {id:"1",title: "Data Analyst", type: "CND Engineer",postDate:"2023-01-15", expireDate: "2023-03-15", appliedCandidate: 15},
    {id:"1",title: "Data Analyst", type: "CND Engineer",postDate:"2023-01-15", expireDate: "2023-03-15", appliedCandidate: 15},
    {id:"1",title: "Data Analyst", type: "CND Engineer",postDate:"2023-01-15", expireDate: "2023-03-15", appliedCandidate: 15},
    {id:"1",title: "Data Analyst", type: "CND Engineer",postDate:"2023-01-15", expireDate: "2023-03-15", appliedCandidate: 15},
    {id:"1",title: "Data Analyst", type: "CND Engineer",postDate:"2023-01-15", expireDate: "2023-03-15", appliedCandidate: 15},
    {id:"1",title: "Data Analyst", type: "CND Engineer",postDate:"2023-01-15", expireDate: "2023-03-15", appliedCandidate: 15},
    {id:"1",title: "Data Analyst", type: "CND Engineer",postDate:"2023-01-15", expireDate: "2023-03-15", appliedCandidate: 15},
    {id:"1",title: "Data Analyst", type: "CND Engineer",postDate:"2023-01-15", expireDate: "2023-03-15", appliedCandidate: 15},
    {id:"1",title: "Data Analyst", type: "CND Engineer",postDate:"2023-01-15", expireDate: "2023-03-15", appliedCandidate: 15},
    {id:"1",title: "Data Analyst", type: "CND Engineer",postDate:"2023-01-15", expireDate: "2023-03-15", appliedCandidate: 15},
    {id:"1",title: "Data Analyst", type: "CND Engineer",postDate:"2023-01-15", expireDate: "2023-03-15", appliedCandidate: 15},
    {id:"1",title: "Data Analyst", type: "CND Engineer",postDate:"2023-01-15", expireDate: "2023-03-15", appliedCandidate: 15},
    {id:"1",title: "Data Analyst", type: "CND Engineer",postDate:"2023-01-15", expireDate: "2023-03-15", appliedCandidate: 15},
    {id:"1",title: "Data Analyst", type: "CND Engineer",postDate:"2023-01-15", expireDate: "2023-03-15", appliedCandidate: 15},
    {id:"1",title: "Data Analyst", type: "CND Engineer",postDate:"2023-01-15", expireDate: "2023-03-15", appliedCandidate: 15},
    {id:"1",title: "Data Analyst", type: "CND Engineer",postDate:"2023-01-15", expireDate: "2023-03-15", appliedCandidate: 15},
    {id:"1",title: "Data Analyst", type: "CND Engineer",postDate:"2023-01-15", expireDate: "2023-03-15", appliedCandidate: 15},
    {id:"1",title: "Data Analyst", type: "CND Engineer",postDate:"2023-01-15", expireDate: "2023-03-15", appliedCandidate: 15},
    {id:"1",title: "Data Analyst", type: "CND Engineer",postDate:"2023-01-15", expireDate: "2023-03-15", appliedCandidate: 15},
    {id:"1",title: "Data Analyst", type: "CND Engineer",postDate:"2023-01-15", expireDate: "2023-03-15", appliedCandidate: 15},
    {id:"1",title: "Data Analyst", type: "CND Engineer",postDate:"2023-01-15", expireDate: "2023-03-15", appliedCandidate: 15},
  ];
  
  // const [jobs, setJobs] = useState(jobser);
  const [filteredData, setFilteredData] = useState(jobs);
  const [searchText, setSearchText] = useState('');
  const [filteredDate, setFilteredDate] = useState([]);

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
    {      title: 'Title',      dataIndex: 'title',      key: 'title',   
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
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />

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
    dataIndex: 'type',
    key: 'type',
  }, {
    title: 'Candidate Applied',
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
      <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
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
      <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
  },
  {
    title: 'Candidate Applied',
    dataIndex: 'appliedCandidate',
    key: 'appliedCandidate',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button onClick={() => handleViewJob(record)}>View</Button>
        <Popconfirm
          title="Are you sure delete this job?"
          onConfirm={() => handleDeleteJob(record)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger">Delete</Button>
        </Popconfirm>
      </span>
    ),
  },
];

return <Table columns={columns} dataSource={filteredData} />;
};

export default JobsList;



      