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
import CachedIcon from '@material-ui/icons/Cached';
import axios from 'axios'

function TaskProgress() {
  let manager_ID = localStorage.getItem('managerid');
  manager_ID = JSON.parse(manager_ID)

  const [completetask,setCompletetask]=useState([])
    useEffect(() => {
      const fetchData = async () => {
          const response = await axios.get('http://localhost:3001/repcompleteTaskCount', {
              params: {
                  manager_ID: manager_ID,
              }
          });
          setCompletetask(response.data)
          // console.log(response.data[0]);
      };
      fetchData();
    }, []);

    const [pendingtask,setPendingtask]=useState([])
    useEffect(() => {
      const fetchData = async () => {
          const response = await axios.get('http://localhost:3001/reppendingTaskCount', {
              params: {
                  manager_ID: manager_ID,
              }
          });
          setPendingtask(response.data)

      };
      fetchData();
    }, []);

    const [rejecttask,setRejecttask]=useState([])
    useEffect(() => {
      const fetchData = async () => {
          const response = await axios.get('http://localhost:3001/reprejectTaskCount', {
              params: {
                  manager_ID: manager_ID,
              }
          });
          setRejecttask(response.data)
          // console.log(response.data[0]);
      };
      fetchData();
    }, []);

  const count1=completetask.map(record=>record.count);
  const count2=pendingtask.map(record=>record.count);
  const count3=rejecttask.map(record=>record.count);

  const total = parseInt(count1) + parseInt(count2) + parseInt(count3) ;
  const c1 = parseInt(count1) ;
  const c2 = parseInt(count2) ;
  const c3 = parseInt(count3) ;
  const count1percentage =  parseInt(count1) / total * 100 ;
  const count2percentage =  parseInt(count2) / total * 100 ;
  const count3percentage =  parseInt(count3) / total * 100 ;
  const c1p = parseInt(count1percentage) ;
  const c2p = parseInt(count2percentage) ;
  const c3p = parseInt(count3percentage) ;

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
      borderWidth: 1,
      enabled: true,
      intersect: false,
      mode: 'index',
    }
  };

  const devices = [
    {
      title: 'Completed',
      value: c1p,
      icon: CheckCircleOutlineIcon,
      color: colors.indigo[600]
    },
    {
      title: 'Pending',
      value: c2p,
      icon: CachedIcon,
      color: colors.orange[600]
    },
    {
      title: 'Rejected',
      value: c3p,
      icon: ThumbDownAltIcon,
      color: colors.red[600]
    }
  ];

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
              <Icon 
              style={{ color }}
              iconSize="large"/>
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
                {value}%
              </Typography>
            </Box> 
           ))}
        </Box>
      </CardContent>
    </Card>
  );
};


export default TaskProgress;