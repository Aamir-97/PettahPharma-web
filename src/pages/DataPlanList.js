import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import DataPlanListResults from 'src/components/dataplan/DataPlanListResults';
import DataPlanListToolbar from 'src/components/dataplan/DataPlanListToolbar';
import DataPlan from 'src/__mocks__/DataPlan';

const DataPlanList = () => (
  <>
    <Helmet>
      <title>Data</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <DataPlanListToolbar />
        <Box sx={{ pt: 3 }}>
          <DataPlanListResults DataPlan={DataPlan} />
        </Box>
      </Container>
    </Box>
  </>
);

export default DataPlanList;
