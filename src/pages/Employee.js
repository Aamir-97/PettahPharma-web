import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { spacing } from '@material-ui/system';
import { Link } from 'react-router-dom';
import {Box,Button} from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { CenterFocusStrong } from '@material-ui/icons';

// import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  
});

function createData(manager_ID, name, email, phone_no, area ) {
  return { manager_ID, name, email, phone_no, area };
}

const rows = [
  createData('1', 'Aamir', 'aamir@gmail.com', '0771236547', 'Maruthamunai'),
  createData('1', 'Aamir', 'aamir@gmail.com', '0771236547', 'Maruthamunai'),
  createData('1', 'Aamir', 'aamir@gmail.com', '0771236547', 'Maruthamunai'),

];

<br></br>
function Employee() {
  <Helmet>
  <title>Employee</title>
</Helmet>
  
 const classes = useStyles();

  return (

    <div >
   <Box 
      display="flex"
      justifyContent="flex-end"
      p={2}
    >
     <Link to={'/app/Add_Employee'}>
      <Button
        color="primary"
        variant="contained"
      >
      Add Employee
      </Button>
      </Link>

    </Box>  
    <Box 
      display="flex"
      justifyContent="flex-start"
      m={2}
    >                    
    <h1> Sales Managers List</h1>
    <br />
    </Box>
    <Box 
      display="flex"
      justifyContent="flex-start"
      m={2}
    >     
    <TableContainer component={Paper}>
      <br />
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><b>Manager ID</b></TableCell>
            <TableCell align="center"><b>Manager Name</b></TableCell>
            <TableCell align="center"><b>Email</b></TableCell>
            <TableCell align="center"><b>Phone No</b></TableCell>
            <TableCell align="center"><b>Area</b></TableCell>
            <TableCell colSpan={2} align="center"><b>Action</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.manager_ID}>
              <TableCell align="center">{row.manager_ID}</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.phone_no}</TableCell>
              <TableCell align="center">{row.area}</TableCell>
              <TableCell align="center"><IconButton aria-label="edit"><EditIcon /></IconButton></TableCell>
              <TableCell align="center"><IconButton color='Secondary'aria-label="delete"><DeleteIcon /></IconButton></TableCell>
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
</div>
  );
}

export default Employee;
