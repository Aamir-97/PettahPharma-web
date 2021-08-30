import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon
  } from '@material-ui/core';
  import { Search as SearchIcon } from 'react-feather';
  import { Link } from 'react-router-dom';
  
  
  const LeaveToolbar = (props) => (
    <Box {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '0px',
                  marginLeft: '400px',
        }}
      >
        <h1 style={{ flex: 3, flexWrap: 'wrap' }}  >LEAVE APPROVAL</h1>
  
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search Employee"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
  
  export default LeaveToolbar;
  