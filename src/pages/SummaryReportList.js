import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import SummaryReportResults from 'src/components/summaryreport/SummaryReportResults';
import SummaryReportToolbar from 'src/components/summaryreport/SummaryReportToolbar';
import SummaryReport from 'src/__mocks__/SummaryReport';

const SummaryReportList = () => (
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
        <SummaryReportToolbar />
        <Box sx={{ pt: 3 }}>
          <SummaryReportResults SummaryReport={SummaryReport} />
        </Box>
      </Container>
    </Box>
  </>
);

export default SummaryReportList;
