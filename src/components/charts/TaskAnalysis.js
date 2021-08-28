import React, { useState,useEffect } from "react";
import ReactDOM from "react-dom";
import ReactApexChart from "react-apexcharts";
import axios from 'axios'
import {
  Box,
  Card,
  CardHeader,
  Divider
} from '@material-ui/core'
import { Button } from "bootstrap";

function TaskAnalysis() {

  const [taskanalysis,setTaskanalysis]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/taskanalysis").then((response)=>{
      setTaskanalysis(response.data)
    })
  },[])

// let month = date.toLocaleString('en-us', { month: 'short' });

const month=taskanalysis.map(record=>record.month);
const count=taskanalysis.map(record=>record.count);

  return (

    <Card>
    <CardHeader title="Completed Tasks" />
    <Divider />
    <Box
          sx={{
            height: 460,
            position: 'relative'
          }}
        >
      <div className="app">
      <div className="row">
        <div>
          <ReactApexChart align="center"
            options={{
              chart: {
                type: "bar",
                height: 350,
                width: '100%'
              },
              xaxis: {
                categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
                title: {
                  text: 'Months'
                }
              },
              yaxis: {
                show: false
              },
              colors:  ["#0A6466"]
            }}
            series={[
              {
                name: "No of tasks",
                data: count
              }
            ]} 
            type="bar"
            width="600"
          />
        </div>
      </div>
    </div>
    </Box>
    </Card>
  )
}

export default TaskAnalysis;