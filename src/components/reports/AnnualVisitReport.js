import React, {  useState } from "react";
// import generatePDF from "src/pages/VisitReportGeneration";
// import AnnualVisitReportTable from "src/components/reports/AnnualVisitReportTable";
import axios from "axios";
// import NoteAddIcon from '@material-ui/icons/NoteAdd';
import {
    Grid,
    Box
  } from '@material-ui/core';

// const Visits = () => { 
export default function Visits() {
  // const [visits, setVisits] = useState([]);
  

  // useEffect(() => {
  //   try {    
  //     axios.get("http://localhost:3001/viewvisitsummary",{
  //     }).then((response)=>{
  //       setVisits(response.data);
  //         });
  //   } catch (e){
  //     console.log("error");
  //     console.log(e);
  //   }
  // }, []);
  const[to_date,setTodate]=useState("");
  const[from_date,setFromdate]=useState("");
  const [visitsummaryList,setvisitsummaryList]=useState([])
  const [expensesummaryList,setexpensesummaryList]=useState([])


  const visitsummary = async () => {
      const response = await axios.get('http://localhost:3001/viewvisitsummaryReport', {
          params: {
             to_date:to_date,  
             from_date:from_date
          }
      });
      console.log(response)
      setvisitsummaryList(response.data);

      const response2 = await axios.get('http://localhost:3001/viewexpensesummaryReport', {
        params: {
           to_date:to_date,  
           from_date:from_date
        }
    });
    console.log(response2)
    setexpensesummaryList(response2.data);
  }

  
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
        <div>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mr: 6
          }}>
              <div>
                  <label style={{marginLeft:'40px',fontSize:'18px'}}>From Date</label>
                  <input type='date' style={{width:'300px',height:'40px',border:'none',backgroundColor:'white',paddingLeft:'20px',marginTop:'10px',marginLeft:'20px',borderRadius:'10px'}} placeholder='From Date' 
                   onChange={(event)=> {
                    setFromdate(event.target.value);
                  }} ></input>
                  </div>
                  <div>
               <label style={{marginLeft:'40px',fontSize:'18px'}}>To Date</label>
              <input type='date' style={{width:'300px',height:'40px',border:'none',backgroundColor:'white',paddingLeft:'20px',marginTop:'10px',marginLeft:'20px',borderRadius:'10px'}} placeholder='To date' 
                   onChange={(event)=> {
                    setTodate(event.target.value);
                  }} ></input></div>
                  <button style={{marginLeft:'30px',fontSize:'15px',width:'200px',height:'35px',backgroundColor:'#0A6466',border:'none',borderRadius:'5px',color:'white',marginTop:'10px'}}
                  onClick={()=>{visitsummary()}}><b>Generate Summary</b></button>          
            {/* <Button
              variant="contained" 
              color="primary"
              onClick={() => generatePDF(visits)}
              startIcon={<NoteAddIcon />}
            >
              Generate Report
            </Button> */}
          </Box>
          </div>
          <div>
          <Box ml={6} m>
        <h4>Visit Summary Report</h4>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mr: 6
          }}>
          <table style={{backgroundColor:'#80cbc4'}} className="table">
     <thead>
         <tr>
           <th>Rep ID</th>      
           <th >Manager ID</th>
             <th >Visit Type</th>
             <th>Location</th>
             <th>Date</th>
             <th>Avg Duration</th>
             <th>Description</th>
         </tr>
     </thead>
     <tbody>
     {visitsummaryList.map((record)=>{
        const dt = new Date(record.date);
        const year = dt.getFullYear() + '/';
        const month = ('0' + (dt.getMonth() + 1)).slice(-2) + '/';
        const day = ('0' + dt.getDate()).slice(-2);
      return(
         <tr>
           <td>{record.rep_ID}</td>
           <td>{record.manager_ID}</td>
           <td>{record.visit_type}</td>
           <td>{record.location}</td>
           <td>{year+month+day}</td>
           <td>{record.avg_duration} hours</td>
           <td>{record.description}</td>
         </tr>
              )
           })}
           
     </tbody>
   </table> 
   </Box>
   </div>
        </div>
      </div>  
      </Box>
      </Grid>

      
    </div>
  
  
  );
};

// export default Visits;