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


const AccountProfile = (props) => {

  let admin_ID = localStorage.getItem('admin_ID');
  admin_ID = JSON.parse(admin_ID)
  const [Row, setRow] = useState([]);
useEffect(() => {
  const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/adminprofile', {
          params: {
              admin_ID: admin_ID,
          }
      });
      setRow(response.data[0]);
  };
  fetchData();
}, []);

const user = {
    avatar: '/static/images/avatars/admin.png',
    jobTitle: 'Admin',
    email: Row.email,
    name: Row.name,
  };

  return (
<Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          height: 190
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
          Admin
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
    {/* <CardActions>
      <Button
        color="primary"
        fullWidth
        variant="text"
      >
        Upload picture
      </Button>
    </CardActions> */}
  </Card>
  )
  
};

export default AccountProfile;
