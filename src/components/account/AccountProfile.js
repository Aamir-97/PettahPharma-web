import { useEffect,useState } from 'react';
import {
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

  const [state, setState] = useState({ file: '', emp_img: '', message: '', success: false })


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

const handleInput = (e) => {
  let reader = new FileReader();
  let file = e.target.files[0]
  reader.onloadend = () => {
    setState({
      ...state,
      file: file,
      userImage: reader.result,
      message: ""
    })

  }
  reader.readAsDataURL(file);
}

console.log(state.file)

   if (state.file) {
    let formData = new FormData();
    formData.append('file', state.file)
    axios.post('http://localhost:3001/imageUpload', formData, {
      'content-Type': 'multipart/form-data',
    })

    axios.post("http://localhost:3001/updateProfile", { emp_img: state.file.name, manager_ID: manager_ID }).then(
      (response) => {
      }
    )

   }



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
        <img 
        sx={{
            height: 100,
            width: 100
          }}
          src={`/${Row.display_photo}`}  align='center' height= '100'
          width= '100' ></img>
        
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
        variant="contained"
        component="label"
      >
        Upload picture
        <input
                        type="file"
                        hidden
                        onChange={handleInput}
                    />
      </Button>
    </CardActions>
  </Card>
  )
  
};

export default AccountProfile;
