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


function VisitAnalysis() {
  let manager_ID = localStorage.getItem('managerid');
  manager_ID = JSON.parse(manager_ID)
  const [visitanalysis,setVisitanalysis]=useState([])
  // useEffect(()=>{
  //   axios.get("http://localhost:3001/visitanalysis").then((response)=>{
  //       setVisitanalysis(response.data)
  //   })
  // },[])

  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get('http://localhost:3001/repvisitanalysis', {
            params: {
                manager_ID: manager_ID,
            }
        });
        setVisitanalysis(response.data)
        // console.log(response.data[0]);
    };
    fetchData();
  }, []);

const count=visitanalysis.map(record=>record.count);

const theme = useTheme();

const data = {
  datasets: [
    {
      backgroundColor: "#00796b",
      data: count,
      label: 'No of Visits'
    }
  ],
  labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
};

const options = {
  animation: false,
  cornerRadius: 5,
  layout: { padding: 0 },
  legend: { display: true },
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    xAxes: [
      {
        barThickness: 20,
        maxBarThickness: 20,
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
        title="Monthly Total Visits"
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
//     <Card>
//     <CardHeader title="Monthly Total Visits" />
//     <Divider />
//    <Box
//           sx={{
//             height: 460,
//             position: 'relative'
//           }}
//         >
//       <div className="app">
//       <div className="row">
//         <div>
//           <ReactApexChart align="center"
//             options={{
//               chart: {
//                 type: "bar",
//                 height: 350,
//                 width: '100%'
//               },
//               xaxis: {
//                 categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
//                 title: {
//                   text: 'Months'
//                 }
//               },
//               yaxis: {
//                 show: false
//               },
//               colors:  ["#1b5e20"]
//             }}
//             series={[
//               {
//                 name: "No of visits",
//                 data: count
//               }
//             ]} 
//             type="bar"
//             width="600"
//           />
//         </div>
//       </div>
//     </div>
//     </Box>
//     </Card>
//   )
// }

export default VisitAnalysis;

