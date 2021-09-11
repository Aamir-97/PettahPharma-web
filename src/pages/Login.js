import { Link as RouterLink, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from 'react-helmet';
import logo from '../images/logo-gr.png'
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import back from '../images/login2.jpg';
import { makeStyles } from '@material-ui/core/styles';
function Login() {

  const navigate = useNavigate("");
  const [loginemail, setEmail] = useState("");
  const [loginpassword, setPassword] = useState("");
  const [loginStatusadmin, setLoginStatusadmin] = useState("");
  const [loginStatusmanager, setLoginStatusmanager] = useState("");
  const [loginStatusadminexist, setLoginStatusadminexist] = useState("");
  const [loginStatusmanagerexist, setLoginStatusmanagerexist] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const useStyles = makeStyles((theme) => ({
      root: {
        width: '100%',
  
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
      },
      heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
      },
      secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: 'black',
      },
      formbox: {
        backgroundColor: 'gray',
        width: '60%',
        marginTop: '40px',
        marginLeft: '200px',
        height: 'full',
        boxShadow: "2px 2px 5px  2px #9E9E9E",
        padding: "2vh",
        borderRadius: "5px",
        align: 'center',
      },
      textfield: {
        backgroundColor: 'white',
        width: '100%',
        marginTop: '0px',
        marginLeft: '100px',
        height: '100%',
        padding: "2vh",
        borderRadius: "5px",
      },
      link: {
        color: '#FFF',
      },
      h1: {
        color: '#FFF',
        fontFamily: "Sans-serif",
      },
      view: {
        paddingRight:'10px',
        color: '#FFF',
        size:'200px',
      },
      backgroud: {
        backgroundColor: '#5eb6b8',
        backgroundImage: `url(${back})`
      },
    }));
  

    const classes = useStyles();
  

  const Login = () => {
    
    axios.get('http://localhost:3001/loginsal', {
      params: {
        email: loginemail,
        password: loginpassword,
      }
    }).then((response) => {
      console.log(response.data[0]);
      console.log(response.data[0]);

      if (response.data.message1) {
        setLoginStatusmanager(response.data.message1);
      }
      else if (response.data.message11) {
        setLoginStatusmanagerexist(response.data.message11);
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
      console.log(response.data[0]);
      if (response.data.message2 ) {
        setLoginStatusadmin(response.data.message2);
      }
      else if (response.data.message22) {
        setLoginStatusadminexist(response.data.message22);
      }
      else {
        localStorage.setItem('name', response.data[0].name);
        navigate('/app/dashboard', { replace: true });
      }

    });

  }
  
  if(loginStatusadmin == "Wrong email/password combination!" && loginStatusmanager =="Wrong email/password combination!")
  {
    var validation= "Wrong email/password combination!";
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
        className={classes.backgroud}
      >
        <img style={{
          width: "86px",
          height: "86px",
          alignSelf: "center"
        }} src={logo} alt="Logo" />

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
