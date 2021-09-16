import React, { useState, useEffect } from 'react';
import axios from "axios";
import {
    Avatar,
    Card,
    CardContent,
    Grid,
    Box,
    Typography
  } from '@material-ui/core';
  import { indigo} from '@material-ui/core/colors';
  import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';
  
  function TotalProducts() {

    const [productcount,setProductcount]=useState([])
    useEffect(()=>{
    axios.get("http://localhost:3001/productCount").then((response)=>{
      setProductcount(response.data)
    })
  },[])
  return (
  <div>
    <Card>
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
          height="110px"
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              TOTAL PRODUCTS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
            {productcount.map((record)=>{
              return(
              <p style={{fontSize:'30px' , height:"25px" }}>{record.count}</p>
              )
            })}
            <p style={{fontSize:'13px',color:'#3949ab' ,height:"6px"}}>Medicines</p>
            <p style={{fontSize:'13px',color:'#3949ab'}}>Surgical Products</p>
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: indigo[600],
                height: 56,
                width: 56
              }}
            >
              <LocalPharmacyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
        </Box>
      </CardContent>
    </Card>
    </div>
   );
}
export default TotalProducts;
  