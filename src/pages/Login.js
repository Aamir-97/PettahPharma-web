import { Link as RouterLink, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from 'react-helmet';
import logo from '../images/logo-gr.png'
// import * as Yup from 'yup';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import { height } from '@material-ui/system';
import { AlignCenter } from 'react-feather';


function Login() {

  const navigate = useNavigate("");
  const [loginemail, setEmail] = useState("");
  const [loginpassword, setPassword] = useState("");
  const [loginStatusadmin, setLoginStatusadmin] = useState("");
  const [loginStatusmanager, setLoginStatusmanager] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  
  //  
  //   localStorage.removeItem("email");
  // localStorage.removeItem("password")


  //   const Login = () => {
  //   axios.post("http://localhost:3001/login", {
  //     email: email,
  //     password: password,
  //   }).then((response)=>{
  //     // console.log (response.data.message);

  //     if (response.data.message2 == "Login admin"){
  //       // setLoginStatus(response.data.message1);
  //       navigate('/app/dashboard', { replace: true });
  //       // console.log ("Wrong password");

  //     } 
  //     else if (response.data.message1 == "Login salesmanager") {
  //       // setLoginStatus(response.data[0].email);
  //       // setLoginStatus(response.data.message1);
  //       console.log (response.data);
  //       localStorage.setItem('email' , email);
  //       localStorage.setItem('password' , password);
  //       navigate('/appp/dashboardsale', { replace: true });
  //       window.location.reload();

  //     };
  //   });
  // };
  

  const Login = () => {
    
    axios.get('http://localhost:3001/loginsal', {
      params: {
        email: loginemail,
        password: loginpassword,
      }
    }).then((response) => {
      console.log(response.data[0]);
      // setDt(response.data[0]);
      console.log(response.data[0]);

      if (response.data.message1) {
        // setLoginStatus(response.data[0].email);
        // setLoginStatus(response.data.message1);
        // localStorage.setItem('managerid', response.data[0].manager_ID);
        // localStorage.setItem('name', response.data[0].name);
        // localStorage.setItem('password' , password)
        // localStorage.setItem('password' , password)
        // navigate('/appp/dashboardsale', { replace: true });
        setLoginStatusmanager(response.data.message1);
        // setLoginStatus(response.
        // window.location.reload();
      }
      else {
       
        localStorage.setItem('managerid', response.data[0].manager_ID);
        localStorage.setItem('name', response.data[0].name);
        navigate('/appp/dashboardsale', { replace: true });
      }

    });


    axios.get('http://localhost:3001/loginadmin', {
      params: {
        email: loginemail,
        password: loginpassword,
      }
    }).then((response) => {
      console.log(response.data[0]);
      // setDt(response.data[0]);
      console.log(response.data[0]);
      if (response.data.message2 ) {
        setLoginStatusadmin(response.data.message2);
      }
      else {
        localStorage.setItem('name', response.data[0].name);
        navigate('/app/dashboard', { replace: true });
      }

    });

  }
  
  if(loginStatusadmin == "user name or password is wrong" && loginStatusmanager =="user name or password is wrong")
  {
    var validation= "Incorrect email or password";
  }


  return (

    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <img style={{
          width: "86px",
          height: "86px",
          alignSelf: "center"
        }} src={logo} alt="Logo" />
        {/* Logo of company */}

        <Container maxWidth="xs">
          <Box sx={{ mb: 3 }}>
            <Typography
              color="textPrimary"
              variant="h2"
              align="center"
            >
              Sign in
            </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="body2"
              align="center"
            >
              Sign in to Pettah Pharma
            </Typography>
          </Box>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
              md={6}
            >
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
            >
            </Grid>
          </Grid>
          <Box
            sx={{
              pb: 1,
              pt: 3
            }}
          >
          </Box>
          <TextField
            fullWidth
            label="Email Address"
            margin="normal"
            name="email"
            type="email"
            // value={values.email}
            variant="outlined"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            type="password"
            variant="outlined"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <Box sx={{ py: 2 }}>
            {/* {loginStatus} */}
            <Button
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={Login}
            >
              Sign in now
            </Button>
          </Box>
          <Typography
            color="red"
            textAlign="center"
          >{validation}</Typography>
        </Container>
      </Box>
    </>
  );
};

export default Login;
