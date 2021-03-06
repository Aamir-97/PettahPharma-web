import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import {
  Box,
  Card,
  Container,
  Table,
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
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import StarIcon from '@material-ui/icons/Star';
import back from '../images/back3.jpg';
import AssessmentIcon from '@material-ui/icons/Assessment';

const SummaryReportResults = ({ SummaryReport, rest, props }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([])

  let manager_ID = localStorage.getItem('managerid');
  manager_ID = JSON.parse(manager_ID)
  // console.log(manager_ID);

  useEffect(() => {
  console.log(manager_ID);
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/GetMedicalRapList', {
        params: {
          manager_ID: manager_ID,
        }
      });
      setSelectedCustomerIds(response.data);
    };
    fetchData();
  }, []);


  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);


  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const useStyles = makeStyles(() => ({
    link: {
      color: '#FFF',
    },
    h1: {
      fontFamily: "Sans-serif",
      align: "center",
      color: '#FFF',
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
    backgroud: {
      backgroundColor: '#5eb6b8',
      backgroundImage: `url(${back})`,
    },
    h1: {
      color: '#FFF',
      fontFamily: "Sans-serif",
      fontWeight : 'bold'
    },
    h2: {
      fontFamily: "Sans-serif",
      marginTop: 20,
      marginLeft: 20,
      fontSize : 24,
      fontWeight : 'bold'
    },
    h3: {
      fontFamily: "Sans-serif",
      marginLeft: 20,
      fontSize : 18,
      fontWeight : 'bold',
      color : 'red'

    },
  }));

  const classes = useStyles();

  const [showKpi, setShowKpi] = useState(false);
  const [totalDoctors, setTotalDoctor] = React.useState(0);
  const [totalVSR, setTotalVSR] = React.useState(0);
  const [expensesAmount, setExpensesAmount] = React.useState(0);
  const [leaveCount, setLeaveCount] = React.useState(0);
  const [visitedDoctorCount, setVisitedDoctorCount] = React.useState(0);
  const [completeTask, setCompleteTask] = React.useState(0);
  const [totalTask, setTotalTask] = React.useState(0);
  const [metPerDays, setMetPerDays] = React.useState(0);
  const expensePerVisit = parseInt(expensesAmount) / parseInt(totalVSR);
  const taskCompletePercentage = parseInt(completeTask) / parseInt(totalTask) * 100;
  const doctorCourage = parseInt(visitedDoctorCount) / parseInt(totalDoctors) * 100;
  const expensePerVisitPercentage = parseInt(expensePerVisit) / parseInt(expensesAmount) * 100;
  const [name, setName] = useState("");
  const [rep_ID, setRepId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const GetKpis = async (rep_ID, name) => {

    setName(name);
    setRepId(rep_ID);

    setShowKpi(true);

    await axios.post("http://localhost:3001/Kpi/StatisticData", {
      rep_ID: rep_ID,
    }).then((response) => {
      setTotalDoctor(response.data[0].doctorCount);
      setTotalVSR(response.data[0].reportCount);
      setExpensesAmount(response.data[0].expensesAmount);
      setLeaveCount(response.data[0].leaveCount);
      setCompleteTask(response.data[0].taskcount);
      setVisitedDoctorCount(response.data[0].visitedDoctorcount);
      setTotalTask(response.data[0].totalTask);
    });
  }

  const ratingEqu =  ( parseInt(taskCompletePercentage)+ parseInt(doctorCourage)+ parseInt(expensePerVisitPercentage))/3;
  const [rating, setRating]=React.useState('');


  useEffect(() => {
    const fetchData = async () => {
      if (ratingEqu>=90){
        setRating('4.5');
      } 
      else if (ratingEqu>=80){
        setRating('4.0');
      } 
      else if (ratingEqu>=70){
        setRating('3.5');
      } 
      else if (ratingEqu>=60){
        setRating('3.0');
      } 
      else if (ratingEqu>=50){
        setRating('2.5');
      } 
      else if (ratingEqu>=40){
        setRating('2.0');
      } 
      else if (ratingEqu>=30){
        setRating('1.5');
      } 
      else if (ratingEqu>=20){
        setRating('1.0');
      } 
      else if (ratingEqu>=10){
        setRating('0.5');
      } 
      else if (ratingEqu>=0){
        setRating('0.1');
      } 
      else {
        setRating('0');
      } 
    }
    fetchData();
  }, [ratingEqu]);


  



  return (
    <>
      <Helmet>
        <title>KPI</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3,

        }}
        className={classes.backgroud}
      >
        <Container maxWidth={false}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '0px',
              marginLeft: '400px',
            }}
          >
            <h1 style={{ flex: 3, flexWrap: 'wrap' }} className={classes.h1} > <AssessmentIcon style={{ fontSize: "40px" }}/> KPI ANALYSIS  </h1>
          </Box>

          <Box sx={{ mt: 3, mb: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ maxWidth: 500 }}>

                  <TextField
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon
                            fontSize="small"
                            color="action"
                          >
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      )
                    }}
                    placeholder="Search By Name"
                    onChange={(e) => { setSearchTerm(e.target.value); }}
                    variant="outlined"
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>

          {showKpi && (
            <Card {...rest}>
              <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                  <Typography>
                  <p style={{fontSize:'24px',color:'#0A6466',fontWeight: 'bold',fontFamily:'sans-serif', marginLeft: 20, marginTop: 20}}>{rep_ID} - {name} </p>
                  <p style={{fontSize:'18px',color:'#e53935', fontWeight: 'bold',fontFamily: 'Sans-serif', marginLeft: 23}}>KPI Rating - {rating} <StarIcon/></p>
                  </Typography>    
                  <Table>
                    <TableHead>

                      <TableRow>
                        <TableCell align="center">No. of Doctors</TableCell>
                        <TableCell align="center">Total VSR</TableCell>
                        <TableCell align="center">Expenses</TableCell>
                        <TableCell align="center">Leaves</TableCell>
                        <TableCell align="center">Doctor Coverage (%)</TableCell>
                        <TableCell align="center">Task complete (%)</TableCell>
                        <TableCell align="center">Expense per visit</TableCell>
                        <TableCell align="center">No.of met/Working Day</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow
                        hover
                      >
                        <TableCell align="center"> {totalDoctors} </TableCell>
                        <TableCell align="center"> {totalVSR} </TableCell>
                        <TableCell align="center"> {expensesAmount}.00 </TableCell>
                        <TableCell align="center"> {leaveCount} </TableCell>
                        <TableCell align="center"> {parseInt(doctorCourage)} %</TableCell>
                        <TableCell align="center"> {parseInt(taskCompletePercentage)} % </TableCell>
                        <TableCell align="center"> {parseInt(expensePerVisit)}.00 </TableCell>
                        <TableCell align="center"> {leaveCount} </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </PerfectScrollbar>
            </Card>
          )}



          {<br />}

          <Card {...rest}>
            <PerfectScrollbar>
              <Box sx={{ minWidth: 1050 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center">ID</TableCell>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">Phone_no</TableCell>
                      <TableCell align="center">Working area</TableCell>
                      <TableCell align="center">Address</TableCell>
                      <TableCell align="center">KPI</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedCustomerIds.slice(0, limit).filter(val => {
                      if (searchTerm === "") {
                        return val;
                      }
                      else if (
                        val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val
                      }
                      else if (
                        val.rep_ID == searchTerm) {
                        return val
                      }
                    }).map((rep) => (
                      <TableRow
                        hover
                      >
                        <TableCell align="center"></TableCell>
                        <TableCell >{rep.rep_ID}</TableCell>
                        <TableCell>{rep.name}</TableCell>
                        <TableCell>{rep.email}</TableCell>
                        <TableCell>{rep.phone_no}</TableCell>
                        <TableCell>{rep.working_area}</TableCell>
                        <TableCell>{rep.address}</TableCell>
                        <TableCell align="center">
                          <Button
                            onClick={() => GetKpis(rep.rep_ID, rep.name)}
                            color="primary"
                            variant="contained">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              // count={SummaryReport.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

SummaryReportResults.propTypes = {
  SummaryReport: PropTypes.array.isRequired
};

export default SummaryReportResults

