import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shadows from 'src/theme/shadows';
import axios from "axios";

function Edit_Salesmanager() {

  const [manager_ID,setManagerID] = useState("");
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [phone_no,setPhoneNo] = useState("");
  const [area,setArea] = useState("");
  const [password,setPassword] = useState("");

  const edit_Salesmanager = ()=>{
    console.log(manager_ID);
    axios.post('http://localhost:3001/editmanager',{
    manager_ID:manager_ID,
    name:name,
    email:email,
    phone_no:phone_no,
    area:area,
    password:password,
     

    }).then(()=>{
       console.log("success");
     });
};

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
      padding : "2vh",
      borderRadius : "5px"
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
      marginRight: '150px'
    }


  };

  return (
    <div align='center'>
      <div style={mystyle.formbox}>
        <h1 style={mystyle.formhead}> EDIT SALES MANAGER </h1>
        <form >
          <div >

            <input type="text" style={mystyle.forminput} name="manager_ID" onChange={(event)=>{setManagerID(event.target.value);}} required placeholder="ID"/><br />
            <input type="text" style={mystyle.forminput} name="name" onChange={(event)=>{setName(event.target.value);}} required placeholder="Name"/><br />
            <input type="email" style={mystyle.forminput} name="email" onChange={(event)=>{setEmail(event.target.value);}} required placeholder="Email"/><br />
            <input type="text" style={mystyle.forminput} name="phone_no" onChange={(event)=>{setPhoneNo(event.target.value);}} required placeholder="Phone Number"/><br />
            <input type="text" style={mystyle.forminput} name="area" onChange={(event)=>{setArea(event.target.value);}} required placeholder="Area"/><br />
            <input type="text" style={mystyle.forminput} name="password" onChange={(event)=>{setPassword(event.target.value);}} required placeholder="Password"/><br />
          </div>

          <div display='flex' align='right'>

            <Link to='/app/Salesmanager'>
              <button type="submit" onClick={edit_Salesmanager} id="submitBtn" style={mystyle.submitBtn}> Create</button>
            </Link>

            <Link to='/app/Salesmanager'>
              <button type="submit" id="submitBtn" style={mystyle.closeBtn}> Close</button>
            </Link>
          </div>


        </form>

      </div>
    </div>

  )
}

export default Edit_Salesmanager;