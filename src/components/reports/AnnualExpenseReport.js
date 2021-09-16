import React, { useEffect, useState } from "react";
import generatePDF from "src/pages/ExpenseReportGeneration";
import AnnualExpenseReportTable from "src/components/reports/AnnualExpenseReportTable";
import axios from "axios";
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import {
    Button,
    Grid,
    Box
  } from '@material-ui/core';

const Expenses = () => { 
  
  const [expenses, setExpenses] = useState([]);
  

  useEffect(() => {
    try {    
      axios.get("http://localhost:3001/viewexpensesummary",{
      }).then((response)=>{
        setExpenses(response.data);
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
    <Box mt={2} ml={2} mr={3}>
      <div className="container mb-4 mt-4 p-3">
        <div className="row">
        <Box ml={6} >
        <h3>Annual Expense Report</h3>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mr: 6
          }}>
            <Button
              variant="contained" 
              color="primary"
              onClick={() => generatePDF(expenses)}
              startIcon={<NoteAddIcon />}
            >
              Generate Report
            </Button>
          </Box>
        </div>
      </div>
      <Box mt={2} ml={4} mr={3}>
      <AnnualExpenseReportTable expenses={expenses} />
      </Box>      
      </Box>
      </Grid>

      
    </div>
  );
};

export default Expenses;