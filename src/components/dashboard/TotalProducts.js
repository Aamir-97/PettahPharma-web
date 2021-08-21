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
  import { indigo,red } from '@material-ui/core/colors';
  import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
  import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacyOutlined';
  import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
  
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
              <p style={{fontSize:'30px'}}>{record.count}</p>
              )
            })}
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
          {/* <ArrowDownwardIcon sx={{ color: red[900] }} />
          <Typography
            sx={{
              color: red[900],
              mr: 1
            }}
            variant="body2"
          >
            12%
          </Typography> */}
          {/* <Typography
            color="textSecondary"
            variant="caption"
          >
            Since last month
          </Typography> */}
        </Box>
      </CardContent>
    </Card>
    </div>
   );
}
export default TotalProducts;
  