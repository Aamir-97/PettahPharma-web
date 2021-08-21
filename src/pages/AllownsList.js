import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import AllownsResults from 'src/components/allowns/AllownsResults';
import AllownsToolbar from 'src/components/allowns/AllownsToolbar';
import Allowns from 'src/__mocks__/Allowns';

const AllownsList = () => (
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
        <AllownsToolbar />
        <Box sx={{ pt: 3 }}>
          <AllownsResults Allowns={Allowns} />
        </Box>
      </Container>
    </Box>
  </>
);

export default AllownsList;