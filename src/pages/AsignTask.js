import React, { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import shadows from 'src/theme/shadows';
import axios from "axios";
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

function AsignTask() {

    let manager_ID = localStorage.getItem('managerid');
    manager_ID = JSON.parse(manager_ID)

    const [GetRep, setGetRep] = useState([]);
    const [rep_ID, setRepID] = useState("");
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("");
    const [session, setSession] = useState("");
    const [date, setDate] = useState("")


    const asign_task = () => {
        axios.post('http://localhost:3001/assigntask', {
            rep_ID: rep_ID,
            title: title,
            type: type,
            location: location,
            description: description,
            session: session,
            date: date,
            manager_ID: manager_ID,

        }).then(() => {
            console.log("success");
            //    window.location.reload();
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3001/getrep', {
                params: {
                    manager_ID: manager_ID,
                }
            });
            setGetRep(response.data);
        };
        fetchData();
    }, []);
    console.log(GetRep);

    const mystyle = {
        formstep: {
            fontsize: '35px',
            textalign: 'center',
            color: '#23750a',
        },
        formbox: {
            backgroundColor: 'gray',
            width: '60%',
            textalign: 'center',
            marginTop: '10px',
            height: 'full',
            boxShadow: "2px 2px 5px  2px #9E9E9E",
            padding: "2vh",
            borderRadius: "5px"
        },
        popupbox: {
            position: 'fixed',
            background: '#00000050',
            width: '75vh',
            height: '75vh',
            top: '12vh',
            left: '90vh',
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
        formtextarea: {

            width: '70%',
            padding: '10px 10px',
            margin: '8px 0',
            display: 'inline - block',
            border: '1px solid #C0C0C0',
            borderRadius: '5px',
            height: '80px'
        },
        formhead: {
            paddingTop: '50px',
            paddingBottom: '20px'
        },
        submitBtn: {
            marginTop: '20px',
            width: '145px',
            height: '40px',
            fontSize: '18px',
            backgroundColor: '#0A6466',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '5px',
            color: 'white',
            marginRight: '30px'
        },
        closeBtn: {
            marginTop: '20px',
            width: '145px',
            height: '40px',
            fontSize: '18px',
            backgroundColor: 'red',
            transition: '1s background ease',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '5px',
            color: 'white',
            marginRight: '200px'
        },
        formControl: {
            // margin: theme.spacing(1),
            minWidth: '320px',
          },
          selectEmpty: {
            // marginTop: theme.spacing(2),
          },
          aaa: {
              width: '500px',
            },
    };
    
    // const useStyles = makeStyles((theme) => ({
    //     formControl: {
    //       margin: theme.spacing(1),
    //       minWidth: '320px',
    //     },
    //     selectEmpty: {
    //       marginTop: theme.spacing(2),
    //     },
    //     aaa: {
    //         width: '500px',
    //       },
    //   }));
    //   const classes = useStyles();

    return (
        <div align='center'>
            <div style={mystyle.formbox}>
                <h1 style={mystyle.formhead}> ASIGN TASK </h1>
                <form >
                    <div >
                        <FormControl style={mystyle.formControl} >
                            <InputLabel id="demo-customized-select-label">Medical Rep Name</InputLabel>
                            <Select
                                 native
                                onChange={(event) => { setRepID(event.target.value); }}
                                style={mystyle.aaa}
                            >                    
                                <option aria-label="None" value="" />
                                {GetRep.map((customer) => (
                                    <option Value={customer.rep_ID}>{customer.name}-{customer.rep_ID}</option>
                                ))}
                            </Select>

                        </FormControl><br />
                        <input
                            type="text"
                            style={mystyle.forminput}
                            placeholder="Task Title"
                            onChange={(event) => { setTitle(event.target.value); }}
                        /><br />
                        <input
                            type="text"
                            style={mystyle.forminput}
                            placeholder="Type"
                            onChange={(event) => { setType(event.target.value); }}
                        /><br />
                        <input
                            type="text"
                            style={mystyle.forminput}
                            placeholder="Location"
                            onChange={(event) => { setLocation(event.target.value); }}
                        /><br />
                        <textarea
                            type="text"
                            style={mystyle.formtextarea}
                            placeholder="Description"
                            onChange={(event) => { setDescription(event.target.value); }}
                        >
                        </textarea><br />
                        <input
                            type="text"
                            style={mystyle.forminput}
                            placeholder="Session"
                            onChange={(event) => { setSession(event.target.value); }}
                        /><br />
                        <input
                            type="date"
                            style={mystyle.forminput}
                            placeholder="Date"
                            onChange={(event) => { setDate(event.target.value); }}
                        /><br />
                    </div>

                    <div display='flex' align='right'>

                        <Link to='/appp/dataplan'>
                            <button
                                type="submit"
                                id="submitBtn"
                                style={mystyle.submitBtn}
                                onClick={asign_task}
                            > Create</button>
                        </Link>
                        <Link to='/appp/dataplan'>
                            <button
                                type="submit"
                                id="submitBtn"
                                style={mystyle.closeBtn}                      
                            > Close</button>
                        </Link>
                    </div>
                </form>

            </div>
        </div>

    )
}

export default AsignTask;