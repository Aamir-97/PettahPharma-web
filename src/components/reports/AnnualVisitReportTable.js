import React from "react";
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import TableContainer from '@material-ui/core/TableContainer';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Paper from '@material-ui/core/Paper';
import { Search as SearchIcon } from 'react-feather';

// const useStyles = makeStyles((theme) => ({
//   table: {
//     border: '1px solid #009688',
//     display: 'inline - block',
//     padding: '10px 10px',
//     margin: '2px 0',
//     width: '100%',
//     boxShadow: "2px 2px 5px  2px #9E9E9E",
//   },
//   tbody: {
//     textalign: 'left',
//     padding: '8px',
//   },
//   thead: {
//     backgroundColor: '#80cbc4',
//     textalign: 'left',
//     padding: '8px',
//   },
// }));


const AnnualVisitReportTable = ({ visits }) => {

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

  const classes = useStyles();
  const [selectedRowIds, setSelectedRowIds] = useState([])

  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div >
        {/* <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    > */}
    <Box sx={{ mt: 3 }}
        >
          <Card>
            <CardContent>
              <Box sx={{ maxWidth: 1050 }}>
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
                  placeholder="Search"
                  variant="outlined"
                  onChange={(e) => { setSearchTerm(e.target.value); }}
                  // alignItems="center"
                  className={classes.textfield}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
    <Box>
      {visits.length === 0 ? (
        "You currently have no visits created"
      ) : (
        <TableContainer component={Paper}>
        <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
        <Table aria-label="simple table">
        <TableHead>
          <TableRow>
              {/* <TableCell scope="col">Report ID</TableCell> */}
              <TableCell scope="col">Rep ID</TableCell>
              <TableCell scope="col">Manager ID</TableCell>
              <TableCell scope="col">Visit Type</TableCell>
              <TableCell scope="col">Location</TableCell>
              <TableCell scope="col">Date</TableCell>
              <TableCell scope="col">Avg Duration</TableCell>
              {/* <TableCell scope="col">No of Samples</TableCell> */}
              <TableCell scope="col">Description</TableCell>
              {/* <TableCell scope="col">Doctor Name</TableCell>
              <TableCell scope="col">Product Name</TableCell>
               */}
            {/* <TableCell scope="col">Manager Comment</TableCell> */} 
            </TableRow>
          </TableHead>
          <TableBody>
            

              {visits.slice(0, limit).filter(val => {
                if (searchTerm === "") {
                 return val;
               } 
               else if (String( val.rep_ID).includes(searchTerm))  {
                return val
              }
              // else if (String( val.date).includes(searchTerm))  {
              //   return val
              // }
              //  else if (String( val.report_id).includes(searchTerm)) {
              //    return val
              //  }
               }).map((visit) => {
                const dt = new Date(visit.date);
                const year = dt.getFullYear() + '/';
                const month = ('0' + (dt.getMonth() + 1)).slice(-2) + '/';
                const day = ('0' + dt.getDate()).slice(-2);
              return (
              <TableRow  
              hover
              key={visit.report_id}>
                {/* <TableCell>{visit.report_id}</TableCell> */}
                <TableCell>{visit.rep_ID}</TableCell>
                <TableCell>{visit.manager_ID}</TableCell>
                <TableCell>{visit.visit_type}</TableCell>
                <TableCell>{visit.location}</TableCell>
                <TableCell>{year+month+day}</TableCell>
                <TableCell>{visit.avg_duration} hours</TableCell>
                {/* <TableCell>{visit.no_of_sample}</TableCell> */}
                <TableCell>{visit.description}</TableCell>
                {/* <TableCell>{visit.doctor_name}</TableCell>
                <TableCell>{visit.product_name}</TableCell>
                */}
                {/* <td>{visit.manager_comment}</td> */}
              </TableRow >
                )
              })
            }
          </TableBody>
        </Table>
        </Box>
        </PerfectScrollbar>
        <TablePagination
            component="div"
            count={10}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleLimitChange}
            rowsPerPage={limit}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
      />
        </TableContainer>
      )
    }
    </Box>
    {/* </Box> */}
    </div>
  );
};

export default AnnualVisitReportTable;