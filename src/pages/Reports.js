import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import axios from "axios";
import AnnualVisitReport from "src/components/reports/AnnualVisitReport";
import AnnualExpenseReport from "src/components/reports/AnnualExpenseReport";
import AnnualTaskReport from "src/components/reports/AnnualTaskReport";
import ReactToPrint1 from 'react-to-print';
import ReactToPrint2 from 'react-to-print';
import ReactToPrint3 from 'react-to-print';
import DataComponent from 'src/pages/DataComponent';
import DataComponent2 from 'src/pages/DataComponent2';
import DataComponent3 from 'src/pages/DataComponent3';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import {
  Box,
  Button,
  CssBaseline,
  Grid,
  Paper,
  Card,
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import back from '../images/back3.jpg';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';

const Reports = ({ rest,props,componentRef,componentRef2,componentRef3} ) => {

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
    button: {
      margin: theme.spacing(1),
    },
    backgroud: {
      backgroundColor: '#5eb6b8',
      backgroundImage: `url(${back})`,
    },
    view: {
      paddingRight:'10px',
      color: '#FFF',
      size:'200px',
    },
    h1: {
      fontFamily: "Sans-serif",
      color: '#FFF',
      fontWeight:'bold'
    },
  }));

  const [visits, setVisits] = useState([]);
  

  useEffect(() => {
    try {    
      axios.get("http://localhost:3001/viewvisitsummary",{
      }).then((response)=>{
        setVisits(response.data);
          });
    } catch (e){
      console.log("error");
      console.log(e);
    }
  }, []);

  const [expenses, setExpenses] = useState([]);
  

  useEffect(() => {
    try {    
      axios.get("http://localhost:3001/viewexpensesummary",{
      }).then((response)=>{
        setExpenses(response.data);
          });
    } catch (e){
      console.log("error");
      console.log(e);
    }
  }, []);

  const [tasks, setTasks] = useState([]);
  

  useEffect(() => {
    try {    
      axios.get("http://localhost:3001/viewtasksummary",{
      }).then((response)=>{
        setTasks(response.data);
          });
    } catch (e){
      console.log("error");
      console.log(e);
    }
  }, []);

  const classes = useStyles();

  return (
    <>
    <Helmet>
      <title>Reports</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
      className={classes.backgroud}
    >
      <Container maxWidth={false}>
    <>
      <Box {...props}>
        <Box
          sx={{
            display: 'flex',
            mt: 3,
            flex: 3,
            marginLeft: '400px',
          }}
        >
          <view className={classes.view}> <DescriptionOutlinedIcon style={{ fontSize:"40px" }} /></view>
          <h1 style={{flex:3, flexWrap: 'wrap'}} className={classes.h1} >Reports</h1>

        </Box>
      </Box>
      <br />
      <div className={classes.root}>
      <CssBaseline />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
          
          
              <div style={{display:'flex'}}>
                   <div style={{width:'1000px'}}>
               <Grid item xs={16}  direction="row">
              <Paper style={{marginTop:'20px'}}>
                
                 
              <div align='right' style={{marginTop:'20px'}}>
              <ReactToPrint1
           content={() =>componentRef}
            trigger={() => 
              // <button className="btn btn-success" style={{marginTop:'20px',border:'none',marginRight:'30px',marginBottom:'20px',backgroundColor:'#0A6466'}}>Generate Report</button>
              <Box p={3}>
            <Button
              size="small"
              variant="contained" 
              color="primary"
              startIcon={<NoteAddIcon />}>
              Generate Report
            </Button>
            </Box>
            }/>
         </div>
         
          <DataComponent  ref={(response) => (componentRef = response)} />          
              
              </Paper>
              </Grid><br/>
              </div>
              </div>
              </Grid>
        </Container>
    </div>  
      {/* <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
          <AnnualVisitReport />
          </Box>
        </PerfectScrollbar>
      </Card> */}
      <br />
      <div className={classes.root}>
      <CssBaseline />

        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
          
          
              <div style={{display:'flex'}}>
                   <div style={{width:'1000px'}}>
               <Grid item xs={16}  direction="row">
              <Paper style={{marginTop:'20px'}}>
                
                 
              <div align='right' style={{marginTop:'20px'}}>
          <ReactToPrint2
           content={() =>componentRef2}
            trigger={() => 
              // <button className="btn btn-success" style={{marginTop:'20px',border:'none',marginRight:'30px',marginBottom:'20px',backgroundColor:'#0A6466'}}>Generate Report</button>
              <Box p={3}>
            <Button
              size="small"
              variant="contained" 
              color="primary"
              startIcon={<NoteAddIcon />}>
              Generate Report
            </Button>
            </Box>
            }/>
         </div>
         
          <DataComponent2  ref={(response2) => (componentRef2 = response2)} />          
              
              </Paper>
              </Grid><br/>
              </div>
              </div>
              </Grid>
        </Container>
    </div>
      {/* <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
          <AnnualExpenseReport expenses={expenses} />
          </Box>
        </PerfectScrollbar>
      </Card> */}
      <br />
      <div className={classes.root}>
      <CssBaseline />

        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
          
          
              <div style={{display:'flex'}}>
                   <div style={{width:'1000px'}}>
               <Grid item xs={16}  direction="row">
              <Paper style={{marginTop:'20px'}}>
                
                 
              <div align='right' style={{marginTop:'20px'}}>
              <ReactToPrint3
           content={() =>componentRef3}
            trigger={() => 
              // <button className="btn btn-success" style={{marginTop:'20px',border:'none',marginRight:'30px',marginBottom:'20px',backgroundColor:'#0A6466'}}>Generate Report</button>
              <Box p={3}>
            <Button
              size="small"
              variant="contained" 
              color="primary"
              startIcon={<NoteAddIcon />}>
              Generate Report
            </Button>
            </Box>
            }/>
         </div>
         
          <DataComponent3  ref={(response3) => (componentRef3 = response3)} />          
              
              </Paper>
              </Grid><br/>
              </div>
              </div>
              </Grid>
        </Container>
    </div>
      {/* <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
          <AnnualTaskReport tasks={tasks} />
          </Box>
        </PerfectScrollbar>
      </Card> */}
    </>
    </Container>
    </Box>
  </>
  ); 
};

export default Reports;
 