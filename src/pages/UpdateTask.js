import React, { useState, useEffect } from 'react';
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
import FormControl from '@material-ui/core/FormControl';
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
        align: 'center'
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
        marginLeft: '410px'
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
};


export default function UpdateTask() {
    const task_id = window.location.pathname.substring(17, 19);

    const [Dt, setDt] = useState("");
    const [GetRep, setGetRep] = useState([])
    const [rep_ID, setRepID] = useState("");
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [session, setSession] = useState("");
    const [description, setDescription] = useState("");

    let manager_ID = localStorage.getItem('managerid');
    manager_ID = JSON.parse(manager_ID)
    console.log(manager_ID);


    const update = (task_id, manager_ID) => {
        if (rep_ID && title && date && location && session) {
            axios.post("http://localhost:3001/update",
                { rep_ID: rep_ID, type: type, title: title, location: location, date: date, session: session, description: description, task_id: task_id, manager_ID: manager_ID }).then(
                    (response) => { }
                )
            alert("The task was updated successfully.")
        }
        else {
            alert("Date,Time slot,Medical rep name,title,location are required")

        }
    };



    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3001/viewtask', {
                params: {
                    task_id: task_id,
                    manager_ID: manager_ID,
                }
            });
            setDt(response.data[0]);
            setRepID(response.data[0].rep_ID)
            setTitle(response.data[0].title)
            setType(response.data[0].type)
            setLocation(response.data[0].location)
            setDate(response.data[0].date)
            setSession(response.data[0].session)
            setDescription(response.data[0].description)
            console.log(response.data[0]);
        };
        fetchData();
    }, []);

    let fullday = 'Full-Day';

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

    const dtt = new Date(Dt.date);
    const year = dtt.getFullYear() + '-';
    const month = ('0' + (dtt.getMonth() + 1)).slice(-2) + '-';
    const day = ('0' + dtt.getDate()).slice(-2);
    const mydate = (year + month + day)
    return (
        <div className={classes.backgroud}>
        <div className={classes.formbox}>
            <div className={classes.root}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}><h1>EDIT TASK</h1>  </Paper><br />
                   
                </Grid>
                
                <div className={classes.root}>

                    <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Date </Typography>
                            
                            <Typography className={classes.secondaryHeading}>
                                <input
                                    type="date"
                                    min={today}
                                    defaultValue={mydate}
                                    onChange={(event) => { setDate(event.target.value); }}
                                    style={mystyle.forminput}
                                    required
                                />
  
                            </Typography>
                        </AccordionSummary>
                    </Accordion><br />
                   

                    <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Time Slot </Typography>
                            <Typography className={classes.secondaryHeading}>
                                
                                <Select
                                    native
                                    onChange={(event) => { setSession(event.target.value); }}
                                    required
                                    style={mystyle.forminput}
                                >
                                    <option aria-label="None" Value={Dt.session}>{Dt.session}</option>
                                    <option Value="Morning">Morning</option>
                                    <option Value="Evening">Evening</option>
                                    <option Value="Full-Day" >Full-Day</option>
                                </Select>
                            </Typography>
                        </AccordionSummary>
                    </Accordion><br />

                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Medical Rep Name </Typography>
                            <Typography className={classes.secondaryHeading}>
                                <FormControl className={classes.formControl}>
                                    <Select
                                        onClick={() => { fetchData() }}
                                        native
                                        required
                                        onChange={(event) => { setRepID(event.target.value); }}
                                        style={mystyle.forminput}
                                    >
                                        <option Value={Dt.rep_ID}>{Dt.name}-{Dt.rep_ID}</option>
                                        {GetRep.map((customer) => (
                                            <option Value={customer.rep_ID}>{customer.name}-{customer.rep_ID}</option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Typography>
                        </AccordionSummary>
                    </Accordion><br />

                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Title</Typography>
                            <Typography className={classes.secondaryHeading}>
                                <input
                                    type="text"
                                    defaultValue={Dt.title}
                                    required
                                    onChange={(event) => { setTitle(event.target.value); }}
                                    style={mystyle.forminput}
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
                                    required
                                    defaultValue={Dt.location}
                                    onChange={(event) => { setTitle(event.target.value); }}
                                    style={mystyle.forminput}
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
                                <textarea defaultValue={Dt.description}
                                    onChange={(event) => { setDescription(event.target.value) }}
                                    rows="10" cols="80"   ></textarea>
                            </Typography>
                        </AccordionDetails>
                    </Accordion><br />




                </div>
                    <Button
                        color="primary"
                        variant="contained"
                        style={mystyle.submitBtn}
                        onClick={() => { update(Dt.task_id, manager_ID) }}
                    > Update</Button>
                <Link to='/appp/dataplan'>
                    <Button
                        type="submit"
                        id="submitBtn"
                        style={mystyle.closeBtn}
                    > Exit</Button>
                </Link>

            </div>
        </div>
        </div >
    );
}
