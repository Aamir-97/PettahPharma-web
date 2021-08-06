import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import SettingsPassword from 'src/components/settings/SettingsPassword';
import Leavetypes from 'src/components/settings/Leavetypes';
import Expensetypes from 'src/components/settings/Expensetypes';
import Visittypes from 'src/components/settings/Visittypes';

const SettingsView = () => (
  <>
    <Helmet>
      <title>Settings</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ pt: 3 }}>
          <Leavetypes />
        </Box>
        <Box sx={{ pt: 3 }}>
          <Expensetypes />
        </Box>
        <Box sx={{ pt: 3 }}>
          <Visittypes />
         </Box>
        <Box sx={{ pt: 3 }}>
          <SettingsPassword />
        </Box>
      </Container>
    </Box>
  </>
);

export default SettingsView;
