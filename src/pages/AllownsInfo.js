import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import back from '../images/back3.jpg';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: 'black',
    },
    formbox: {
        backgroundColor: 'white',
        width: '60%',
        marginTop: '0px',
        marginLeft: '200px',
        height: 'full',
        boxShadow: "2px 2px 5px  2px #9E9E9E",
        padding: "2vh",
        borderRadius: "5px",
        align: 'center',
    },
    backgroud: {
        backgroundColor: '#5eb6b8',
        backgroundImage: `url(${back})`
      },
}));

const mystyle = {
    closeBtn: {
        width: '145px',
        height: '40px',
        fontSize: '18px',
        backgroundColor: 'red',
        transition: '1s background ease',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        marginLeft:'10px'
    },
    submitBtn: {
        width: '175px',
        height: '40px',
        fontSize: '18px',
        backgroundColor: '#0A6466',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
         marginLeft:'50px'
    },
    acceptBtn: {
        width: '145px',
        height: '40px',
        fontSize: '18px',
        transition: '1s background ease',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        marginLeft:'10px'
    },
    rejectBtn: {
        width: '145px',
        height: '40px',
        fontSize: '18px',
        transition: '1s background ease',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        marginLeft:'10px'
    },
};

export default function AllownsInfo() {
    const expense_ID = window.location.pathname.substring(18, 23);
    const [Dt, setDt] = useState([]);
    let manager_ID = localStorage.getItem('managerid');
    manager_ID = JSON.parse(manager_ID)

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3001/viewexpense', {
                params: {
                    expense_ID: expense_ID,
                }
            });
            setDt(response.data[0]);
            console.log(response.data[0]);
        };
        fetchData();
    }, []);

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const dtt = new Date(Dt.date);
    const year = dtt.getFullYear() + '/';
    const month = ('0' + (dtt.getMonth() + 1)).slice(-2) + '/';
    const day = ('0' + dtt.getDate()).slice(-2);
    const addstatus = (status, expense_ID) => {
        console.log(status);
        axios.put("http://localhost:3001/addexpensestatus",
          { status: status, expense_ID: expense_ID }).then(
            (response) => {
              window.location.reload();
             }
          )
      };

    return (
        <div className={classes.backgroud}>
        <div className={classes.formbox}>
            <div className={classes.root}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}><h1>EXPENSE INFORMATION</h1>  </Paper><br />
                </Grid>
                <div className={classes.root}>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Medical Rep Name</Typography>
                            <Typography className={classes.secondaryHeading}>{Dt.repname}</Typography>
                        </AccordionSummary>
                    </Accordion><br />
                     <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Expense Type</Typography>
                            <Typography className={classes.secondaryHeading}>{Dt.expense_type}</Typography>
                        </AccordionSummary>
                    </Accordion><br />
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Location</Typography>
                            <Typography className={classes.secondaryHeading}>{Dt.location}</Typography>
                        </AccordionSummary>
                    </Accordion><br />
                    {/* <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Bill</Typography>
                            <Typography className={classes.secondaryHeading}>{Dt.bills}</Typography>
                        </AccordionSummary>
                    </Accordion><br /> */}
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Amount</Typography>
                            <Typography className={classes.secondaryHeading}>{Dt.amount}</Typography>
                        </AccordionSummary>
                    </Accordion><br />
                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Date</Typography>
                            <Typography className={classes.secondaryHeading}>{year + month + day}</Typography>
                        </AccordionSummary>
                    </Accordion><br />
                    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography className={classes.heading}>Description</Typography>
                            <Typography className={classes.secondaryHeading}>click full details</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <textarea value={Dt.description} rows="4" cols="80" ></textarea>
                            </Typography>
                        </AccordionDetails>
                    </Accordion><br />
                    <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography className={classes.heading}>Reason</Typography>
                            <Typography className={classes.secondaryHeading}>click full details</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <textarea value={Dt.salesmanager_comment} rows="4" cols="80" ></textarea>
                            </Typography>
                        </AccordionDetails>
                    </Accordion><br />

                </div>

                <Link to={`/appp/AllownsComment/${expense_ID}`}  >
                    <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        style={mystyle.submitBtn}
                    >
                        Add Reason
                    </Button>
                </Link>
                
                
                      <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        onClick={()=>{addstatus("1",expense_ID)}} 
                        disabled={Dt.status == "1" || Dt.status == "2"}
                        style={mystyle.acceptBtn}>
                        Accept
                      </Button>
        
                      <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        onClick={()=>{addstatus("0",expense_ID)}} 
                        disabled={Dt.status == "1" || Dt.status == "2"} 
                        style={mystyle.rejectBtn}>
                        Reject 
                      </Button>
                      <Link to='/appp/Allowns'>
                            <Button
                                type="submit"
                                id="submitBtn"
                                size="small"
                                style={mystyle.closeBtn}                      
                            > Exit</Button>
                        </Link>
            </div>
        </div>
        </div>
    );
}
