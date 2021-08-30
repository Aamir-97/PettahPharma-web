import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import Expenses from 'src/components/dashboardSal/Expenses';
// import LatestOrders from 'src/components/dashboard/LatestTasks';
// import LatestProducts from 'src/components/dashboard//LatestProducts';
// import Sales from 'src/components/dashboard/Sales';
import TotalVisits from 'src/components/dashboardSal/TotalVisits';
import TotalEmployees from 'src/components/dashboardSal/TotalEmployees';
import TotalProducts from 'src/components/dashboardSal/TotalProducts';
import TaskProgress from 'src/components/dashboardSal/TaskProgress';
// import TaskAnalysis from 'src/components/charts/TaskAnalysis'
import ExpenseAnalysis from 'src/components/dashboardSal/ExpenseAnalysis'
import VisitAnalysis from 'src/components/dashboardSal/VisitAnalysis';
import VisitTypes from 'src/components/dashboardSal/VisitTypes';

const Dashboardsale = () => (
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
            <TotalProducts />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <ExpenseAnalysis/>
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TaskProgress/>
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <VisitAnalysis/>
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <VisitTypes/>
          </Grid>
          {/* <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          > 
            <LatestOrders />
          </Grid>  */}
        </Grid>
      </Container>
    </Box>
  </>
);

export default Dashboardsale;
