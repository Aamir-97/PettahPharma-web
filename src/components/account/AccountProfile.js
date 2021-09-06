import moment from 'moment';
import { useEffect,useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import axios from 'axios';
const user = {
  avatar: '/static/images/avatars/avatar_13.png',
  jobTitle: 'Sales Manager',
  email: 'madhusha@gmail.com',
  name: 'Madhusha Mathivannan',
};



const AccountProfile = (props) => {

  let manager_ID = localStorage.getItem('managerid');
  manager_ID = JSON.parse(manager_ID)
  const [Row, setRow] = useState([]);
useEffect(() => {
  const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/viewmanager', {
          params: {
              manager_ID: manager_ID,
          }
      });
      setRow(response.data[0]);
  };
  fetchData();
}, []);
  return (
<Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 100,
            width: 100
          }}
        />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h3"
        >
          {Row.name}
        </Typography>
        <Typography
          color="textPrimary"
          variant="body1"
        >
          {`${user.jobTitle}`}
        </Typography>
        <Typography
          color="textPrimary"
          variant="body1"
        >
          {`${Row.email}`}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        color="primary"
        fullWidth
        variant="text"
      >
        Upload picture
      </Button>
    </CardActions>
  </Card>
  )
  
};

export default AccountProfile;
