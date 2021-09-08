import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import axios from "axios";
// import generatePDF from "public/avatar_13";
import AnnualVisitReport from "src/components/reports/AnnualVisitReport";
import AnnualExpenseReport from "src/components/reports/AnnualExpenseReport";
import AnnualTaskReport from "src/components/reports/AnnualTaskReport";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  Container,
  Button,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import getInitials from 'src/utils/getInitials';
import { Link, Route } from 'react-router-dom';
import { Search as SearchIcon } from 'react-feather';
import { makeStyles } from '@material-ui/core/styles';

const Reports = ({ rest,props} ) => {

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
      // boxShadow: "2px 2px 5px  2px #9E9E9E",
      padding: "2vh",
      borderRadius: "5px",
    },
    button: {
      margin: theme.spacing(1),
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
    >
      <Container maxWidth={false}>
    <>
      <Box {...props}>
        <Box
          sx={{
            display: 'flex',
            // justifyContent: 'flex-end',
            mt: 3,
            flex: 3
          }}
        >
          <h1 style={{flex:3, flexWrap: 'wrap'}} >Reports</h1>

        </Box>
      </Box>
      <br />
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
          <AnnualVisitReport visits={visits} />
          </Box>
        </PerfectScrollbar>
      </Card>
      <br />
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
          <AnnualExpenseReport expenses={expenses} />
          </Box>
        </PerfectScrollbar>
      </Card>
      <br />
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
          <AnnualTaskReport tasks={tasks} />
          </Box>
        </PerfectScrollbar>
      </Card>
    </>
    </Container>
    </Box>
  </>
  ); 
};

export default Reports;
 