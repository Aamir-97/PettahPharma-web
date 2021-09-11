import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
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
        marginLeft:'250px',
        height: 'full',
        boxShadow: "2px 2px 5px  2px #9E9E9E",
        padding: "2vh",
        borderRadius: "5px",
        align: 'center'
    },
    backgroud: {
        backgroundColor: '#5eb6b8',
        backgroundImage: `url(${back})`,
        height:'666px',

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
        // marginRight: '0px',
        marginLeft:'10px'
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
         marginLeft:'410px'
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


export default function Edit_Medicalrep() {
    const rep_ID = window.location.pathname.substring(21, 26);

    const [Row, setRow] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone_no, setPhone_no] = useState("");
    const [working_area, setWorkingarea] = useState("");
    const [rating, setRating] = useState("");
    
    const edit_Medicalrep = (rep_ID) => {
        axios.put("http://localhost:3001/updatemedicalrep",
            { name: name,  email: email, phone_no: phone_no, working_area: working_area, rep_ID: rep_ID }).then(
                (response) => { 
                    window.location.reload();
                }
            )
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3001/viewmedicalrep', {
                params: {
                    rep_ID: rep_ID,
                }
            });
            setRow(response.data[0]);
            setName(response.data[0].name);
            setEmail(response.data[0].email);
            setPhone_no(response.data[0].phone_no);
            setWorkingarea(response.data[0].working_area);
            setRating(response.data[0].rating);
            console.log(response.data[0]);
        };
        fetchData();
    }, []);

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.backgroud}>
        <div className={classes.formbox}>
            <div className={classes.root}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}><h1>Edit Medical Rep</h1>  </Paper><br />
                </Grid>

                <div className={classes.root}>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Name</Typography>
                            <Typography className={classes.secondaryHeading}>
                                <input
                                    type="text"
                                    defaultValue={Row.name}
                                    onChange={(event) => { setName(event.target.value); }}
                                    style={mystyle.forminput}
                                />
                            </Typography>
                        </AccordionSummary>
                    </Accordion><br />

                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Email</Typography>
                            <Typography className={classes.secondaryHeading}>
                                <input
                                    type="text"
                                    defaultValue={Row.email}
                                    onChange={(event) => { setEmail(event.target.value); }}
                                    style={mystyle.forminput}
                                />
                            </Typography>
                        </AccordionSummary>
                    </Accordion><br />

                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Phone Number</Typography>
                            <Typography className={classes.secondaryHeading}>
                                <input
                                    type="text"
                                    defaultValue={Row.phone_no}
                                    onChange={(event) => { setPhone_no(event.target.value); }}
                                    style={mystyle.forminput}
                                />
                            </Typography>
                        </AccordionSummary>
                    </Accordion><br />

                    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Working Area</Typography>
                            <Typography className={classes.secondaryHeading}>
                                <input
                                    type="text"
                                    defaultValue={Row.area}
                                    onChange={(event) => { setWorkingarea(event.target.value); }}
                                    style={mystyle.forminput}
                                />
                            </Typography>
                        </AccordionSummary>
                    </Accordion><br />

                    <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Rating</Typography>
                            <Typography className={classes.secondaryHeading}>
                                <input
                                    type="text"
                                    defaultValue={Row.rating}
                                    onChange={(event) => { setRating(event.target.value); }}
                                    style={mystyle.forminput}
                                    disabled
                                /> 
                            </Typography>
                        </AccordionSummary>
                    </Accordion><br />
                </div>

                <Link to='/app/MedicalRepList' style={mystyle.button}>
                    <Button
                        color="primary"
                        variant="contained"
                        style={mystyle.submitBtn}
                        onClick={() => { edit_Medicalrep(rep_ID) }}
                    > Update</Button>
                </Link>
                <Link to='/app/MedicalRepList'>
                            <Button
                                type="submit"
                                id="submitBtn"
                                style={mystyle.closeBtn}                      
                            > Close</Button>
                        </Link>
                        </div>
            </div>
        </div>
    );
}
