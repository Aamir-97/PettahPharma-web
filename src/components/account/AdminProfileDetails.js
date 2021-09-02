import { useEffect,useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import axios from 'axios';

const states = [
];

const AccountProfileDetails = (props) => {
  // const [values, setValues] = useState({
  //   // name: setName,
  //   // email: setEmail
  // });

    const [Row, setRow] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

  let admin_ID = localStorage.getItem('admin_ID');
  admin_ID = JSON.parse(admin_ID)
  console.log(admin_ID);



    
    const edit_adminprofile = (admin_ID) => {
        axios.put("http://localhost:3001/updateadmin",
            { name: name, email: email, admin_ID: admin_ID }).then(
                (response) => { 
                    window.location.reload();
                    console.log(response.data[0]);
                    localStorage.setItem('name', name);
                }
            )
            
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3001/adminprofile', {
                params: {
                    admin_ID: admin_ID,
                }
            });
            setRow(response.data[0]);
            setName(response.data[0].name);
            setEmail(response.data[0].email);
            console.log(response.data[0]);
        };
        fetchData();
    }, [admin_ID]);

  // const handleChange = (event) => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value
  //   });
  // }

  const mystyle = {
    closeBtn: {
        // marginTop: '0px',
        width: '145px',
        height: '40px',
        fontSize: '18px',
        backgroundColor: 'red',
        transition: '1s background ease',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        // marginRight: '0px',
        marginLeft: '10px'
    },
    submitBtn: {
        // marginTop: '5px',
        width: '145px',
        height: '40px',
        fontSize: '18px',
        backgroundColor: '#0A6466',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        // /marginRight: '30px'
        marginLeft: '350px'
    },
    forminput: {

      width: '360px',
      padding: '10px 10px',
      margin: '2px 0',
      display: 'inline - block',
      border: '1px solid #C0C0C0',
      borderRadius: '5px',
      height: '50px'
  },
  h5:{
    // backgroundColor: '#5eb6b8',
    // color: '#FFF',
    fontFamily: "Sans-serif", 
  },

};
  

  return (
    
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          // subheader="The information can be edited"
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
            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid> */}
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
            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <h5 style={mystyle.h5} >Phone No</h5>
              <input
                fullWidth
                label="Country"
                name="country"
                onChange={(event) => { setPhone_no(event.target.value); }}
                required
                defaultValue={Row.phone_no}
                variant="outlined"
                style={mystyle.forminput}
              />
            </Grid> */}
            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <h5 style={mystyle.h5} >Area</h5>
              <input
                fullWidth
                label="Country"
                name="country"
                onChange={(event) => { setArea(event.target.value); }}
                required
                style={mystyle.forminput}
                defaultValue={Row.area}
                variant="outlined"
              />
            </Grid> */}
            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select State"
                name="state"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={Row.area}
                variant="outlined"
              >
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid> */}
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
            onClick={() => { edit_adminprofile(admin_ID) }}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
