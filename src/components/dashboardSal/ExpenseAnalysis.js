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

  let manager_ID = localStorage.getItem('managerid');
  manager_ID = JSON.parse(manager_ID)

    const [fuelexpense,setFuelexpense]=useState([])
    useEffect(() => {
      const fetchData = async () => {
          const response = await axios.get('http://localhost:3001/repfuelexpense', {
              params: {
                  manager_ID: manager_ID,
              }
          });
          setFuelexpense(response.data)
      };
      fetchData();
    }, []);

    const [accommodationexpense,setAccommodationexpense]=useState([])
    useEffect(() => {
      const fetchData = async () => {
          const response = await axios.get('http://localhost:3001/repaccommodationexpense', {
              params: {
                  manager_ID: manager_ID,
              }
          });
          setAccommodationexpense(response.data)
      };
      fetchData();
    }, []);

    const [dailyexpense,setDailyexpense]=useState([])
    useEffect(() => {
      const fetchData = async () => {
          const response = await axios.get('http://localhost:3001/repdailyexpense', {
              params: {
                  manager_ID: manager_ID,
              }
          });
          setDailyexpense(response.data)
      };
      fetchData();
    }, []);

    const [otherexpense,setOtherexpense]=useState([])
    useEffect(() => {
      const fetchData = async () => {
          const response = await axios.get('http://localhost:3001/repotherexpense', {
              params: {
                  manager_ID: manager_ID,
              }
          });
          setOtherexpense(response.data)
      };
      fetchData();
    }, []);
  
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
        backgroundColor: colors.teal[400],
        data: expense2,
        label: 'Accommodation Expenses'
      },
      {
        backgroundColor: colors.teal[100],
        data:   expense3,
        label: 'Daily Expenses'
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
          display: true,
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
        title="Monthly Expenses"
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
