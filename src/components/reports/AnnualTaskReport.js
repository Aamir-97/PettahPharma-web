import React, { useEffect, useState } from "react";
import generatePDF from "src/pages/TaskReportGeneration";
import AnnualTaskReportTable from "src/components/reports/AnnualTaskReportTable";
import axios from "axios";
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import {
    Button,
    Card,
    CardContent,
    Grid,
    Box,
    Typography
  } from '@material-ui/core';

const Tasks = () => { 
  
  const [tasks, setTasks] = useState([]);
  

  useEffect(() => {
    try {    
      axios.get("http://localhost:3001/viewtasksummary",{
      }).then((response)=>{
        setTasks(response.data);
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
        <h3>Annual Task Report</h3>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
            <Button
              variant="contained" 
              color="primary"
              onClick={() => generatePDF(tasks)}
              startIcon={<NoteAddIcon />}
            >
              Generate Report
            </Button>
          </Box>
        </div>
      </div>
      <Box mt={2}>
      <AnnualTaskReportTable tasks={tasks} />
      </Box>      
      </Box>
      </Grid>

      
    </div>
  );
};

export default Tasks;