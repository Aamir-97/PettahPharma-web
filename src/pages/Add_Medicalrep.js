import React, { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import shadows from 'src/theme/shadows';
import axios from "axios";
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

function Add_Medicalrep() {

    // let admin_ID = localStorage.getItem('admin_ID');
    // admin_ID = JSON.parse(admin_ID)
    // console.log(admin_ID);

    const [getManager, setGetManager] = useState([]);
    const [rep_ID, setRep_ID] = useState("")
    const [name, setName] = useState("");
    // const [display_photo, setDisplay_photo] = useState("");
    const [email, setEmail] = useState("");
    const [phone_no, setPhone_no] = useState("");
    const [area, setArea] = useState("");
    // const [rating, setRating] = useState("");
    const [password, setPassword] = useState("");
    const [manager_ID, setManager_ID] =useState("")


    const add_Medicalrep= () => {
        axios.post('http://localhost:3001/createmedicalrep', {
            rep_ID: rep_ID,
            name: name,
            // display_photo: display_photo,
            email: email,
            phone_no: phone_no,
            area: area,
            // rating: rating,
            password: password,
            manager_ID: manager_ID,

        }).then(() => {
            console.log("success");
            window.location.reload();
        });
    };

    useEffect(() => {
      const fetchData = async () => {
          const response = await axios.get('http://localhost:3001/getmanager', {
              params: {
                  manager_ID: manager_ID,
              }
          });
          setGetManager(response.data);
      };
      fetchData();
  }, []);
 console.log(getManager);

    const mystyle = {
        formstep: {
            fontsize: '35px',
            textalign: 'center',
            color: '#23750a',
        },
        formbox: {
            backgroundColor: 'white',
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
          selectfield: {
              width: '500px',
            },
    };
    
    return (
        <div align='center'>
            <div style={mystyle.formbox}>
                <h1 style={mystyle.formhead}> Add Medicalrep </h1>
                <form >
                    <div >
                        <input
                            type="text"
                            style={mystyle.forminput}
                            placeholder="Rep ID"
                            onChange={(event) => { setRep_ID(event.target.value); }}
                        /><br />
                        {/* <input
                            type="file"
                            style={mystyle.forminput}
                            placeholder="Photo"
                            onChange={(event) => { setDisplay_photo(event.target.value); }}
                        /><br /> */}
                        <input
                            type="text"
                            style={mystyle.forminput}
                            placeholder="Name"
                            onChange={(event) => { setName(event.target.value); }}
                        /><br />
                        <input
                            type="text"
                            style={mystyle.forminput}
                            placeholder="Email"
                            onChange={(event) => { setEmail(event.target.value); }}
                        /><br />
                        <input
                            type="text"
                            style={mystyle.forminput}
                            placeholder="Phone Number"
                            onChange={(event) => { setPhone_no(event.target.value); }}
                        /><br />
                        <input
                            type="text"
                            style={mystyle.forminput}
                            placeholder="Working Area"
                            onChange={(event) => { setArea(event.target.value); }}
                        /><br />
                        {/* <input
                            type="text"
                            style={mystyle.forminput}
                            placeholder="Rating"
                            onChange={(event) => { setRating(event.target.value); }}
                        /><br /> */}
                        <input
                            type="text"
                            style={mystyle.forminput}
                            placeholder="Password"
                            onChange={(event) => { setPassword(event.target.value); }}
                        /><br />
                        <input
                            type="text"
                            style={mystyle.forminput}
                            placeholder="ManagerID"
                            onChange={(event) => { setManager_ID(event.target.value); }}
                        /><br />
                        {/* <FormControl style={mystyle.formControl} >
                            <InputLabel id="demo-customized-select-label">Salesmanager Name</InputLabel>
                            <Select
                                 native
                                onChange={(event) => { setManager_ID(event.target.value); }}
                                style={mystyle.selectfield}
                            >                    
                                <option aria-label="None" value="" />
                                {getManager.map((Row) => (
                                    <option Value={Row.manager_ID}>{Row.name}-{Row.manager_ID}</option>
                                ))}
                            </Select>

                        </FormControl><br /> */}
                    </div>

                    <div display='flex' align='right'>

                        <Link to='/app/MedicalRepList'>
                            <button
                                type="submit"
                                id="submitBtn"
                                style={mystyle.submitBtn}
                                onClick={add_Medicalrep}
                            > Create</button>
                        </Link>
                        <Link to='/app/MedicalRepList'>
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

export default Add_Medicalrep;