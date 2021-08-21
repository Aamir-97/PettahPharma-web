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
import { useParams } from 'react-router-dom';

// import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  
});

function Product() {
  
 const classes = useStyles();
 const [Value,setValue]=useState("");
    const [productList,setProductList]=useState([])
    useEffect(()=>{
      axios.get("http://localhost:3001/viewproduct").then((response)=>{
        setProductList(response.data)
      })
    },[])
  return (
    
    <div >
      <div className="searchbar">
          <input type="text"  placeholder="Search" onChange={(e)=>{setValue(e.target.value);}} />
          <SearchIcon  className='searchicon'/>
      </div>
   <Box 
      display="flex"
      justifyContent="flex-end"
      p={2}
    >
     <Link to={'/app/Add_Product'}>
      <Button
        color="primary"
        variant="contained"
      >
        Add Product
      </Button>
      </Link>

    </Box>  
    <Box 
      display="flex"
      justifyContent="flex-start"
      m={2}
    >                    
    <h1> Products List</h1>
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
            {/* <TableCell align="center"><b>Product ID</b></TableCell> */}
            <TableCell align="center"><b>Product Image</b></TableCell>
            <TableCell align="center"><b>Product Name</b></TableCell>
            <TableCell align="center"><b>Volume</b></TableCell>
            <TableCell align="center"><b>Price</b></TableCell>
            <TableCell align="center"><b>Description</b></TableCell>
            <TableCell colSpan={2} align="center"><b>Action</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
        {productList.filter(val=>{if(Value===""){
                       return val;
                     }else if(
                       val.name.toLowerCase().includes(Value.toLowerCase())) 
                     {
                       return val
                     }
                    }).map((record)=>{
                       return(
            <TableRow key={record.product_ID}>
              {/* <TableCell align="center">{record.product_ID}</TableCell> */}
              <TableCell align="center"><img src={record.display_photo}/></TableCell>
              <TableCell align="center">{record.name}</TableCell>
              <TableCell align="center">{record.volume}</TableCell>
              <TableCell align="center">{record.price}</TableCell>
              <TableCell align="center">{record.description}</TableCell>
              <TableCell align="center"><Link to={'/app/Edit_Product'}><IconButton aria-label="edit"><EditIcon /></IconButton></Link></TableCell>
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

export default Product;
