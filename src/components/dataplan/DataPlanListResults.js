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

const DataPlanListResults = ({ DataPlan, rest, props }) => {

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
  }));
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

  return (
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
          <h1 style={{flex:3, flexWrap: 'wrap'}} >TASK</h1>
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
                  <TableCell>Type</TableCell>
                  <TableCell>Session</TableCell>
                  <TableCell>Date</TableCell>
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
                      <TableCell>{customer.type}</TableCell>
                      <TableCell>{customer.session}</TableCell>
                      <TableCell>{customer.date}</TableCell>
                      <TableCell align="center">
                        <Link to={`/appp/TaskInfo/${customer.task_id}`}  >
                          <Button
                            color="primary"
                            variant="contained">
                            View
                          </Button>
                        </Link>
                        {'   '}
                        <Link to={`/appp/UpdateTask/${customer.task_id}`}  >
                          <Button
                            color="primary"
                            variant="contained">
                            Edit
                          </Button>
                        </Link>
                        {' '}
                        <Button onClick={() => { deleteEmployee(customer.task_id) }} color="primary"
                          variant="contained">
                          Delete
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
          count={DataPlan.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5,10,20 ]}
        />
      </Card>
    </>
  );
};

DataPlanListResults.propTypes = {
  DataPlan: PropTypes.array.isRequired
};

export default DataPlanListResults
