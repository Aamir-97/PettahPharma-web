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
  Typography
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import { Link, Route } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddCommentIcon from '@material-ui/icons/AddComment';

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

const LeaveResults = ({ Leave, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([])

  let manager_ID = localStorage.getItem('managerid');
  manager_ID = JSON.parse(manager_ID)
  console.log(manager_ID);

  const useStyles = makeStyles(() => ({
    link: {
      // backgroundColor: '#5eb6b8',
      color: '#FFF',
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/getleave', {
        params: {
          manager_ID: manager_ID,
        }
      });
      setSelectedCustomerIds(response.data);
      console.log(response.data);
    };
    fetchData();
  }, [manager_ID]);


  const addstatus = (status, leave_ID) => {
    console.log(status);
    axios.put("http://localhost:3001/addstatus",
      { status: status, leave_ID: leave_ID }).then(
        (response) => {
          window.location.reload();
          // this.setState({});
        }
      )
  };


  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);


  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  // constructor = () => {
  // this.state.Date().toLocaleString();
  // };

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  today = yyyy + '-' + mm + '-' + dd;
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell> Medical Rep Name</TableCell>
                <TableCell>Leave Type</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                {/* <TableCell>Date</TableCell> */}
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedCustomerIds.slice(0, limit).map((customer) => {
                const dt = new Date(customer.start_Date);
                const year = dt.getFullYear() + '/';
                const month = ('0' + (dt.getMonth() + 1)).slice(-2) + '/';
                const day = ('0' + dt.getDate()).slice(-2);
                const dtt = new Date(customer.end_Date);
                const yearr = dtt.getFullYear() + '/';
                const monthr = ('0' + (dtt.getMonth() + 1)).slice(-2) + '/';
                const dayr = ('0' + dtt.getDate()).slice(-2);
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
                          {customer.repname}

                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{customer.leave_Type}</TableCell>
                    <TableCell>{year + month + day}</TableCell>
                    <TableCell>{yearr + monthr + dayr}</TableCell>
                    {/* <TableCell>{customer.date}</TableCell> */}
                    <TableCell align="center">
                      <Link to={`/appp/LeaveInfo/${customer.leave_ID}`}  >
                        <Button
                          color="primary"
                          variant="contained"
                          startIcon={<VisibilityIcon />}>
                          View
                        </Button>
                      </Link>
                      {'   '}

                      <Button
                        color="edit"
                        // disabled={year + month + day < { today }}
                        variant="contained"
                        startIcon={<AddCommentIcon />}>
                        <Link to={`/appp/LeaveComment/${customer.leave_ID}`} className={classes.link} >
                          Add Comment
                        </Link>
                      </Button>

                      {' '}
                      <Button
                        color="primary"
                        variant="contained"
                        // onClick={addstatus("Accept", customer.leave_ID)}
                        onClick={() => { addstatus("1", customer.leave_ID) }}
                        disabled={customer.status == "1" }
                        startIcon={<CheckIcon />}>
                        Accept
                      </Button>
                      {' '}
                      <Button
                        color="exit"
                        variant="contained"
                        onClick={() => { addstatus("0", customer.leave_ID) }}
                        disabled={customer.status == "0" }
                        startIcon={<ClearIcon />} >
                        Reject
                      </Button>
                      {' '}

                    </TableCell>
                  </TableRow>

                )
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={Leave.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

LeaveResults.propTypes = {
  Leave: PropTypes.array.isRequired
};

export default LeaveResults;

