import React, {Component, PropTypes} from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import VisitTypes from 'src/components/charts/VisitTypes';
import {Container,Box,Grid,Button} from '@material-ui/core';
import TaskProgress from '../dashboard/TaskProgress';
import ExpenseAnalysis from '../charts/ExpenseAnalysis';
import TaskAnalysis from '../charts/TaskAnalysis';
import VisitAnalysis from '../charts/VisitAnalysis';
import PrintIcon from '@material-ui/icons/Print';

class VisitTypesReport extends Component {
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

  render() {
    return (<div>
      <Box
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
      </Grid>
      <Grid
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
      </Grid>
    </div>
    </Container>
    </Box>
    </div> );}
}
export default VisitTypesReport;