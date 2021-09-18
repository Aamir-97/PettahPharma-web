import { useEffect,useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from '@material-ui/core';
import axios from 'axios';

export default function AdminProfileDetails() {
  const mystyle = {
    closeBtn: {
        width: '145px',
        height: '40px',
        fontSize: '18px',
        backgroundColor: 'red',
        transition: '1s background ease',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        marginLeft: '10px'
    },
    submitBtn: {
        width: '145px',
        height: '40px',
        fontSize: '18px',
        backgroundColor: '#0A6466',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        marginLeft: '350px'
    },
    forminput: {

      width: '300px',
      padding: '10px 10px',
      margin: '2px 0',
      display: 'inline - block',
      border: '1px solid #C0C0C0',
      borderRadius: '5px',
      height: '50px'
  },
  h5:{
    fontFamily: "Sans-serif", 
  },

};
    const [Row, setRow] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const edit_adminprofile = () => {
        axios.post("http://localhost:3001/updateadmin",
            { name: name,  email: email }).then(
                (response) => { 
                    window.location.reload();
                }
            )
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3001/adminprofile', {
            });
            setRow(response.data[0]);
            setName(response.data[0].name);
            setEmail(response.data[0].email);
        };
        fetchData();
    }, []);
  

  return (
    
    <form
      autoComplete="off"
      noValidate
      // {...props}
    >
      <Card>
        <CardHeader
          title="Profile"
        />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >  <h5 style={mystyle.h5} >Name</h5>
              <input
                fullWidth
                label="Name"
                name="Name"
                onChange={(event) => { setName(event.target.value); }}
                required
                style={mystyle.forminput}
                defaultValue ={Row.name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <h5 style={mystyle.h5}>Email</h5>
              <input
                fullWidth
                label="Email Address"
                name="email"
                onChange={(event) => { setEmail(event.target.value); }}
                required
                defaultValue={Row.email}
                variant="outlined"
                style={mystyle.forminput}
                
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={() => { edit_adminprofile() }}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

