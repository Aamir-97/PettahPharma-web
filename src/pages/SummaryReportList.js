import { Helmet } from 'react-helmet';
// import { Box, Container } from '@material-ui/core';
// import SummaryReportResults from 'src/components/summaryreport/SummaryReportResults';
// import SummaryReportToolbar from 'src/components/summaryreport/SummaryReportToolbar';
// import SummaryReport from 'src/__mocks__/SummaryReport';
import EditIcon from '@material-ui/icons/Edit';
                          import DeleteIcon from '@material-ui/icons/Delete';
                          import VisibilityIcon from '@material-ui/icons/Visibility';
                          import AddCommentIcon from '@material-ui/icons/AddComment';

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


const SummaryReportList = (rest,props) => {

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

return(
  <>
    <Helmet>
      <title>Data</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
        
      }}
    >
      <Container maxWidth={false}>
        {/* <SummaryReportToolbar /> */}
        <Box sx={{ pt: 3 }}>
          {/* <SummaryReportResults SummaryReport={SummaryReport} /> */}
          <>

<Box {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '0px',
                  marginLeft: '400px',
        }}
      >
        <h1 style={{flex:3, flexWrap: 'wrap'}} >SUMMARY REPORT</h1>
       {/* <Link to={'/appp/AsignTask'}>
        <Button
          color="primary"
          variant="contained"
        >
          Asign Task
        </Button>
        </Link> */}
  
      </Box>
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
                <TableCell> Medical Rep Name</TableCell>
                <TableCell>Doctor Name</TableCell>
                <TableCell>Visit Type</TableCell>
                <TableCell>Average Duration</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="center">Action</TableCell>
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
                        startIcon ={<VisibilityIcon />}>
                        View
                      </Button>
                    </Link>
                    {'   '}
                    <Link to={`/appp/SummaryComment/${customer.report_id}`}  >
                      <Button
                        color="edit"
                        variant="contained"
                        startIcon ={<AddCommentIcon />}>
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
