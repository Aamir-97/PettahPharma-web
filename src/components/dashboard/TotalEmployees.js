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
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';




function TotalEmployees() {

  const [managercount,setManagercount]=useState([])
  useEffect(()=>{
  axios.get("http://localhost:3001/managerCount").then((response)=>{
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
            {managercount.map((record)=>{
              return(
              <p style={{fontSize:'30px'}}>{record.count}</p>
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
            <SupervisorAccountOutlinedIcon />
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
        >
          3
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Sales Manager
        </Typography> */}
      </Box>
    </CardContent>
    </Card>
  </div>
   );
}
export default TotalEmployees;
