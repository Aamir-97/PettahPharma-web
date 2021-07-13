import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function Add_product() {

  const mystyle = {
    formstep: {
      fontsize: '35px',
      textalign: 'center',
      color: '#23750a',
    },

    forminput: {

      width: '75 %',
      padding: '10px 10px',
      margin: '8px 0',
      display: 'inline - block',
      border: '1px solid #ccc',
      borderradius: '4px',
      boxsizing: 'border - box',
    },



    formbox: {
      backgroundColor: '#f4f0ec',

      width: '1000px',
      textalign: 'center',
      marginTop: '10px',
      height: '600px'
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

      width: '700px',
      padding: '10px 10px',
      margin: '8px 0',
      display: 'inline - block',
      border: '1px solid #ccc',
      borderRadius: '5px',
      height: '40px',
      border: '1px solid black'

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
      backgroundColor: '#172b4d',
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
      backgroundColor: '#172b4d',
      transition: '1s background ease',
      cursor: 'pointer',
      border: 'none',
      borderRadius: '5px',
      color: 'red',
      marginRight: '150px'
    }


  };

  return (
    <div align='center'>
      <div style={mystyle.formbox}>
        <h1 style={mystyle.formhead}> ADD PRODUCT DETAILS </h1>
        <form >
          <div >


            <input
              type="text"
              style={mystyle.forminput}
              // className="forminput"
              name="name"
              placeholder="Name"
            /><br />

            <input
              type="text"
              style={mystyle.forminput}
              name="Description"
              placeholder="Description"
            /><br />

            <input
              type="text"
              style={mystyle.forminput}
              name="Volume"
              placeholder="Volume"

            /><br />


            <input
              type="tel"
              style={mystyle.forminput}
              name="Patient Type"
              placeholder="Patient Type"
            /><br />



            <input
              type="text"
              style={mystyle.forminput}
              name="Price"
              placeholder="Price"
            /><br />




          </div>

          <div display='flex' align='right'>

            <Link to='/app/products'>
              <button
                type="submit"
                id="submitBtn"
                style={mystyle.submitBtn}
              //className="nextBtn"
              > Add</button>
            </Link>

            <Link to='/app/products'>
              <button
                type="submit"
                id="submitBtn"
                style={mystyle.closeBtn}
              //className="nextBtn"
              > Close</button>
            </Link>
          </div>


        </form>

      </div>
    </div>

  )
}

export default Add_product;