import React, { useState,useEffect } from "react";
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  useTheme
} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import LoopIcon from '@material-ui/icons/Loop';
import DoneIcon from '@material-ui/icons/Done';
// import ReactApexChart from "react-apexcharts";
import axios from 'axios'
import { sum } from "lodash";

function TaskProgress() {

  const [completetask,setCompletetask]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/completeTaskCount").then((response)=>{
      setCompletetask(response.data)
    })
  },[])

  const [pendingtask,setPendingtask]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/pendingTaskCount").then((response)=>{
      setPendingtask(response.data)
    })
  },[])

  const [rejecttask,setRejecttask]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/rejectTaskCount").then((response)=>{
      setRejecttask(response.data)
    })
  },[])

  const count1=completetask.map(record=>record.count);
  const count2=pendingtask.map(record=>record.count);
  const count3=rejecttask.map(record=>record.count);

  const data = {
    datasets: [
      {
        data: [count1, count2, count3],
        backgroundColor: [
          colors.indigo[500],
          colors.orange[600],
          colors.red[600]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Completed', 'Pending', 'Rejected']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      // backgroundColor: theme.palette.background.paper,
      // bodyFontColor: theme.palette.text.secondary,
      // borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      // footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      // titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'Completed',
      value: count1,
      icon: CheckCircleOutlineIcon,
      color: colors.indigo[600]
    },
    {
      title: 'Pending',
      value: count2,
      icon: LoopIcon,
      color: colors.orange[600]
    },
    {
      title: 'Rejected',
      value: count3,
      icon: ThumbDownAltIcon,
      color: colors.red[600]
    }
  ];

  const total = parseInt(count1) + parseInt(count2) + parseInt(count3) ;
  const c1 = parseInt(count1) ;
  const c2 = parseInt(count2) ;
  const c3 = parseInt(count3) ;
  const count1percentage =  parseInt(count1) / total * 100 ;
  const count2percentage =  parseInt(count2) / total * 100 ;
  const count3percentage =  parseInt(count3) / total * 100 ;
  // const c1p = parseInt(count1percentage) ;
  // const c2p = parseInt(count2percentage) ;
  // const c3p = parseInt(count3percentage) ;

  return (
    <Card>
      <CardHeader title="Task Progress" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Icon color="action" iconSize="large"/>
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h2"
              >
                {value}
              </Typography>
            </Box> 
           ))}
           {/* <Typography
                variant="h2"
              >
                {count1percentage}
              </Typography> */}
        </Box>
      </CardContent>
    </Card>
  );
};


export default TaskProgress;