import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import { Link, Route } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';

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
        backgroundColor: 'gray',
        width: '60%',
        marginTop: '40px',
        marginLeft: '200px',
        height: 'full',
        boxShadow: "2px 2px 5px  2px #9E9E9E",
        padding: "2vh",
        borderRadius: "5px",
        align: 'center',
    },
    textfield: {
        backgroundColor: 'white',
        width: '100%',
        marginTop: '0px',
        marginLeft: '0px',
        height: '100%',
        // boxShadow: "2px 2px 5px  2px #9E9E9E",
        padding: "2vh",
        borderRadius: "5px",
        align: 'center',
        rows: '10',
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
        // marginRight: '0px',
        marginLeft: '10px'
    },
    submitBtn: {
        // marginTop: '5px',
        width: '175px',
        height: '40px',
        fontSize: '18px',
        backgroundColor: '#0A6466',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        // /marginRight: '30px'
        marginLeft: '380px'
    },
};

export default function SummaryComment() {
    const report_id = window.location.pathname.substring(21, 23);
    const [Dt, setDt] = useState([]);

    const [manager_comment, setManagerCom] = useState("");

    let manager_ID = localStorage.getItem('managerid');
    manager_ID = JSON.parse(manager_ID)
    console.log(manager_ID);

    console.log(report_id);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3001/viewsummary', {
                params: {
                    report_id: report_id,
                    manager_ID: manager_ID,
                }
            });
            setDt(response.data[0]);
            console.log(response.data[0]);
            setManagerCom(response.data[0].manager_comment)
        };
        fetchData();
    }, []);

    const addcomment = (report_id) => {
        axios.put("http://localhost:3001/addcomment",
            { manager_comment: manager_comment, report_id: report_id }).then(
                (response) => { }
            )
    };

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.formbox}>
            <div className={classes.root}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}><h1>ADD COMMENT</h1>  </Paper><br />
                </Grid>

                <div className={classes.root}>

                    <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography className={classes.heading}>Summary Information</Typography>
                            <Typography className={classes.secondaryHeading}>click full details</Typography>
                        </AccordionSummary>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Medical Rep Name</Typography>
                            <Typography className={classes.secondaryHeading}>{Dt.repname}</Typography>
                        </AccordionSummary>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Doctor Name</Typography>
                            <Typography className={classes.secondaryHeading}>{Dt.doctorname}</Typography>
                        </AccordionSummary>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Visit Type</Typography>
                            <Typography className={classes.secondaryHeading}>{Dt.visit_type}</Typography>
                        </AccordionSummary>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Product Name</Typography>
                            <Typography className={classes.secondaryHeading}>{Dt.proname}</Typography>
                        </AccordionSummary>
                        <AccordionSummary>
                            <Typography className={classes.heading}>No of Sample</Typography>
                            <Typography className={classes.secondaryHeading}>{Dt.no_of_sample}</Typography>
                        </AccordionSummary>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Average Duration</Typography>
                            <Typography className={classes.secondaryHeading}>{Dt.avg_duration}</Typography>
                        </AccordionSummary>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Date</Typography>
                            <Typography className={classes.secondaryHeading}>{Dt.date}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className={classes.heading}>Discription</Typography>
                            <Typography>
                                <textarea value={Dt.description} rows="10" cols="80" ></textarea>
                            </Typography>
                        </AccordionDetails>
                    </Accordion><br />

                    <TextField
                        // id="filled-multiline-static"
                        // label="Add Comment" 
                        multiline 
                        rows={5} 
                        placeholder="Add comment"
                        defaultValue={Dt.manager_comment}
                        // variant="outlined" 
                        onChange={(event) => { setManagerCom(event.target.value); }} 
                         className={classes.textfield} /><br /><br />

                </div>

                <Link to={`/appp/SummaryReport`}  >
                    <Button
                        color="primary"
                        variant="contained"
                        style={mystyle.submitBtn}
                        onClick={() => { addcomment(report_id) }}
                    >
                        Add Comment
                    </Button>
                </Link>
                <Link to='/appp/SummaryReport'>
                    <Button
                        type="submit"
                        id="submitBtn"
                        style={mystyle.closeBtn}
                    > Exit</Button>
                </Link>

            </div>
        </div>
    );
}
