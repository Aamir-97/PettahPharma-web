import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import ManagerListResults from 'src/components/salesmanager/ManagerListResults';

const ManagerList = () => (
  <>
    <Helmet>
      <title>Sales Manager</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
          <ManagerListResults />
      </Container>
    </Box>
  </>
);

export default ManagerList;
