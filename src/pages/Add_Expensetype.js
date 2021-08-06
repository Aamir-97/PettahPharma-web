import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shadows from 'src/theme/shadows';
import axios from "axios";

function Add_Expensetype() {

  const [name,setName] = useState("");
  // const [status,setStatus] = useState("");
  // const [quota,setQuota] = useState("");
  // const [frequency,setFrequency] = useState("");

  const add_Expensetype = ()=>{
    console.log(name);
    axios.post('http://localhost:3001/createexpensetype',{
    name:name,
    // status:status,
    // quota:quota,
    // frequency:frequency,     

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
        <h1 style={mystyle.formhead}> CREATE EXPENSE TYPE </h1>
        <form >
          <div >
            <input type="text" style={mystyle.forminput} name="name" onChange={(event)=>{setName(event.target.value);}} required placeholder="Expense Name"/><br />
            {/* <input type="text" style={mystyle.forminput} name="status" onChange={(event)=>{setStatus(event.target.value);}} required placeholder="Paid / Unpaid"/><br />
            <input type="text" style={mystyle.forminput} name="quota" onChange={(event)=>{setQuota(event.target.value);}} required placeholder="Leave Quota"/><br />
            <input type="text" style={mystyle.forminput} name="frequency" onChange={(event)=>{setFrequency(event.target.value);}} required placeholder="Quota Frequency"/><br /> */}
          </div>

          <div display='flex' align='right'>

            <Link to='/app/settings'>
              <button type="submit" onClick={add_Expensetype} id="submitBtn" style={mystyle.submitBtn}> Create</button>
            </Link>

            <Link to='/app/settings'>
              <button type="submit" id="submitBtn" style={mystyle.closeBtn}> Close</button>
            </Link>
          </div>


        </form>

      </div>
    </div>

  )
}

export default Add_Expensetype;