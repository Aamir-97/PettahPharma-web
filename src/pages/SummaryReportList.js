import { Helmet } from 'react-helmet';
// import { Box, Container } from '@material-ui/core';
// import SummaryReportResults from 'src/components/summaryreport/SummaryReportResults';
// import SummaryReportToolbar from 'src/components/summaryreport/SummaryReportToolbar';
// import SummaryReport from 'src/__mocks__/SummaryReport';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddCommentIcon from '@material-ui/icons/AddComment';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import axios from "axios";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  Button,
  Container,
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
import { makeStyles } from '@material-ui/core/styles';
import back from '../images/back3.jpg';

const SummaryReportList = (rest, props) => {

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([])

  let manager_ID = localStorage.getItem('managerid');
  manager_ID = JSON.parse(manager_ID)
  console.log(manager_ID);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/getsummary', {
        params: {
          manager_ID: manager_ID,
        }
      });
      setSelectedCustomerIds(response.data);
      console.log(response.data);
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

  // const deleteEmployee = (task_id) => {
  //   axios.get("http://localhost:3001/delete", {
  //     params: {
  //       task_id: task_id,
  //     }
  //   }).then((response) => {
  //     window.location.reload();
  //   })
  // };

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
    // debutton:{
    //   backgroundColor: 'red',
    // },
    link: {
      // backgroundColor: '#5eb6b8',
      color: '#FFF',
      
    },
    h1: {
      // backgroundColor: '#5eb6b8',
      // color: '#FFF',
      color: '#FFF',
      fontFamily: "Sans-serif",
    },
    view: {
      // backgroundColor: '#5eb6b8',
      //  color: '#0A6466',
      // marginTop: '7px',
      color: '#FFF',
      paddingRight:'10px',
      // fontSize:'100px',
      // backgroundImage: `url(${back})`,
      // color: '#0A6466',
      size:'200px',
    },
    backgroud: {
      backgroundColor: '#5eb6b8',
      backgroundImage: `url(${back})`
      //  color: '#0A6466',
      // marginTop: '7px',
      // paddingRight:'10px',
      // fontSize:'100px',
      // size:'200px',
    },
  }));
  const classes = useStyles();

  const deleteSummaryReport = (report_id) => {
    axios.get("http://localhost:3001/deletesummary", {
      params: {
        report_id: report_id,
      }
    }).then((response) => {
      window.location.reload();
      console.log('kkkk');
    })
  };

  console.log('kkkk');
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Helmet>
        <title>Data</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3,
          // backgroundImage: `url(${back})`
        }}
        className={classes.backgroud}
      >
        <Container maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            <>
              <Box {...props}>
                {/* <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: '10px',
                  marginLeft: '400px',
                  
                }}> */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '-10px',
                    marginLeft: '400px',
                    // backgroundImage: `url(${back})`
                  }}
                >
                  <view className={classes.view}> <ListAltIcon style={{ fontSize:"40px" }} /></view>
                  <h1 style={{ flex: 3, flexWrap: 'wrap' }} className={classes.h1}>SUMMARY REPORT</h1>
                  {/* <Link to={'/appp/AsignTask'}>
        <Button
          color="primary"
          variant="contained"
        >
          Asign Task
        </Button>
        </Link> */}

                </Box>
                {/* </Box> */}
                <Box sx={{ mt: 3 }}>
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
                          placeholder="Search Employee"
                          variant="outlined"
                          onChange={(e) => { setSearchTerm(e.target.value); }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
              <br />
              <Card {...rest}>
                <PerfectScrollbar>
                  <Box sx={{ minWidth: 1050 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell><b> Medical Rep Name</b></TableCell>
                          <TableCell><b>Doctor Name</b></TableCell>
                          <TableCell><b>Visit Type</b></TableCell>
                          <TableCell><b>Average Duration</b></TableCell>
                          <TableCell><b>Date</b></TableCell>
                          <TableCell align="center"><b>Action</b></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {/* {selectedCustomerIds.slice(0, limit).map((customer) => ( */}
                        {/* {selectedCustomerIds.slice(0, limit).map((customer) => ( */}
                        {selectedCustomerIds.slice(0, limit).filter(val => {
                          if (searchTerm === "") {
                            return val;
                          } else if (
                            val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return val
                          }
                          else if (
                            val.date.includes(searchTerm)) {
                            return val
                          }
                        }).map((customer) => {
                          const dt = new Date(customer.date);
                          const year = dt.getFullYear() + '-';
                          const month = ('0' + (dt.getMonth() + 1)).slice(-2) + '-';
                          const day = ('0' + dt.getDate()).slice(-2);
                          return (
                            <TableRow
                              hover
                            // key={customer.task_id}
                            >
                              <TableCell>
                                <Box
                                  sx={{
                                    alignItems: 'center',
                                    display: 'flex'
                                  }}
                                >
                                  <Typography
                                    color="textPrimary"
                                    variant="body1"
                                  >
                                    {customer.name}

                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell>{customer.doctor_name}</TableCell>
                              <TableCell>{customer.visit_type}</TableCell>
                              <TableCell>{customer.avg_duration} Hours</TableCell>
                              <TableCell>{year + month + day}</TableCell>
                              <TableCell align="center">
                                <Link to={`/appp/SummaryInfo/${customer.report_id}`}  >
                                  <Button
                                    color="primary"
                                    variant="contained"
                                    startIcon={<VisibilityIcon />}>
                                    View
                                  </Button>
                                </Link>
                                {'   '}
                                <Link to={`/appp/SummaryComment/${customer.report_id}`}  >
                                  <Button
                                    color="edit"
                                    variant="contained"
                                    startIcon={<AddCommentIcon />}>
                                    Add Comment
                                  </Button>
                                </Link>
                                {' '}
                                {/* <Button onClick={() => { deleteSummaryReport(customer.report_id) }} color="primary"
                      variant="contained">
                      Delete
                    </Button> */}


                              </TableCell>
                            </TableRow>
                          )
                        })
                        }
                      </TableBody>
                    </Table>
                  </Box>
                </PerfectScrollbar>
                <TablePagination
                  component="div"
                  count="5"
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleLimitChange}
                  page={page}
                  rowsPerPage={limit}
                  rowsPerPageOptions={[5, 10, 25]}
                />
              </Card>
            </>
          </Box>
        </Container>
      </Box>
    </>
  )
};

export default SummaryReportList;
