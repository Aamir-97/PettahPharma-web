import React, { useState, useEffect } from 'react';
import axios from "axios";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
// import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import GroupIcon from '@material-ui/icons/Group';

function TotalEmployees() {
  let manager_ID = localStorage.getItem('managerid');
  manager_ID = JSON.parse(manager_ID)
  const [employeecount,setEmployeecount]=useState([])
//   useEffect(()=>{
//   axios.get("http://localhost:3001/MedicalRepCount",{
//     manager_ID: manager_ID,
//   }).then((response)=>{
//   console.log(response.data)
//   setEmployeecount(response.data)
//   })
// },[])
console.log(manager_ID)
useEffect(() => {
  const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/MedicalRepCount', {
          params: {
              manager_ID: manager_ID,
          }
      });
      setEmployeecount(response.data)
      // console.log(response.data[0]);
  };
  fetchData();
}, []);

// const [managercount,setManagercount]=useState([])
//   useEffect(()=>{
//   axios.get("http://localhost:3001/managerCount").then((response)=>{
//   console.log(response.data)
//   setManagercount(response.data)
//   })
// },[])

// const [repcount,setRepcount]=useState([])
//   useEffect(()=>{
//   axios.get("http://localhost:3001/repCount").then((response)=>{
//   console.log(response.data)
//   setRepcount(response.data)
//   })
// },[])

return (
<div>
    <Card>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h6"
          >
            TOTAL Medical Rep
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
            height="62px"
          >
            {employeecount.map((record)=>{
              return(
              <p style={{fontSize:'30px'}}>{record.count}</p>
              )
            })}
            {/* {managercount.map((record)=>{
              return(
            <p style={{fontSize:'13px',color:'#388e3c'}}>{record.count} Sales Managers</p>
            )
          })}
          {repcount.map((record)=>{
              return(
            <p style={{fontSize:'13px',color:'#388e3c'}}>{record.count} Medical Reps</p>
            )
          })} */}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: green[700],
              height: 56,
              width: 56
            }}
          >
            <GroupIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 2
        }}
      >
        {/* <Typography
          sx={{
            color: green[900],
            mr: 1
          }}
          variant="body2"
        > */}
        {/* </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Sales Managers
        </Typography> */}
      </Box>
    </CardContent>
    </Card>
  </div>
   );
}
export default TotalEmployees;
