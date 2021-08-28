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
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { red } from '@material-ui/core/colors';

function Expenses() {

  const [expensecount,setExpensecount]=useState([])
  useEffect(()=>{
  axios.get("http://localhost:3001/totalexpenses").then((response)=>{
  console.log(response.data)
  setExpensecount(response.data)
  })
},[])
return (
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
            TOTAL EXPENSES
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
          {expensecount.map((record)=>{
              return(
              <p style={{fontSize:'30px'}}>{record.totalexpense}.00</p>
              )
            })}
          <p style={{fontSize:'13px',color:'#e53935'}}>Annual Total Expenses</p>
          <p style={{fontSize:'13px',color:'#e53935'}}>Year - 2021</p>
          </Typography>
        </Grid>

        <Grid item>
          <Avatar
            sx={{
              backgroundColor: red[600],
              height: 56,
              width: 56
            }}
          >
            <MonetizationOnIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* <ArrowDownwardIcon sx={{ color: red[900] }} />
        <Typography
          sx={{
            color: red[900],
            mr: 1
          }}
          variant="body2"
        >
          12%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Since last month
        </Typography> */}
      </Box>
    </CardContent>
  </Card>
);
}
export default Expenses;
