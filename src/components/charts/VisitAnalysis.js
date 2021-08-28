import React, { useState,useEffect } from "react";
import ReactDOM from "react-dom";
import ReactApexChart from "react-apexcharts";
import axios from 'axios'
// import Pdf from "react-to-pdf";
// import ReactToPdf from "../ReactToPdf";
import {
  Box,
  Card,
  CardHeader,
  Divider
} from '@material-ui/core'
import { Button } from "bootstrap";

function VisitAnalysis() {

  const [visitanalysis,setVisitanalysis]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/visitanalysis").then((response)=>{
        setVisitanalysis(response.data)
    })
  },[])

// let month = date.toLocaleString('en-us', { month: 'short' });

const month=visitanalysis.map(record=>record.month);
const count=visitanalysis.map(record=>record.count);

// const ref = React.createRef();

{/* <div>
    <ReactToPdf>
        {({toPdf}) => (
             <button onClick={toPdf}>Download</button>
        )}
    </ReactToPdf>
    <div ref={ref}/>
</div> */}

  return (

    <Card>
    <CardHeader title="Completed Visits" />
    <Divider />
    {/* <ReactToPdf>
    {({toPdf, targetRef}) =>  (
        <div style={{width: 10, height: 10, background: 'red'}} onClick={toPdf} ref={targetRef}/>
    )}
</ReactToPdf> */}
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
                name: "No of visits",
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

export default VisitAnalysis;