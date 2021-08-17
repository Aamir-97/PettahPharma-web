import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography
} from '@material-ui/core';
import { orange,green } from '@material-ui/core/colors';
// import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import DescriptionIcon from '@material-ui/icons/Description';

const TotalVisits = (props) => (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
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
            TOTAL VISITS
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            156
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: orange[600],
              height: 56,
              width: 56
            }}
          >
            <DescriptionIcon />
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

        {/* <ArrowUpwardIcon sx={{ color: green[900] }} /> */}
        {/* <Typography
          sx={{
            color: green[900],
            mr: 1
          }}
          variant="body2"
        >
          16%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Since last month
        </Typography> */}
      </Box>

    </CardContent>
  </Card>
);

export default TotalVisits;
