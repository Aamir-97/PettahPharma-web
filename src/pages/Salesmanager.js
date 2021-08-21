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
import SearchBar from "material-ui-search-bar";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { CenterFocusStrong } from '@material-ui/icons';

// import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  }, 
});

function Salesmanager() {
  <Helmet>
  <title>Salesmanager</title>
</Helmet>
  
 const classes = useStyles();

 const [manager_ID,setManagerID] = useState("");
 const [searchTerm,setSearchTerm]=useState("");
 const [managerList,setManagerList]=useState([])
 useEffect(()=>{
   axios.get("http://localhost:3001/viewmanager").then((response)=>{
     setManagerList(response.data)
   })
 },[])

 const delete_Salesmanager = ()=>{
  axios.post('http://localhost:3001/deletemanager',{
  manager_ID:manager_ID,
  }).then(()=>{
     console.log("deleted");
   });
};

return (
 
 <div >
   <div >
       <input type="text"  placeholder="Search" onChange={(e)=>{setSearchTerm(e.target.value);}} />
       <SearchIcon  className={classes.searchicon}/>
   </div>
    <div >
   <Box 
      display="flex"
      justifyContent="flex-end"
      p={2}
    >
     <Link to={'/app/Add_Salesmanager'}>
      <Button
        color="primary"
        variant="contained"
      >
      Add Salesmanager
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
            {/* <TableCell align="center"><b>Manager ID</b></TableCell> */}
            <TableCell align="center"><b>Manager Name</b></TableCell>
            <TableCell align="center"><b>Email</b></TableCell>
            <TableCell align="center"><b>Phone No</b></TableCell>
            <TableCell align="center"><b>Area</b></TableCell>
            <TableCell colSpan={2} align="center"><b>Action</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {managerList.filter(val=>{if(searchTerm===""){
                       return val;
                     }else if(
                       val.name.toLowerCase().includes(searchTerm.toLowerCase())) 
                     {
                       return val
                     }
                    }).map((record)=>{
                       return(
            <TableRow key={record.manager_ID}>
              {/* <TableCell align="center">{record.manager_ID}</TableCell> */}
              <TableCell align="center">{record.name}</TableCell>
              <TableCell align="center">{record.email}</TableCell>
              <TableCell align="center">{record.phone_no}</TableCell>
              <TableCell align="center">{record.area}</TableCell>
              <TableCell align="center"><Link to={'/app/Edit_SalesManager'}><IconButton aria-label="edit"><EditIcon /></IconButton></Link></TableCell>
              <TableCell align="center"><IconButton color='Secondary'aria-label="delete" onClick={() => {delete_Salesmanager(manager_ID)}}><DeleteIcon /></IconButton></TableCell>
              {/* <TableCell align="center"><button type="submit" id="submitBtn" color='Secondary'aria-label="delete" onclick={delete_Salesmanager}> </button></TableCell> */}
            </TableRow>
               )})
              }
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
</div>
</div>
  );
}

export default Salesmanager;
