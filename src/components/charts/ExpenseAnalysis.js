import React, { useState,useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors
} from '@material-ui/core';
import axios from 'axios'

function ExpenseAnalysis() {

    const [fuelexpense,setFuelexpense]=useState([])
    useEffect(()=>{
      axios.get("http://localhost:3001/fuelexpense").then((response)=>{
        setFuelexpense(response.data)
      })
    },[])

    const [accommodationexpense,setAccommodationexpense]=useState([])
    useEffect(()=>{
      axios.get("http://localhost:3001/accommodationexpense").then((response)=>{
        setAccommodationexpense(response.data)
      })
    },[])

    const [dailyexpense,setDailyexpense]=useState([])
    useEffect(()=>{
      axios.get("http://localhost:3001/dailyexpense").then((response)=>{
        setDailyexpense(response.data)
      })
    },[])

    const [otherexpense,setOtherexpense]=useState([])
    useEffect(()=>{
      axios.get("http://localhost:3001/otherexpense").then((response)=>{
        setOtherexpense(response.data)
      })
    },[])
  
  const expense1=fuelexpense.map(record=>record.expense);
  const expense2=accommodationexpense.map(record=>record.expense);
  const expense3=dailyexpense.map(record=>record.expense);
  const expense4=otherexpense.map(record=>record.expense);
  
  const theme = useTheme();
 
  const data = {
    datasets: [
      {
        backgroundColor: "#0A6466",
        data: expense1,
        label: 'Fuel Expenses'
      },
      { 
        backgroundColor: colors.teal[500],
        data: expense2,
        label: 'Accommodation Expenses'
      },
      {
        backgroundColor: colors.teal[300],
        data:   expense3,
        label: 'Daily Batta'
      },
      { 
        backgroundColor: colors.teal[200],
        data:   expense4,
        label: 'Other Expenses'
      }
    ],
    labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: true },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          display: false,
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card>
      <CardHeader
        title="Monthly Expenses - 2021"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 420,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ExpenseAnalysis;
