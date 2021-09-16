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

const TaskInfo = () => {

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
        link:{
            color: '#FFF',
          },
          backgroud: {
            backgroundColor: '#5eb6b8',
            backgroundImage: `url(${back})`
          },
    }));

    const mystyle = {
        closeBtn: {
            // marginTop: '0px',
            width: '145px',
            height: '40px',
            fontSize: '18px',
            backgroundColor: 'red',
            transition: '1s background ease',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '5px',
            color: 'white',
            marginLeft: '10px'
        },
        submitBtn: {
            width: '145px',
            height: '40px',
            fontSize: '18px',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '5px',
            color: 'white',
            marginLeft: '410px'
        },
        forminput: {

            width: '70%',
            padding: '10px 10px',
            margin: '8px 0',
            display: 'inline - block',
            border: '1px solid #C0C0C0',
            borderRadius: '5px',
            height: '40px'
        },
    };



    const task_id = window.location.pathname.substring(15, 17);
    const [Dt, setDt] = useState([]);

    let manager_ID = localStorage.getItem('managerid');
    manager_ID = JSON.parse(manager_ID)
    console.log(manager_ID);


    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3001/viewtask', {
                params: {
                    task_id: task_id,
                    manager_ID: manager_ID,
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

    return (
        <div className={classes.backgroud}>
        <div className={classes.formbox}>
            <div className={classes.root}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}><h1>TASK INFORMATION</h1>  </Paper><br />
                </Grid>

                <div className={classes.root}>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Medical Rep Name</Typography>
                            <Typography className={classes.secondaryHeading}>{Dt.name}</Typography>
                        </AccordionSummary>
                    </Accordion><br />

                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Task Title</Typography>
                            <Typography className={classes.secondaryHeading}>{Dt.title}</Typography>
                        </AccordionSummary>
                    </Accordion><br />

                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Location</Typography>
                            <Typography className={classes.secondaryHeading}>{Dt.location}</Typography>
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
                                <textarea value={Dt.description} rows="10" cols="80" ></textarea>
                            </Typography>
                        </AccordionDetails>
                    </Accordion><br />

                    <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Rep Note</Typography>
                            <Typography className={classes.secondaryHeading}>{Dt.rep_note}</Typography>
                        </AccordionSummary>
                    </Accordion><br />

                    <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Status</Typography>
                            <Typography className={classes.secondaryHeading}>{Dt.status}</Typography>
                        </AccordionSummary>
                    </Accordion><br />

                    <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Time Slot</Typography>
                            <Typography className={classes.secondaryHeading}>{Dt.session}</Typography>
                        </AccordionSummary>
                    </Accordion><br />

                    <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Date</Typography>
                            <Typography className={classes.secondaryHeading}>{year + month + day}</Typography>
                        </AccordionSummary>
                    </Accordion><br />
                    <div>
                        
                            <Button
                                color="primary"
                                variant="contained"
                                style={mystyle.submitBtn}
                                // disabled={true}
                                disabled={Dt.status == "Complete"}
                            >
                                <Link to={`/appp/UpdateTask/${Dt.task_id}`}  className={classes.link}>
                                Edit
                                </Link>
                            </Button>
                        
                        
                            <Button
                                type="submit"
                                id="submitBtn"
                                style={mystyle.closeBtn}
                            >
                                <Link to='/appp/dataplan'className={classes.link} >
                                 Exit
                                 </Link>
                                 </Button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
export default TaskInfo;

