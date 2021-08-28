import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import Expenses from 'src/components/dashboard/Expenses';
import LatestOrders from 'src/components/dashboard/LatestTasks';
import LatestProducts from 'src/components/dashboard//LatestProducts';
import Sales from 'src/components/dashboard/Sales';
import TotalVisits from 'src/components/dashboard/TotalVisits';
import TotalEmployees from 'src/components/dashboard/TotalEmployees';
import TotalProducts from 'src/components/dashboard/TotalProducts';
import TaskProgress from 'src/components/dashboard/TaskProgress';
import TaskAnalysis from 'src/components/charts/TaskAnalysis';
import VisitAnalysis from 'src/components/charts/VisitAnalysis';

const Dashboard = () => (
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
            <VisitAnalysis/>
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
          {/* <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TaskAnalysis/>
          </Grid> */}
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

export default Dashboard;
