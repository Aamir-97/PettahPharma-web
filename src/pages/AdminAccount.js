import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import AdminAccountProfile from 'src/components/account/AdminAccountProfile';
import AdminProfileDetails from 'src/components/account/AdminProfileDetails';
import SettingsPassword from 'src/components/settings/SettingsPassword';

const AdminAccount = () => (
  <>
    <Helmet>
      <title>Account</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <AdminAccountProfile />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <AdminProfileDetails />
          </Grid>
        </Grid>
      </Container>

      <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ pt: 3 }}>
          <SettingsPassword />
        </Box>
      </Container>
    </Box>
    </Box>
  </>
);

export default AdminAccount;
 