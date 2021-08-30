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
      axios.get("http://localhost:3001/viewvisitsummary",{
      }).then((response)=>{
        setVisits(response.data);
          });
    } catch (e){
      console.log("error");
      console.log(e);
    }
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
              Generate Annual Visit report
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