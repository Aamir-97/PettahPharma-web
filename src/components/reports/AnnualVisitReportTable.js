import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
  Box
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  table: {
    border: '1px solid #009688',
    display: 'inline - block',
    padding: '10px 10px',
    margin: '2px 0',
    width: '100%',
    boxShadow: "2px 2px 5px  2px #9E9E9E",
  },
  tbody: {
    textalign: 'left',
    padding: '8px',
  },
  thead: {
    backgroundColor: '#80cbc4',
    textalign: 'left',
    padding: '8px',
  },
}));


const AnnualVisitReportTable = ({ visits }) => {

  const classes = useStyles();

  return (
    <div >
    <Box>
      {visits.length === 0 ? (
        "You currently have no visits created"
      ) : (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.thead}>
          <TableRow>
              <TableCell scope="col">Report ID</TableCell>
              <TableCell scope="col">Visit Type</TableCell>
              <TableCell scope="col">Location</TableCell>
              <TableCell scope="col">Date</TableCell>
              <TableCell scope="col">Avg Duration</TableCell>
              <TableCell scope="col">No of Samples</TableCell>
              {/* <TableCell scope="col">Description</TableCell> */}
              {/* <TableCell scope="col">Doctor Name</TableCell>
              <TableCell scope="col">Product Name</TableCell>
              <TableCell scope="col">Rep ID</TableCell>
              <TableCell scope="col">Manager ID</TableCell> */}
            {/* <TableCell scope="col">Manager Comment</TableCell> */} 
            </TableRow>
          </TableHead>
          <TableBody className={classes.tbody}>
            {visits.map((visit) => {
              const dt = new Date(visit.date);
              const year = dt.getFullYear() + '/';
              const month = ('0' + (dt.getMonth() + 1)).slice(-2) + '/';
              const day = ('0' + dt.getDate()).slice(-2);
              return (
              <TableRow  key={visit.report_id}>
                <TableCell>{visit.report_id}</TableCell>
                <TableCell>{visit.visit_type}</TableCell>
                <TableCell>{visit.location}</TableCell>
                <TableCell>{year+month+day}</TableCell>
                <TableCell>{visit.avg_duration}</TableCell>
                <TableCell>{visit.no_of_sample}</TableCell>
                {/* <TableCell>{visit.description}</TableCell>
                <TableCell>{visit.doctor_name}</TableCell>
                <TableCell>{visit.product_name}</TableCell>
                <TableCell>{visit.rep_ID}</TableCell>
                <TableCell>{visit.manager_ID}</TableCell> */}
                {/* <td>{visit.manager_comment}</td> */}
              </TableRow >
                )
              })
            }
          </TableBody>
        </Table>
        </TableContainer>
      )
    }
    </Box>
    </div>
  );
};

export default AnnualVisitReportTable;