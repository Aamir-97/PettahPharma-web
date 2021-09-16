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
import { orange,green } from '@material-ui/core/colors';
import DescriptionIcon from '@material-ui/icons/Description';

function TotalVisits() {

  const [visitcount,setVisitcount]=useState([])
  useEffect(()=>{
  axios.get("http://localhost:3001/visitCount").then((response)=>{
  console.log(response.data)
  setVisitcount(response.data)
  })
},[])
return (
  <Card
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
        height="110px"
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h6"
          >
            TOTAL VISITS
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            {visitcount.map((record)=>{
              return(
              <p style={{fontSize:'30px', height:"25px"}}>{record.count}</p>
              )
            })}
          <p style={{fontSize:'13px',color:'#fb8c00' ,height:"6px" }}>Annual Total Visits</p>
          <p style={{fontSize:'13px',color:'#fb8c00' }}>Year - 2021</p>
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: orange[600],
              height: 56,
              width: 56
            }}
          >
            <DescriptionIcon />
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
      </Box>

    </CardContent>
  </Card>
);
}
export default TotalVisits;
