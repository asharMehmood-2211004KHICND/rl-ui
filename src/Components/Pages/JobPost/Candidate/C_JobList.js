import { List, Input, Pagination  } from "antd";
import React, { useEffect, useState } from "react";
import C_Job from "./Job/C_Job";
import styled from "./C_JobList.module.css";
import swal from "sweetalert";

const BaseURL = process.env.REACT_APP_API_URL1;

const { Search } = Input;

const page_size = 4;

function C_JobList() {
  const [jobs, setJobs] = useState( [
      // {
      //   companyLogo: "https://picsum.photos/200",
      //   companyName: "Google",
      //   jobTitle: "Software Engineer",
      //   postDate: "2022-12-31",
      //   location: "Mountain View, CA",
      //   description: "fkn mfkwn fjn jirf i igfniorhan erug io",
      //   category: "IT",
      // }
    ]

    

  );


  const [favourites, setFavourites] = useState([]);

  

  const [filteredData, setFilteredData] = useState(jobs);
  
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {  
    fetch(
      `${BaseURL}/job/all`,
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
        data = data.map(d=>{return {...d, companyName: "Xloop"}})
        setJobs(data);
        setFilteredData(data);
        setLoading(false);
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


  const flattenObject = (obj) => {
    return Object.values(obj).reduce((acc, val) => {
      if (typeof val === 'object') {
        return acc + flattenObject(val);
      } else {
        return acc + val;
      }
    }, '');
  }
  
  const onSearch = (value) => {
    const filterData = jobs.filter((jobObject) => {
      const flattenedObject = flattenObject(jobObject);
      return flattenedObject.toLowerCase().includes(value.toLowerCase());
    });
    console.log(filterData);
    setFilteredData(filterData);
  };

  
  // const onSearch = (value) => {
  //   const filterData = jobs.filter((jobObject) => {
  //       return Object.values(jobObject)
  //         .join("")
  //         .toLowerCase()
  //         .includes(value.toLowerCase());
  //   });
  //   console.log(filterData);
  //   setFilteredData(filterData);
  // };

  return (
    <div className={styled.jobListMainContainer}>
      <div style={{ display: "flex", justifyContent: "center" }} className={styled.searchBox}>
        <Search
          placeholder="Search..."
          enterButton="Search"
          size="large"
          loading={loading}
          bordered={true}
          onSearch={onSearch}
          style={{
            width: 500,
          }}
        />
      </div>

      <List
        itemLayout="vertical"
        dataSource={filteredData}
        renderItem={(job) => <C_Job job={job} favourites={favourites} setFavourites={setFavourites}/>}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: page_size,
        }}  
      />
    </div>
  );
}

export default C_JobList;
