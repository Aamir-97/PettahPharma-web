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
  let manager_ID = localStorage.getItem('managerid');
  manager_ID = JSON.parse(manager_ID)
  const [expensecount,setExpensecount]=useState([])
  console.log(manager_ID)

useEffect(() => {
  const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/totalRepExpenses', {
          params: {
              manager_ID: manager_ID,
          }
      });
      setExpensecount(response.data)
  };
  fetchData();
}, []);

return (
  <Card>
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
            TOTAL EXPENSES
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
          {expensecount.map((record)=>{
              return(
              <p style={{fontSize:'30px' , height:"25px" }}>{record.totalexpense}.00</p>
              )
            })}
          <p style={{fontSize:'13px',color:'#e53935' ,height:"6px"}}>Annual Total Expenses</p>
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
      </Box>
    </CardContent>
  </Card>
);
}
export default Expenses;
