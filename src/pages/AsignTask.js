import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Select from '@material-ui/core/Select';
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
        width: '55%',
        marginTop: '0px',
        marginLeft: '270px',
        height: 'full',
        boxShadow: "2px 2px 5px  2px #9E9E9E",
        padding: "2vh",
        borderRadius: "5px",
        align: 'center'
    },
    forminput: {
        width: '430px',
        padding: '10px 10px',
        margin: '2px 0',
        display: 'inline - block',
        border: '1px solid #C0C0C0',
        borderRadius: '5px',
        height: '40px'
    },
    formselect: {
        width: '430px',
        padding: '10px 10px',
        margin: '2px 0',
        display: 'inline - block',
        border: '1px solid #C0C0C0',
        borderRadius: '5px',
        height: '40px',
        backgroundColor: 'white'
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
        marginLeft: '10px'
    },
    submitBtn: {
        width: '145px',
        height: '40px',
        fontSize: '18px',
        backgroundColor: '#0A6466',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        // /marginRight: '30px'
        marginLeft: '350px'
    },

};


export default function AsignTask() {
    let manager_ID = localStorage.getItem('managerid');
    manager_ID = JSON.parse(manager_ID)

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;

    const [GetRep, setGetRep] = useState([]);
    const [rep_ID, setRepID] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [session, setSession] = useState("");
    const [date, setDate] = useState("")
    const [location, setLocation] = useState("")
    let fullday = 'Full-Day';
    let type = 'Task';
    const items = [
        {
            href: '/appp/dataplan',
        },
    ]

    const asign_task = () => {
        if (rep_ID && title && date && location && session) {
            axios.post('http://localhost:3001/assigntask', {
                rep_ID: rep_ID,
                title: title,
                type: type,
                location: location,
                description: description,
                session: session,
                date: date,
                manager_ID: manager_ID,
                created_at: today,
            }).then(() => {
                alert("The task was assigned successfully.")
                document.getElementById("create-course-form").reset();
            });
        }
        else {
            alert("Date, Time slot, Medical rep name, title, location are required.")
        }
    };

    const fetchData = async () => {
        const response = await axios.get('http://localhost:3001/getrep', {
            params: {
                manager_ID: manager_ID,
                date: date,
                session: session,
                fullday: fullday,
            }
        });
        setGetRep(response.data);
    };

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;

    return (
        <div className={classes.backgroud}>
        <div className={classes.formbox}>
            <div className={classes.root}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}><h1>ASIGN TASK</h1>  </Paper><br />
                </Grid>
                <div className={classes.root}>
                    <form id="create-course-form">
                        <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
                            <AccordionSummary>
                                <Typography className={classes.heading}>Date</Typography>
                                <Typography className={classes.secondaryHeading}>
                                    <input
                                        type="date"
                                        min={today}
                                        onChange={(event) => { setDate(event.target.value); }}                                     
                                        className={classes.forminput}
                                        required
                                    />
                                </Typography>
                            </AccordionSummary>
                        </Accordion><br />

                        <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                            <AccordionSummary>
                                <Typography className={classes.heading}>Time Slot</Typography>
                                <Typography className={classes.secondaryHeading}>
                                    <Select
                                        native
                                        onChange={(event) => { setSession(event.target.value); }}
 
                                        className={classes.formselect}
                                        required
                                    >
                                        <option aria-label="None" value="">Select Time Slot</option>
                                        <option Value="Morning">Morning</option>
                                        <option Value="Evening">Evening</option>
                                        <option Value="Full-Day" >Full-Day</option>
                                    </Select>
                                </Typography>
                            </AccordionSummary>
                        </Accordion><br />

                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary>
                                <Typography className={classes.heading}>Medical Rep Name</Typography>
                                <Typography className={classes.secondaryHeading}>
                                    <Select
                                        onClick={() => { fetchData() }}
                                        native
                                        onChange={(event) => { setRepID(event.target.value); }}
                                        className={classes.formselect}
                                        required
                                    >
                                        <option aria-label="None" value="">Select Medical Rep Name</option>
                                        {GetRep.map((customer) => (
                                            <option Value={customer.rep_ID}>{customer.name}-{customer.rep_ID}</option>
                                        ))}
                                    </Select>
                                </Typography>
                            </AccordionSummary>
                        </Accordion><br />

                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary>
                                <Typography className={classes.heading}>Title</Typography>
                                <Typography className={classes.secondaryHeading}>
                                    <input
                                        type="text"

                                        onChange={(event) => { setTitle(event.target.value); }}
                                        className={classes.forminput}
                                        required
                                    />
                                </Typography>
                            </AccordionSummary>
                        </Accordion><br />
                        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummary>
                                <Typography className={classes.heading}>Location</Typography>
                                <Typography className={classes.secondaryHeading}>
                                    <input
                                        type="text"

                                        onChange={(event) => { setLocation(event.target.value); }}
                                        className={classes.forminput}
                                    />
                                </Typography>
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
                                    <textarea
                                        onChange={(event) => { setDescription(event.target.value); }}
                                        rows="10" cols="80"   ></textarea>
                                </Typography>
                            </AccordionDetails>
                        </Accordion><br />
                    </form>

                </div>
                <Button
                    color="primary"
                    variant="contained"
                    style={mystyle.submitBtn}
                    onClick={asign_task}
                > Create</Button>
                <Link to='/appp/dataplan'>
                    <Button
                        type="submit"
                        id="submitBtn"
                        style={mystyle.closeBtn}
                    > Exit</Button>
                </Link>
            </div>
        </div>
        </div>
    );
}
