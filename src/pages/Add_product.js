import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shadows from 'src/theme/shadows';
import axios from "axios";

function Add_Product() {

  const [product_ID,setProductID] = useState("");
  const [name,setName] = useState("");
  const [volume,setVolume] = useState("");
  const [price,setPrice] = useState("")
  const [description,setDescription] = useState("");

  const add_Product = ()=>{
    console.log(product_ID);
    axios.post('http://localhost:3001/createproduct',{
    product_ID:product_ID,
    name:name,
    volume:volume,
    price:price,
    description:description,     

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
        <h1 style={mystyle.formhead}> CREATE PRODUCT </h1>
        <form >
          <div >

            <input type="text" style={mystyle.forminput} name="product_ID" onChange={(event)=>{setProductID(event.target.value);}} required placeholder="Product ID"/><br />
            <input type="text" style={mystyle.forminput} name="name" onChange={(event)=>{setName(event.target.value);}} required placeholder="Product Name"/><br />
            <input type="text" style={mystyle.forminput} name="volume" onChange={(event)=>{setVolume(event.target.value);}} required placeholder="Volume"/><br />
            <input type="text" style={mystyle.forminput} name="price" onChange={(event)=>{setPrice(event.target.value);}} required placeholder="Price"/><br />
            <input type="text" style={mystyle.forminput} name="description" onChange={(event)=>{setDescription(event.target.value);}} required placeholder="Description"/><br />
          </div>

          <div display='flex' align='right'>

            <Link to='/app/Product'>
              <button type="submit" onClick={add_Product} id="submitBtn" style={mystyle.submitBtn}> Create</button>
            </Link>

            <Link to='/app/Product'>
              <button type="submit" id="submitBtn" style={mystyle.closeBtn}> Close</button>
            </Link>
          </div>


        </form>

      </div>
    </div>

  )
}

export default Add_Product;