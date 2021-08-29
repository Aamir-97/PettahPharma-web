import React, { useState,useEffect } from "react";
import { Pie } from 'react-chartjs-2';
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
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import axios from 'axios'

function VisitTypes() {

  const [promotionVisit,setPromotionVisit]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/promotionVisitCount").then((response)=>{
        setPromotionVisit(response.data)
    })
  },[])

  const [generalVisit,setGeneralVisit]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/generalVisitCount").then((response)=>{
        setGeneralVisit(response.data)
    })
  },[])

  const [feedbackVisit,setFeedbackVisit]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/feedbackVisitCount").then((response)=>{
        setFeedbackVisit(response.data)
    })
  },[])

  const count1=promotionVisit.map(record=>record.count);
  const count2=generalVisit.map(record=>record.count);
  const count3=feedbackVisit.map(record=>record.count);

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
    labels: [
      'Promotion Visit',
      'General Visit',
      'Feedback Visit'
    ],
    datasets: [{
      data: [count1, count2, count3],
      backgroundColor: [
        '#3f51b5',
        '#ff9800',
        '#f44336'
      ],
      hoverOffset: 4
    }]
  };

  const options = {
    animation: false,
    cutoutPercentage: 0,
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
      title: 'Promotion',
      value: c1p,
      icon: CardGiftcardIcon,
      color: colors.indigo[600]
    },
    {
      title: 'General',
      value: c2p,
      icon: CardTravelIcon,
      color: colors.orange[600]
    },
    {
      title: 'Feedback',
      value: c3p,
      icon: CardMembershipIcon,
      color: colors.red[600]
    }
  ];

  return (
    <Card>
      <CardHeader title="Visit Types" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Pie
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


export default VisitTypes;