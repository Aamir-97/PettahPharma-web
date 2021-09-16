import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import back from '../images/back3.jpg';

function Add_Product() {

    const [state,setState]=useState({file:'',display_photo:'',message:'',success:false})
    const [name, setName] = useState("");
    const [volume, setVolume] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
 
    const add_Product = () => {
        if (name && volume && price) {
        if(state.file){
      let formData=new FormData();
      formData.append('file',state.file)
        
        axios.post('http://localhost:3001/imageUpload',formData,{
        'content-Type':'multipart/form-data',
      })
    }
        axios.post('http://localhost:3001/createproduct', {
            display_photo: "https://image.shutterstock.com/image-vector/various-meds-pills-capsules-blisters-600w-1409823341.jpg",
            name: name,
            volume: volume,
            price: price,
            description: description,

        }).then(() => {
            console.log("success");
               window.location.replace("/app/ProductList");
            alert("The new product was added successfully.")
            // document.getElementById("create-course-form").reset();
        });

    }
    else {
        alert("Name, Volume, Price are required.")
    }
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
            marginTop: '0px',
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
            backgroud: {
                backgroundColor: '#5eb6b8',
                backgroundImage: `url(${back})`,
                height:'666px',
              },
    };
    
    const handleInput =(e) =>{
        let reader =new FileReader();
        let file=e.target.files[0]
        reader.onloadend =() =>{
          setState({
            ...state,
            file:file,
            display_photo:reader.result,
            message:""
          })
        }
        reader.readAsDataURL(file);
      }

    return (
        <div style={mystyle.backgroud}  >
        <div align='center'>
            <div style={mystyle.formbox}>
                <h1 style={mystyle.formhead}> Add Product </h1>
                <form>
                    <div >
                        <input
                            type="file"
                            name="file"
                            style={mystyle.forminput}
                            placeholder="Product Image"
                            onChange={handleInput}
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
                            placeholder="Volume"
                            onChange={(event) => { setVolume(event.target.value); }}
                            required
                        /><br />
                        <input
                            type="text"
                            style={mystyle.forminput}
                            placeholder="Price"
                            onChange={(event) => { setPrice(event.target.value); }}
                        /><br />
                        <textarea
                            type="text"
                            style={mystyle.formtextarea}
                            placeholder="Description"
                            onChange={(event) => { setDescription(event.target.value); }}
                        >
                        </textarea><br />
                    </div>

                    <div display='flex' align='right'>
                            <button
                                type="submit"
                                id="submitBtn"
                                style={mystyle.submitBtn}
                                onClick={add_Product}
                            > Create</button>
                        <Link to='/app/ProductList'>
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

export default Add_Product;