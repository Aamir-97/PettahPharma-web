import React, { useEffect, useState } from "react";
import generatePDF from "src/pages/ReportGeneration";
import MonthlyVisitReportTable from "./MonthlyVisitReportTable";
import axios from "axios";
import {
    Button,
    Card,
    CardContent,
    Grid,
    Box,
    Typography
  } from '@material-ui/core';

const Visits = () => { 
  
  const [visits, setVisits] = useState([]);
  

  useEffect(() => {
    try {    
      // Beck-end function
      axios.get("http://localhost:3001/viewvisitsummary",{
      }).then((response)=>{
        setVisits(response.data);
        console.log("Hello");
          });
    } catch (e){
      console.log("error");
      console.log(e);
    }

    // const getAllVisits = async () => {
      // try {
      //   const response = axios.get("http://localhost:3001/viewvisitsummary");
      //   setVisits(response.data.visits);
      //   console.log(visits);
      //   console.log("Hello");
      // } catch (err) {
      //   console.log("error");
      // }
    // };
    // getAllVisits();
  }, []);

// const reportVisits = visits.filter(visit => visit.date === "");
  
  return (
    <div>
    <Grid
  container
  direction="row"
  justifyContent="center"
  alignItems="center"
>
    <Box m={2} >
      <div className="container mb-4 mt-4 p-3">
        <div className="row">
            <Button
              variant="contained" 
              color="primary"
              onClick={() => generatePDF(visits)}
            >
              Generate monthly report
            </Button>
        </div>
      </div>
      <Box mt={2}>
      <MonthlyVisitReportTable visits={visits} />
      </Box>      
      </Box>
      </Grid>
    </div>
  );
};

export default Visits;