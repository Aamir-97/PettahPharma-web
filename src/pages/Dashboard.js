import { Helmet } from 'react-helmet';
import React, {Component, PropTypes} from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PrintIcon from '@material-ui/icons/Print';
import {
  Box,
  Container,
  Button,
  Grid
} from '@material-ui/core';
import Expenses from 'src/components/dashboard/Expenses';
import LatestOrders from 'src/components/dashboard/LatestTasks';
import LatestProducts from 'src/components/dashboard//LatestProducts';
import Sales from 'src/components/dashboard/Sales';
import TotalVisits from 'src/components/dashboard/TotalVisits';
import TotalEmployees from 'src/components/dashboard/TotalEmployees';
import TotalProducts from 'src/components/dashboard/TotalProducts';
import TaskProgress from 'src/components/dashboard/TaskProgress';
import TaskAnalysis from 'src/components/charts/TaskAnalysis'
import ExpenseAnalysis from 'src/components/charts/ExpenseAnalysis'
import VisitAnalysis from 'src/components/charts/VisitAnalysis';
import VisitTypes from 'src/components/charts/VisitTypes';


class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  
  printDocument() {
    const input = document.getElementById('divToPrint');

    html2canvas(input)
      .then((canvas) => {
        let imgWidth = 208;
        let imgHeight = canvas.height * imgWidth / canvas.width;
        const imgData = canvas.toDataURL('img/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
    ;
  }

  printDocument2() {
    const input2 = document.getElementById('divToPrint2');
    
    html2canvas(input2)
      .then((canvas) => {
        let imgWidth = 208;
        let imgHeight = canvas.height * imgWidth / canvas.width;
        const imgData = canvas.toDataURL('img/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
    ;
  }

  printDocument3() {
    const input3 = document.getElementById('divToPrint3');

    html2canvas(input3)
      .then((canvas) => {
        let imgWidth = 208;
        let imgHeight = canvas.height * imgWidth / canvas.width;
        const imgData = canvas.toDataURL('img/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
    ;
  }

  printDocument4() {
    const input4 = document.getElementById('divToPrint4');

    html2canvas(input4)
      .then((canvas) => {
        let imgWidth = 208;
        let imgHeight = canvas.height * imgWidth / canvas.width;
        const imgData = canvas.toDataURL('img/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
    ;
  }

  render() {
    return (<div>
      <Helmet>
      <title>Dashboard</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Expenses />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalEmployees />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalVisits />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalProducts />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
          <div id="divToPrint" className="mt4">
          <div>
            <ExpenseAnalysis/>
          </div>
          </div>
          <Box mt={2}>
        <center>
        <Button 
        iconSizeSmall
        size="small"
        startIcon={<PrintIcon />}
        variant="contained" 
        color="primary"
        onClick={this.printDocument}
        >Print</Button></center></Box>
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
          <div id="divToPrint2" className="mt4">
          <div>
            <TaskProgress/>
            </div>
          </div>
          <Box mt={2}>
        <center>
        <Button 
        iconSizeSmall
        size="small"
        startIcon={<PrintIcon />}
        variant="contained" 
        color="primary"
        onClick={this.printDocument2}
        >Print</Button></center></Box>
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
          <div id="divToPrint3" className="mt4">
          <div>
            <VisitAnalysis/>
            </div>
          </div>
          <Box mt={2}>
        <center>
        <Button 
        iconSizeSmall
        size="small"
        startIcon={<PrintIcon />}
        variant="contained" 
        color="primary"
        onClick={this.printDocument3}
        >Print</Button></center></Box>
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
          <div id="divToPrint4" className="mt4">
          <div>
            <VisitTypes/>
            </div>
          </div>
          <Box mt={2}>
        <center>
        <Button 
        iconSizeSmall
        size="small"
        startIcon={<PrintIcon />}
        variant="contained" 
        color="primary"
        onClick={this.printDocument4}
        >Print</Button></center></Box>
          </Grid>
          {/* <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          > 
            <LatestOrders />
          </Grid>  */}
        </Grid>
      </Container>
    </Box>





















      {/* <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
    <Container maxWidth={false}>
   <div>
     <Grid
          container
          spacing={2}
        >
      <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
      >
      <div id="divToPrint" className="mt4">
        <div><ExpenseAnalysis /></div>
      </div> 
        <Box mt={2}>
        <center>
        <Button 
        iconSizeSmall
        size="small"
        startIcon={<PrintIcon />}
        variant="contained" 
        color="primary"
        onClick={this.printDocument}
        >Print</Button></center></Box>
      </Grid> */}
      {/* <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
        >
      <div id="divToPrint" className="mt4">
        <div><TaskProgress /></div>
        </div>
        <Box mt={2}>
        <center>
        <Button 
        iconSizeSmall
        size="small"
        startIcon={<PrintIcon />}
        variant="contained" 
        color="primary"
        onClick={this.printDocument}
        >Print</Button></center></Box>
      </Grid>
      <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
      >
      <div id="divToPrint" className="mt4">
        <div><VisitAnalysis /></div>
        </div> 
        <Box mt={2}>
        <center>
        <Button 
        iconSizeSmall
        size="small"
        startIcon={<PrintIcon />}
        variant="contained" 
        color="primary"
        onClick={this.printDocument}
        >Print</Button></center></Box>
      </Grid>
      <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
        >
      <div id="divToPrint" className="mt4">
        <div><VisitTypes /></div>
        </div>
        <Box mt={2}>
        <center><Button 
        iconSizeSmall
        size="small"
        startIcon={<PrintIcon />}
        variant="contained" 
        color="primary"
        onClick={this.printDocument}
        >Print</Button></center></Box>
      </Grid>
    </Grid>
     <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
      >
      <div id="divToPrint" className="mt4">
        <div><VisitAnalysis /></div>
        </div> 
        <Box mt={2}>
        <center>
        <Button 
        iconSizeSmall
        size="small"
        startIcon={<PrintIcon />}
        variant="contained" 
        color="primary"
        onClick={this.printDocument}
        >Print</Button></center></Box>
      </Grid> */}
    {/* </Grid>
    </div>
    </Container>
    </Box> */}
    
    </div> );}
}
export default Dashboard;

// const Dashboard = () => (
//   <>
//     <Helmet>
//       <title>Dashboard</title>
//     </Helmet>
//     <Box
//       sx={{
//         backgroundColor: 'background.default',
//         minHeight: '100%',
//         py: 3
//       }}
//     >
//       <Container maxWidth={false}>
//         <Grid
//           container
//           spacing={3}
//         >
//           <Grid
//             item
//             lg={3}
//             sm={6}
//             xl={3}
//             xs={12}
//           >
//             <Expenses />
//           </Grid>
//           <Grid
//             item
//             lg={3}
//             sm={6}
//             xl={3}
//             xs={12}
//           >
//             <TotalEmployees />
//           </Grid>
//           <Grid
//             item
//             lg={3}
//             sm={6}
//             xl={3}
//             xs={12}
//           >
//             <TotalVisits />
//           </Grid>
//           <Grid
//             item
//             lg={3}
//             sm={6}
//             xl={3}
//             xs={12}
//           >
//             <TotalProducts />
//           </Grid>
//           <Grid
//             item
//             lg={8}
//             md={12}
//             xl={9}
//             xs={12}
//           >
//             <ExpenseAnalysis/>
//           </Grid>
//           <Grid
//             item
//             lg={4}
//             md={6}
//             xl={3}
//             xs={12}
//           >
//             <TaskProgress/>
//           </Grid>
//           <Grid
//             item
//             lg={8}
//             md={12}
//             xl={9}
//             xs={12}
//           >
//             <VisitAnalysis/>
//           </Grid>
//           <Grid
//             item
//             lg={4}
//             md={6}
//             xl={3}
//             xs={12}
//           >
//             <VisitTypes/>
//           </Grid>
//           {/* <Grid
//             item
//             lg={8}
//             md={12}
//             xl={9}
//             xs={12}
//           > 
//             <LatestOrders />
//           </Grid>  */}
//         </Grid>
//       </Container>
//     </Box>
//   </>
// );

// export default Dashboard;
