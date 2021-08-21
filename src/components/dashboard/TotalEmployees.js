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

  const [employeecount,setEmployeecount]=useState([])
  useEffect(()=>{
  axios.get("http://localhost:3001/employeeCount").then((response)=>{
  console.log(response.data)
  setEmployeecount(response.data)
  })
},[])

const [managercount,setManagercount]=useState([])
  useEffect(()=>{
  axios.get("http://localhost:3001/managerCount").then((response)=>{
  console.log(response.data)
  setManagercount(response.data)
  })
},[])
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
            TOTAL EMPLOYEES
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            {employeecount.map((record)=>{
              return(
              <p style={{fontSize:'30px'}}>{record.totalcount}</p>
              )
            })}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: green[600],
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
