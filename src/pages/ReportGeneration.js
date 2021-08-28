import { Helmet } from 'react-helmet';
import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
// import clsx from 'clsx';
// import {Table} from 'react-bootstrap';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import TaskProgress from 'src/components/dashboard/TaskProgress';
// import LatestTasks from 'src/components/dashboard/LatestTasks';
// import LatestProducts from 'src/components/dashboard//LatestProducts';
// import Sales from 'src/components/dashboard/Sales';
import TaskAnalysis from 'src/components/charts/TaskAnalysis';
import VisitAnalysis from 'src/components/charts/VisitAnalysis';

const ReportGeneration=()=> {
  
  const dateOnly = (d) => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year} - ${month} - ${day}`;
  };

  const [open, setOpen] = React.useState(true);
  const {todate}=useParams();
  const {fromdate}=useParams();
  
  const [taskanalysis,setTaskanalysis]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/taskanalysis").then((response)=>{
      setTaskanalysis(response.data)
    })
  },[])

  const month=taskanalysis.map(record=>record.month);
  const count=taskanalysis.map(record=>record.count);
  
    <Helmet>
      <title>Reports</title>
    </Helmet>
  return (
  
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
              lg={8}
              md={6}
              xl={3}
              xs={12}
            >
              <TaskAnalysis/>
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xl={3}
              xs={12}
            >
              <VisitAnalysis />
            </Grid>
            {/* <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts sx={{ height: '100%' }} />
          </Grid> */}
          {/* <Grid
            item
            lg={10}
            md={12}
            xl={9}
            xs={12}
            my={5}
          >
            <Visits />
          </Grid>  */}
        </Grid>
      </Container>
    </Box>
  )
};

export default ReportGeneration;
