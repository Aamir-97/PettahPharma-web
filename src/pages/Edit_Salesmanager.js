import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
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
        align: 'center',
            
    },
    backgroud: {
        backgroundColor: '#5eb6b8',
        backgroundImage: `url(${back})`,
        height:'666px',
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
        marginLeft:'10px'
    },
    submitBtn: {
        // marginTop: '5px',
        width: '145px',
        height: '40px',
        fontSize: '18px',
        backgroundColor: '#0A6466',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        // /marginRight: '30px'
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


export default function Edit_Salesmanager() {
    const manager_ID = window.location.pathname.substring(23, 25);

    const [Row, setRow] = useState([]);
    const [name, setName] = useState("");
    // const [display_photo, setDisplay_photo] = useState("");
    const [email, setEmail] = useState("");
    const [phone_no, setPhone_no] = useState("");
    const [area, setArea] = useState("");

    // let admin_ID = localStorage.getItem('admin_ID');
    // admin_ID = JSON.parse(admin_ID)
    // console.log(admin_ID);
    
    const edit_Salesmanager = (manager_ID) => {
        axios.put("http://localhost:3001/updatemanager",
            { name: name, email: email, phone_no: phone_no, area: area, manager_ID: manager_ID }).then(
                (response) => { 
                    window.location.reload();
                }
            )
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3001/viewmanager', {
                params: {
                    manager_ID: manager_ID,
                }
            });
            setRow(response.data[0]);
            setName(response.data[0].name);
            // setDisplay_photo(response.data[0].display_photo);
            setEmail(response.data[0].email);
            setPhone_no(response.data[0].phone_no);
            setArea(response.data[0].area);
            console.log(response.data[0]);
        };
        fetchData();
    }, []);
    // console.log(window.location.pathname)
    // console.log(manager_ID)
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
                    <Paper className={classes.paper}><h1>Edit Salesmanager</h1>  </Paper><br />
                </Grid>

                <div className={classes.root}>

                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Name</Typography>
                            <Typography className={classes.secondaryHeading}>
                                <input
                                    startAdornment={
                                    <InputAdornment position="start">
                                      <AccountCircle />
                                    </InputAdornment>
                                    }
                                    type="text"
                                    defaultValue={Row.name}
                                    onChange={(event) => { setName(event.target.value); }}
                                    style={mystyle.forminput}
                                />
                            </Typography>
                        </AccordionSummary>
                    </Accordion><br />

                    {/* <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Photo</Typography>
                            <Typography className={classes.secondaryHeading}>
                                <input
                                    type="file"
                                    defaultValue={Row.display_photo}
                                    onChange={(event) => { setDisplay_photo(event.target.value); }}
                                    style={mystyle.forminput}
                                />
                            </Typography>
                        </AccordionSummary>
                    </Accordion><br /> */}

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
                            <Typography className={classes.heading}>Area</Typography>
                            <Typography className={classes.secondaryHeading}>
                                <input
                                    type="text"
                                    defaultValue={Row.area}
                                    onChange={(event) => { setArea(event.target.value); }}
                                    style={mystyle.forminput}
                                />
                            </Typography>
                        </AccordionSummary>
                    </Accordion><br />
                </div>

                <Link to='/app/ManagerList' style={mystyle.button}>
                    <Button
                        color="primary"
                        variant="contained"
                        style={mystyle.submitBtn}
                        onClick={() => { edit_Salesmanager(manager_ID) }}
                    > Update</Button>
                </Link>
                <Link to='/app/ManagerList'>
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
