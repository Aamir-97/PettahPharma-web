import React, { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import back from '../images/back3.jpg';
 
function Add_Medicalrep() {
    const [getManager, setGetManager] = useState([]);
    const [rep_ID, setRep_ID] = useState("")
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone_no, setPhone_no] = useState("");
    const [working_area, setWorkingarea] = useState("");
    const [password, setPassword] = useState("");
    const [manager_ID, setManager_ID] =useState("")

    const add_Medicalrep= () => {
        if (rep_ID && name && email && working_area && password && manager_ID) {
        axios.post('http://localhost:3001/createmedicalrep', {
            rep_ID: rep_ID,
            name: name,
            email: email,
            phone_no: phone_no,
            working_area: working_area,
            password: password,
            manager_ID: manager_ID,
        }).then(() => {
            // console.log("success");
            window.location.replace("/app/MedicalRepList");
            alert("The new medical rep was added successfully.")
            // document.getElementById("create-course-form").reset();
        });
    }
    else {
        alert("Rep ID, Name, Email, Area, Password, Manager ID are required.")
    }
};

    useEffect(() => {
      const fetchData = async () => {
          const response = await axios.get('http://localhost:3001/getmanager', {
          });
          setGetManager(response.data);
      };
      fetchData();
  }, []);
 console.log(getManager);

    const mystyle = {
        formbox: {
            backgroundColor: 'white',
            width: '60%',
            textalign: 'center',
            marginTop: '0px',
            height: 'full',
            boxShadow: "2px 2px 5px  2px #9E9E9E",
            padding: "2vh",
            borderRadius: "5px"
        },
        forminput: {
            width: '70%',
            padding: '10px 10px',
            margin: '8px 0',
            display: 'inline - block',
            border: '1px solid #C0C0C0',
            borderRadius: '5px',
            height: '40px',
            
        },
        formhead: {
            paddingTop: '50px',
            paddingBottom: '20px'
        },
            backgroud: {
                backgroundColor: '#5eb6b8',
                backgroundImage: `url(${back})`,
                height:'666px',
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
    };
    
    return (
        <div style={mystyle.backgroud}  >
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
                            required
                        /><br />
                        <input
                            type="text"
                            style={mystyle.forminput}
                            placeholder="Name"
                            onChange={(event) => { setName(event.target.value); }}
                            required
                        /><br />
                        <input
                            type="text"
                            style={mystyle.forminput}
                            placeholder="Email"
                            onChange={(event) => { setEmail(event.target.value); }}
                            required
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
                            onChange={(event) => { setWorkingarea(event.target.value); }}
                            required
                        /><br />
                        <input
                            type="text"
                            style={mystyle.forminput}
                            placeholder="Password"
                            onChange={(event) => { setPassword(event.target.value); }}
                            required
                        /><br />
                        {/* <input
                            type="text"
                            style={mystyle.forminput}
                            placeholder="ManagerID"
                            onChange={(event) => { setManager_ID(event.target.value); }}
                            required
                        /><br /> */}
                        <select
                                        native
                                        style={mystyle.forminput}
                                        required
                                        onChange={(event) => { setManager_ID(event.target.value); }}
                                    >
                                        <option aria-label="None" value="" >Select Manager </option >
                                        {getManager.map((customer) => (
                                            <option Value={customer.manager_ID}>{customer.name}-{customer.manager_ID}</option>
                                        ))}
                                    </select>
                    </div>

                    <div display='flex' align='right'>
                            <button
                                type="submit"
                                id="submitBtn"
                                style={mystyle.submitBtn}
                                onClick={add_Medicalrep}
                            > Create</button>
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
        </div>
    )
}

export default Add_Medicalrep;