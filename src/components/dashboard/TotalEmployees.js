import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
// import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';

const TotalEmployees = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h6"
          >
            TOTAL EMPLOYEES
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            52
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: green[600],
              height: 56,
              width: 56
            }}
          >
            <PeopleIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 2
        }}
      >

        <Typography
          sx={{
            color: green[900],
            mr: 1
          }}
          variant="body2"
        >
          3
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Sales Manager
        </Typography>
      </Box>

    </CardContent>
  </Card>
);

export default TotalEmployees;
