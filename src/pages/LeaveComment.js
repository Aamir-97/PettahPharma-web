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
        backgroundColor: 'lightgray',
        width: '60%',
        marginTop: '0px',
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
    backgroud: {
        height:'825px',
        backgroundColor: '#5eb6b8',
        backgroundImage: `url(${back})`
        //  color: '#0A6466',
        // marginTop: '7px',
        // paddingRight:'10px',
        // fontSize:'100px',
        // size:'200px',
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
        marginLeft: '50px'
    },
    acceptBtn: {
        // marginTop: '0px',
        width: '145px',
        height: '40px',
        fontSize: '18px',
        // backgroundColor: '#0A6466',
        transition: '1s background ease',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        // marginRight: '0px',
        marginLeft:'10px'
    },
    rejectBtn: {
        // marginTop: '0px',
        width: '145px',
        height: '40px',
        fontSize: '18px',
        // backgroundColor: '#0A6466',
        transition: '1s background ease',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        // marginRight: '0px',
        marginLeft:'10px'
    },
};

export default function LeaveComment() {
    const leave_ID = window.location.pathname.substring(19, 22);
    const [Dt, setDt] = useState([]);

    const [salesmanager_comment, setManagerCom] = useState("");

    let manager_ID = localStorage.getItem('managerid');
    manager_ID = JSON.parse(manager_ID)
    console.log(manager_ID);

    // console.log(report_id);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3001/viewLeave', {
                params: {
                    leave_ID: leave_ID,
                }
            });
            setDt(response.data[0]);
            console.log(response.data[0]);
            setManagerCom(response.data[0].salesmanager_comment)
        };
        fetchData();
    }, []);


    const addcomment = (leave_ID) => {
        axios.put("http://localhost:3001/addleavecomment",
            { salesmanager_comment: salesmanager_comment, leave_ID: leave_ID }).then(
                (response) => { }
            )
            alert("The comment was added successfully.")
    };

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const dtt = new Date(Dt.start_Date);
    const year = dtt.getFullYear() + '/';
    const month = ('0' + (dtt.getMonth() + 1)).slice(-2) + '/';
    const day = ('0' + dtt.getDate()).slice(-2);

    const dttt = new Date(Dt.end_Date);
    const y = dttt.getFullYear() + '/';
    const m = ('0' + (dttt.getMonth() + 1)).slice(-2) + '/';
    const d = ('0' + dttt.getDate()).slice(-2);

    const addstatus = (status, leave_ID) => {
        console.log(status);
        axios.put("http://localhost:3001/addstatus",
          { status: status, leave_ID: leave_ID }).then(
            (response) => {
              window.location.reload();
              // this.setState({});
             }
          )
      };

    return (
        <div className={classes.backgroud}>
        <div className={classes.formbox}>
            <div className={classes.root}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}><h1>ADD COMMENT</h1>  </Paper><br />
                </Grid>

                <div className={classes.root}>

                    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography className={classes.heading}>Leave Infomation</Typography>
                            <Typography className={classes.secondaryHeading}>click full details</Typography>
                        </AccordionSummary>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Medical Rep Name</Typography>
                            <Typography className={classes.secondaryHeading}>{Dt.repname}</Typography>
                        </AccordionSummary>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Leave Type</Typography>
                            <Typography className={classes.secondaryHeading}>{Dt.leave_Type}</Typography>
                        </AccordionSummary>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Start Date</Typography>
                            <Typography className={classes.secondaryHeading}>{year + month + day}</Typography>
                        </AccordionSummary>
                        <AccordionSummary>
                            <Typography className={classes.heading}>End Date</Typography>
                            <Typography className={classes.secondaryHeading}>{y + m + d}</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <Typography className={classes.heading}>Description</Typography>
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
                        placeholder="Add Comment"
                        defaultValue={Dt.salesmanager_comment}
                        // variant="outlined" 
                        onChange={(event) => { setManagerCom(event.target.value); }}
                        className={classes.textfield} /><br /><br />

                </div>

                <Link to={`/appp/Leave`}  >
                    <Button
                        color="primary"
                        variant="contained"
                        style={mystyle.submitBtn}
                        onClick={() => { addcomment(leave_ID) }}
                    >
                        Add Comment
                    </Button>
                </Link>
                <Button
                        color="primary"
                        variant="contained"
                        // onClick={addstatus("Accept", customer.leave_ID)}
                        onClick={()=>{addstatus("1", Dt.leave_ID)}} 
                        disabled={Dt.status =="1"}
                        style={mystyle.acceptBtn}>
                        Accept
                      </Button>
        
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={()=>{addstatus("0", Dt.leave_ID)}} 
                        disabled={Dt.status =="0"} 
                        style={mystyle.rejectBtn}>
                        Reject 
                      </Button>
                <Link to='/appp/Leave'>
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
