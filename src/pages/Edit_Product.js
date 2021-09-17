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


export default function Edit_Product({navigation}) {
    const product_id = window.location.pathname.substring(18, 21);
    // const [Row, setRow] = useState([]);
    const [display_photo, setDisplay_photo] = useState("");
    const [name, setName] = useState("");
    const [volume, setVolume] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    
    const edit_Product = (product_id) => {
        console.log(display_photo,name,volume,price,description,product_id)
        axios.post("http://localhost:3001/updateproduct", 
        { display_photo: display_photo, 
            name: name,  
            volume: volume, 
            price: price, 
            description: description, 
            product_id: product_id 
        }).then(
            (response) => { 
                window.location.replace('/app/ProductList');
            }
        )
};

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3001/viewproduct', {
                params: {
                    product_id: product_id,
                }
            });
            // setRow(response.data[0]);
            setDisplay_photo(response.data[0].display_photo);
            setName(response.data[0].name);
            setVolume(response.data[0].volume);
            setPrice(response.data[0].price);
            setDescription(response.data[0].description);
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
                    <Paper className={classes.paper}><h1>Edit Product</h1>  </Paper><br />
                </Grid>

                <div className={classes.root}>

                    
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel2')}>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Image</Typography>
                            <Typography className={classes.secondaryHeading}>
                                <input
                                    type="file"
                                    defaultValue={display_photo}
                                    onChange={(event) => { setDisplay_photo(event.target.value); }}
                                    style={mystyle.forminput}
                                />
                            </Typography>
                        </AccordionSummary>
                    </Accordion><br />

                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel1')}>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Name</Typography>
                            <Typography className={classes.secondaryHeading}>
                                <input
                                    type="text"
                                    defaultValue={name}
                                    onChange={(event) => { setName(event.target.value); }}
                                    style={mystyle.forminput}
                                />
                            </Typography>
                        </AccordionSummary>
                    </Accordion><br />

                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Volume</Typography>
                            <Typography className={classes.secondaryHeading}>
                                <input
                                    type="text"
                                    defaultValue={volume}
                                    onChange={(event) => { setVolume(event.target.value); }}
                                    style={mystyle.forminput}
                                />
                            </Typography>
                        </AccordionSummary>
                    </Accordion><br />

                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Price</Typography>
                            <Typography className={classes.secondaryHeading}>
                                <input
                                    type="text"
                                    defaultValue={price}
                                    onChange={(event) => { setPrice(event.target.value); }}
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
                            <Typography className={classes.secondaryHeading}>Click Full details</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <textarea defaultValue={description}
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
                        onClick={() => { edit_Product(product_id) }}
                    > Update</Button>
                <Link to='/app/ProductList'>
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
