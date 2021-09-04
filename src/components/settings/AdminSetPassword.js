import React, { useState } from "react";
import clsx from 'clsx';
import axios from "axios";
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link'
import Form from 'react-bootstrap/Form';
// import { Button } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
// import { Redirect } from "react-router-dom"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { useForm } from "react-hook-form";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Card,
  CardContent,
  CardHeader,
  TextField
} from '@material-ui/core';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',

  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    fontSize: 40,
    fontWeight: 600,
  },
  userimage: {
    height: 60,
    width: 60,
    borderRadius: 100,
    borderColor: 'white',

  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',

  },

  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginTop: '20px',
    marginLeft: '40px',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 'auto',
  },
  addbutton: {
    backgroundColor: '#0000ff',
    height: '50px',
    width: '160px',
    borderRadius: '5px',
    marginRight: '10px',
    textDecoration: 'none',
    textAlign: 'center',
    paddingTop: '10px'
  },
  addcategorybox: {
    width: '1100px',
    height: '120px',
    backgroundColor: '#fff',
    marginLeft: '30px',
    display: 'flex',
    //boxShadow:'5px 1px 2px 2px '

  },
  categorybtn: {
    border: 0,
    backgroundColor: '#9bddff',
    width: '800px',
    height: '40px',
    marginTop: '40px',
    marginLeft: '30px',
    fontSize: '20px',
    borderRadius: '5px'

  },
  addcategory: {
    height: '40px'
  },
  categoryimage: {
    height: '500px',
    width: '1100px'
  },
  btn: {
    color: 'white',
    fontSize: '18px',
    width: '150px',
    height: '40px',
    backgroundColor: 'blue',
    border: 'none',
    borderRadius: '5px'
  },
  addproducts: {
    display: 'flex',
  },



}));

const styles = {
  side: {
    backgroundColor: 'rgb(37, 37, 94)',
  }
};

const schema = yup.object().shape({
  // password: yup.string().required().min(8).max(15),
  confirm_password: yup.string().when('newpassword', (newpassword, schema) => {
    if (newpassword) return schema.required('Confirm Password is required');
  })
    .oneOf([yup.ref('newpassword')], 'Passwords must match')
})


export default function AdminSetPassword() {
  const classes = useStyles();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });


  // let manager_ID = localStorage.getItem('managerid');
  // manager_ID = JSON.parse(manager_ID)

  const [validation, setValidation] = useState(" ")


  const updatepassword = (data) => {
    console.log(data.confirm_password)
    console.log(data.oldpassword)

   
    axios.get("http://localhost:3001/adminupdatepassword",
      { params: { oldpassword: data.oldpassword, confirm_password: data.confirm_password } }).then(
        (response) => {} );
        
    

   
    axios.get('http://localhost:3001/adminpasswordvalidation', {
      params: {
        confirm_password: data.confirm_password,
      }
    }).then(
      (response) => {
        if (response.data.message == "successfully password changed") {
          alert(response.data.message)
          document.getElementById("create-course-form").reset();
          setValidation(response.data.message0);
        }
        else {
          setValidation(response.data.message);
          document.getElementById("create-course-form").reset();
        }
      });


  };



  const [anchorEl, setAnchorEl] = React.useState(null);



  return (
    <div className={classes.root}>
      <main style={{ backgroundColor: '#f0f8ff' }} className={classes.content}>
        <div className={classes.appBarSpacer} />
        {/* <Container maxWidth="lg" className={classes.container}>

          <Grid container spacing={10}> */}
        {/* Recent Orders */}
        {/* <Grid item xs={11} direction="row"  >

              <div >
                <Paper className={classes.paper}>

                  <Typography component="h1" variant="h6" color="inherit" align="center" width="100%" noWrap className={classes.title}>
                    <strong> Reset password </strong>
                  </Typography><br /> */}



        <Form id="create-course-form" onSubmit={handleSubmit(updatepassword)}>
          <Card>
            <CardHeader
              subheader="Update password"
              title="Password"
            />
            <Divider />
            <CardContent>
              <Form.Group as={Row} controlId="formHorizontaloldPassword">

                <TextField
                  type="password" hidden={true}
                  {...register('oldpassword')}
                  required
                  fullWidth
                  label="Current Password"
                  margin="normal"
                  type="password"
                  variant="outlined"
                />
                <p>{validation}</p>
              </Form.Group><br />

              <Form.Group as={Row} controlId="formHorizontalnewPassword">

                <TextField
                  type="password"
                  {...register('newpassword')}
                  required
                  fullWidth
                  label="New Password"
                  margin="normal"
                  type="password"
                  variant="outlined"
                />


              </Form.Group><br />

              <Form.Group as={Row} controlId="formHorizontalConfirmPassword">

                <TextField
                  type="password"
                  {...register('confirm_password')}
                  required
                  fullWidth
                  label="Confirm Password"
                  margin="normal"
                  type="password"
                  variant="outlined"
                />
                {errors.confirm_password?.message && <p className=" errormessage" >{errors.confirm_password?.message}</p>}
              </Form.Group><br />
              {/* <div align="center">
                <Button style={{ fontSize: '20px', width: '200px' }} type="submit"  >Submit</Button>
              </div> */}

              {/* <div>{passwordvalidation()}</div> */}
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
                type="submit"
              >
                Update
              </Button>
            </Box>
          </Card>


        </Form>




        {/* </Paper>
              </div>
            </Grid>

          </Grid>
        </Container> */}
      </main>
    </div>
  );
}