import React, { useState, useEffect } from 'react';
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
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

// import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  
});

function Medicalrep() {
  
 const classes = useStyles();
 const [searchTerm,setSearchTerm]=useState("");
    const [repList,setRepList]=useState([])
    useEffect(()=>{
      axios.get("http://localhost:3001/viewrep").then((response)=>{
        setRepList(response.data)
      })
    },[])

  return (
      <div >
      <div className="searchbar">
          <input type="text"  placeholder="Search" onChange={(e)=>{setSearchTerm(e.target.value);}} />
          <SearchIcon  className='searchicon'/>
      </div>
   <Box 
      display="flex"
      justifyContent="flex-end"
      p={2}
    >
     <Link to={'/app/Add_Medicalrep'}>
      <Button
        color="primary"
        variant="contained"
      >
        Add Medicalrep
      </Button>
      </Link>

    </Box>  
    <Box 
      display="flex"
      justifyContent="flex-start"
      m={2}
    >                    
    <h1> Medical Representatives List</h1>
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
            {/* <TableCell align="center"><b>Medical Rep ID</b></TableCell> */}
            <TableCell align="center"><b>Medical Rep Name</b></TableCell>
            <TableCell align="center"><b>Email</b></TableCell>
            <TableCell align="center"><b>Phone No</b></TableCell>
            <TableCell align="center"><b>Area</b></TableCell>
            <TableCell align="center"><b>Rating</b></TableCell>
            <TableCell align="center"><b>Sales Manager ID</b></TableCell>
            <TableCell colSpan={2} align="center"><b>Action</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
        {repList.filter(val=>{if(searchTerm===""){
                       return val;
                     }else if(
                       val.name.toLowerCase().includes(searchTerm.toLowerCase())) 
                     {
                       return val
                     }
                    }).map((record)=>{
                       return(
            <TableRow key={record.rep_ID}>
              {/* <TableCell align="center">{record.rep_ID}</TableCell> */}
              <TableCell align="center">{record.name}</TableCell>
              <TableCell align="center">{record.email}</TableCell>
              <TableCell align="center">{record.phone_no}</TableCell>
              <TableCell align="center">{record.area}</TableCell>
              <TableCell align="center">{record.rating}</TableCell>
              <TableCell align="center">{record.manager_ID}</TableCell>
              <TableCell align="center"><Link to={'/app/Edit_Medicalrep'}><IconButton aria-label="edit"><EditIcon /></IconButton></Link></TableCell>
              <TableCell align="center"><IconButton color='Secondary'aria-label="delete"><DeleteIcon /></IconButton></TableCell>
            </TableRow>
                       )})
                      }
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
</div>
  );
}

export default Medicalrep;
