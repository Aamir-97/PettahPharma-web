import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import {
  Avatar,
  Box,
  Card,
  Container,
  Checkbox,
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
import getInitials from 'src/utils/getInitials';
import { Link, Route } from 'react-router-dom';
import { Search as SearchIcon } from 'react-feather';

const SummaryReportResults = ({ SummaryReport,rest,props }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([])

  let manager_ID = localStorage.getItem('managerid');
  manager_ID = JSON.parse(manager_ID)
  console.log(manager_ID);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/GetMedicalRapList', {
        params: {
          manager_ID: manager_ID,
        }
      });
      setSelectedCustomerIds(response.data);
      // console.log(response.data);
    };
    fetchData();
  }, [manager_ID]);


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
      // backgroundColor: '#5eb6b8',
      color: '#FFF',
    },
    h1:{
      // backgroundColor: '#5eb6b8',
      // color: '#FFF',
      fontFamily: "Sans-serif", 
      align: "center"
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
  }));
  
  const classes = useStyles();

  // const [kpiResult, setKpiResult] = React.useState({
  //   totalDoctors : '',
  //   totalVSR : '',
  //   expensesAmount : '',
  //   leaveCount : '',
  // }) 

  const [showKpi, setShowKpi] = useState(false);
  const [totalDoctors, setTotalDoctor] = React.useState(0);
  const [totalVSR, setTotalVSR] = React.useState(0);
  const [expensesAmount, setExpensesAmount] = React.useState(0);
  const [leaveCount, setLeaveCount] = React.useState(0);
  const [visitedDoctorCount, setVisitedDoctorCount] = React.useState(0);
  const [completeTask, setCompleteTask] = React.useState(0);
  // const [expenseVisit, setExpenseVisit] = React.useState(0);
  const [metPerDays, setMetPerDays] = React.useState(0);

  const taskCompletePercentage = parseInt(completeTask)/parseInt(totalVSR) * 100;
  const expensePerVisit = parseInt(expensesAmount)/parseInt(totalVSR);
  const doctorCourage = parseInt(visitedDoctorCount)/ parseInt(totalDoctors) *100;


  const GetKpis = async (rep_ID) => {

        setShowKpi(true);
    
        await axios.post("http://localhost:3001/kpi/doctorCount",{
          rep_ID : rep_ID,  
        }).then((response)=>{
          // setStateData({...stateData, reportCount : response.data[0].reportCount})
          // setKpiResult({...kpiResult, totalDoctors : response.data.doctorCount});
          setTotalDoctor(response.data.doctorCount);
        });
 

        // to post claimed expenses count
        await axios.post("http://localhost:3001/kpi/reportCount",{
          rep_ID : rep_ID, 
        }).then((response)=>{
          // setStateData({...stateData, expensesCount: response.data.expensesCount });
          // setKpiResult({...kpiResult, totalVSR : response.data.reportCount});
          setTotalVSR(response.data.reportCount);
        });


        // to post annual leave taken count
        await axios.post("http://localhost:3001/kpi/ExpensesAmount",{
          rep_ID : rep_ID, 
        }).then((response)=>{
          // setStateData({...stateData, leaveCount: response.data.leaveCount });
          // setKpiResult({...kpiResult, expensesAmount : response.data.expensesAmount});
          setExpensesAmount(response.data.expensesAmount);
        });

        // to post total doctors count
        await axios.post("http://localhost:3001/kpi/leaveCount",{
          rep_ID : rep_ID, 
        }).then((response)=>{
          // console.log(response.data.doctorCount);      
          // setStateData({...stateData, doctorCount: response.data.doctorCount });
          // setKpiResult({...kpiResult, leaveCount : response.data.leaveCount});
          setLeaveCount(response.data.leaveCount);  
        });

        // to get Complete task count
        await axios.post("http://localhost:3001/kpi/compeleteTask",{
          rep_ID : rep_ID, 
        }).then((response)=>{
          // console.log(response.data.doctorCount);      
          // setStateData({...stateData, doctorCount: response.data.doctorCount });
          // setKpiResult({...kpiResult, leaveCount : response.data.leaveCount});
          setCompleteTask(response.data.completeTaskCount);  
        }); 

        // to get Complete task count
        await axios.post("http://localhost:3001/kpi/VisitDoctor",{
          rep_ID : rep_ID, 
        }).then((response)=>{
          // console.log(response.data.doctorCount);      
          // setStateData({...stateData, doctorCount: response.data.doctorCount });
          // setKpiResult({...kpiResult, leaveCount : response.data.leaveCount});
          setVisitedDoctorCount(response.data.visitDoctorCount);  
        });  


  }


  return (
    <>
    <Helmet>
      <title>KPI</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
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
            <h1 style={{ flex: 3, flexWrap: 'wrap' }} className={classes.h1} >KPI ANALYSIS  </h1>
          </Box>

              <Box sx={{ mt: 3, mb : 3 }}>
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
                        variant="outlined"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Box>

              { showKpi && (
                              <Card {...rest}>
                              <PerfectScrollbar>
                                <Box sx={{ minWidth: 1050 }}>
                                  <Table>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell align="center">No. of Doctors</TableCell>
                                        <TableCell align="center">Total VSR</TableCell>
                                        <TableCell align="center">Expenses</TableCell>
                                        <TableCell align="center">Leaves</TableCell>
                                        <TableCell align="center">Doctor Coverage(%)</TableCell>
                                        <TableCell align="center">Task complete (%)</TableCell>
                                        <TableCell align="center">Expense per visit</TableCell>
                                        <TableCell align="center">No.of met/Working Days</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {/* {selectedCustomerIds.slice(0, limit).map((rep) => ( */}
                                        <TableRow
                                          hover
                                          // key={rep.task_id}
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
                                      {/* ))} */}
                                    </TableBody>
                                  </Table>
                                </Box>
                              </PerfectScrollbar>
                            </Card>
              )}



              {<br/>}

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
                          <TableCell align="center">Rating</TableCell>
                          <TableCell align="center">KPI</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedCustomerIds.slice(0, limit).map((rep) => (
                          <TableRow
                            hover
                            // key={rep.task_id}
                          >
                            <TableCell align="center"></TableCell>
                            <TableCell >{rep.rep_ID}</TableCell>
                            <TableCell>{rep.name}</TableCell>
                            <TableCell>{rep.email}</TableCell>
                            <TableCell>{rep.phone_no}</TableCell>
                            <TableCell>{rep.working_area}</TableCell>
                            <TableCell>{rep.rating}</TableCell>
                            <TableCell align="center">
                              {/* <Link to={`/appp/SummaryInfo/${rep.report_id}`}  > */}
                                <Button
                                  onClick = {()=>GetKpis(rep.rep_ID)}
                                  color="primary"
                                  variant="contained">
                                  View
                                </Button>
                              {/* </Link> */}
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

