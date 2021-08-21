import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import React from 'react';
// import clsx from 'clsx';
// import {Table} from 'react-bootstrap';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
import TaskProgress from 'src/components/dashboard/TaskProgress';
import LatestOrders from 'src/components/dashboard//LatestOrders';
import LatestProducts from 'src/components/dashboard//LatestProducts';
import Sales from 'src/components/dashboard//Sales';


const ReportGeneration=()=> (
  <>
    <Helmet>
      <title>Reports</title>
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
              item
              lg={10}
              md={12}
              xl={9}
              xs={12}
              width="auto"
            >
              <Sales />
            </Grid>
            {/* <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <TaskProgress sx={{ height: '100%' }} />
            </Grid> */}
            {/* <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts sx={{ height: '100%' }} />
          </Grid> */}
          <Grid
            item
            lg={10}
            md={12}
            xl={9}
            xs={12}
            my={5}
          >
            <LatestOrders />
          </Grid> 
      </Container>
    </Box>
  </>
);

export default ReportGeneration;
