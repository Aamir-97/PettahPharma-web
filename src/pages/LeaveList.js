import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import LeaveResults from 'src/components/leave/LeaveResults';
import LeaveToolbar from 'src/components/leave/LeaveToolbar';
import Leave from 'src/__mocks__/Leave';

const LeaveList = () => (
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
        <LeaveToolbar />
        <Box sx={{ pt: 3 }}>
          <LeaveResults Leave={Leave} />
        </Box>
      </Container>
    </Box>
  </>
);

export default LeaveList;
