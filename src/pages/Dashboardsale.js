import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import Expenses from 'src/components/dashboard/Expenses';
// import LatestOrders from 'src/components/dashboard//LatestOrders';
import LatestProducts from 'src/components/dashboard//LatestProducts';
import Sales from 'src/components/dashboard//Sales';
import TotalVisits from 'src/components/dashboard/TotalVisits';
import TotalEmployees from 'src/components/dashboard/TotalEmployees';
import TotalSales from 'src/components/dashboard/TotalSales';
import TaskProgress from 'src/components/dashboard/TaskProgress';
import axios from "axios";
import React, {useState , useEffect} from "react";

const Dashboardsale = () => {

  

  // let email=localStorage.getItem('email')
  // let password=localStorage.getItem('password')
  // console.log(data);

  
  // useEffect(() => {
  //   const fetchData = async () => {
  //       const response = await axios.get('http://localhost:3001/getid', {
  //           params: {
  //             email: email,
  //             password: password,
  //           }
  //       }).then((response)=>{
  //         if(response)
  //         {
  //           setID(response.data[0].manager_ID);
  //       console.log(response.data[0].manager_ID);
  //         }
        
  //     });
        

  //   };
  //   fetchData();
  // }, []);

  // const [Dt, setID] = useState([]);
  // console.log(Dt);

  // localStorage.setItem('managerid' ,JSON.stringify(Dt));
  return (
  <>
    <Helmet>
      <title>Dashboard</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Expenses />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalEmployees />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalVisits />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalSales sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TaskProgress sx={{ height: '100%' }} />
          </Grid>
          {/* <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  </>
);
        };
export default Dashboardsale;
