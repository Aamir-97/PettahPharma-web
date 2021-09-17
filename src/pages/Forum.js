import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import {Box,Button} from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({

// }));

export default function Forum() {
  // const classes = useStyles();

  return (
    <div>
      <Box 
      display="flex"
      justifyContent="flex-end"
      p={2}
    >
     <Link to={''}>
      <Button
        color="primary"
        variant="contained"
      >
      Add New Forum
      </Button>
      </Link>

    </Box>  

    <Box 
      display="flex"
      justifyContent="center"
      m={2}
    >         
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
          >
            <Typography>
            <Box fontWeight="fontWeightMedium">What is amoxixillin used for?</Box>
            </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div >
             <Typography>
             Amoxicillin is an antibiotic used to treat a number of bacterial infections.
             These include middle ear infection, strep throat, pneumonia, skin infections, and urinary tract infections 
             among others. It is taken by mouth, or less commonly by injection. Common adverse effects include nausea and rash
            </Typography>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Typography>
            <Box fontSize={15}>Mr.Thulasithasan</Box>
          </Typography>
          <Button size="small" color="primary"> Reply</Button>
          <Button size="small"color="secondary">Report Post</Button>
        </AccordionActions>
      </Accordion>
      </Box>

      <Box 
      display="flex"
      justifyContent="center"
      m={2}
    >         
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
          >
            <Typography>
            <Box fontWeight="fontWeightMedium">What is amoxixillin used for?</Box>
            </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div >
             <Typography>
             Amoxicillin is an antibiotic used to treat a number of bacterial infections.
             These include middle ear infection, strep throat, pneumonia, skin infections, and urinary tract infections 
             among others. It is taken by mouth, or less commonly by injection. Common adverse effects include nausea and rash
            </Typography>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
        <Typography>
          <Box textAlign="left" fontSize={15}>Mr.Thulasithasan</Box>
          </Typography>
          <Button size="small" color="primary"> Reply</Button>
          <Button size="small"color="secondary">Report Post</Button>
        </AccordionActions>
      </Accordion>
      </Box>

      <Box 
      display="flex"
      justifyContent="center"
      m={2}
    >         
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
          >
            <Typography>
            <Box fontWeight="fontWeightMedium">What is amoxixillin used for?</Box>
            </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div >
             <Typography>
             Amoxicillin is an antibiotic used to treat a number of bacterial infections.
             These include middle ear infection, strep throat, pneumonia, skin infections, and urinary tract infections 
             among others. It is taken by mouth, or less commonly by injection. Common adverse effects include nausea and rash
            </Typography>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
        <Typography>
          <Box textAlign="left" fontSize={15}>Mr.Thulasithasan</Box>
          </Typography>
          <Button size="small" color="primary"> Reply</Button>
          <Button size="small"color="secondary">Report Post</Button>
        </AccordionActions>
      </Accordion>
      </Box>

      <Box 
      display="flex"
      justifyContent="center"
      m={2}
    >         
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
          >
            <Typography>
            <Box fontWeight="fontWeightMedium">What is amoxixillin used for?</Box>
            </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div >
             <Typography>
             Amoxicillin is an antibiotic used to treat a number of bacterial infections.
             These include middle ear infection, strep throat, pneumonia, skin infections, and urinary tract infections 
             among others. It is taken by mouth, or less commonly by injection. Common adverse effects include nausea and rash
            </Typography>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Typography>
          <Box textAlign="left" fontSize={15}>Mr.Thulasithasan</Box>
          </Typography>
          <Button size="small" color="primary"> Reply</Button>
          <Button size="small"color="secondary">Report Post</Button>
        </AccordionActions>
      </Accordion>
      </Box>

    </div>
  );
}
