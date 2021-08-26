import { Helmet } from 'react-helmet';
// import DataPlanListResults from 'src/components/dataplan/DataPlanListResults';
// import DataPlan from 'src/__mocks__/DataPlan';
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
import getInitials from 'src/utils/getInitials';
import { Link, Route } from 'react-router-dom';
import { Search as SearchIcon } from 'react-feather';
import { makeStyles } from '@material-ui/core/styles';

const DataPlanList = ({ rest, props }) => {

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
    backgroud:{
      // backgroundColor: '#5eb6b8',
    },
    link:{
      // backgroundColor: '#5eb6b8',
      color: '#FFF',
    },
  }));
  
  // #35dade,#27bec2,#186263
  const classes = useStyles();

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([])

  let manager_ID = localStorage.getItem('managerid');
  manager_ID = JSON.parse(manager_ID)
  console.log(manager_ID);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/gettask', {
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

  const deleteEmployee = (task_id) => {
    axios.get("http://localhost:3001/delete", {
      params: {
        task_id: task_id,
      }
    }).then((response) => {
      window.location.reload();
    })
  };

 
  const [searchTerm, setSearchTerm] = useState("");

  console.log(manager_ID);
  return (
    <>
      <Helmet>
        <title>Data</title>
      </Helmet>
      <Box
        sx={{
          // backgroundColor: 'background.default',
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
                  // justifyContent: 'flex-end',
                  mt: 3,
                  flex: 3,
                  marginTop: '0px',
                }}
              >
                <h1 style={{ flex: 3, flexWrap: 'wrap' }} >TASK</h1>
                <Link to={'/appp/AsignTask'}>
                  <Button
                    color="primary"
                    variant="contained"
                  >
                    Asign Task
                  </Button>
                </Link>

              </Box>
              <Box sx={{ mt: 3 }}
              >
                <Card>
                  <CardContent>
                    <Box sx={{ maxWidth: 500 }}>
                      <TextField
                        // fullWidth
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
                        // alignItems="center"
                        className={classes.textfield}
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
                        <TableCell> Medical Rep Name</TableCell>
                        <TableCell>Task Title</TableCell>
                        <TableCell>Location</TableCell>                        
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* {selectedCustomerIds.slice(0, limit).map((customer) => ( */}
                      {selectedCustomerIds.slice(0, limit).filter(val => {
                        if (searchTerm === "") {
                          return val;
                        } else if (
                          val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                          return val
                        }
                      }).map((customer) => {
                        const dt = new Date(customer.date);
                      const year = dt.getFullYear() + '/';
                      const month = ('0' + (dt.getMonth() + 1)).slice(-2) + '/';
                      const day = ('0' + dt.getDate()).slice(-2);
                        return (
                          <TableRow
                            hover
                            key={customer.task_id}
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
                            <TableCell>{customer.title}</TableCell>
                            <TableCell>{customer.location}</TableCell>
                            <TableCell>{year + month + day}</TableCell>
                            <TableCell>{customer.status}</TableCell>
                            <TableCell align="center">
                              
                                <Button
                                  color="primary"
                                  variant="contained">
                                    <Link to={`/appp/TaskInfo/${customer.task_id}`} className={classes.link} >
                                  View
                                  </Link>
                                </Button>
                              
                              {'   '}
                              
                                <Button
                                  color="primary"
                                  variant="contained"
                                  disabled={customer.status =="Complete"}>
                                    <Link to={`/appp/UpdateTask/${customer.task_id}`} className={classes.link} >
                                  Edit
                                  </Link>
                                </Button>
                             
                              {' '}
                              <Button onClick={() => { deleteEmployee(customer.task_id) }} color="primary"
                                variant="contained"
                                disabled={customer.status =="Complete"}
                                // disabled={true}
                                
                                >
                                  <Link to={`/appp/dataplan`} className={classes.link} >
                                Delete
                                </Link>
                              </Button>

                            </TableCell>
                          </TableRow>
                          // ))}
                        )
                      })
                      }
                    </TableBody>
                  </Table>
                </Box>
              </PerfectScrollbar>
              <TablePagination
                component="div"
                count="6"
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 20]}
              />
            </Card>
          </>
        </Container>
      </Box>
    </>
  );
};

export default DataPlanList;
