import React, { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

function Add_Product() {
    const [product_id, setProduct_id] = useState("")
    const [state,setState]=useState({file:'',display_photo:'',message:'',success:false})
    const [name, setName] = useState("");
    const [volume, setVolume] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
 
    const add_Product = () => {
        if(state.file){
      let formData=new FormData();
      formData.append('file',state.file)
        
        axios.post('http://localhost:3001/imageUpload',formData,{
        'content-Type':'multipart/form-data',
      })
        if (name && volume) {
        axios.post('http://localhost:3001/createproduct', {
            product_id: product_id,
            display_photo: state.file.name,
            // display_photo: display_photo,
            name: name,
            volume: volume,
            price: price,
            description: description,

        }).then(() => {
            console.log("success");
            //    window.location.reload();
            alert("The new product was added successfully.")
            document.getElementById("create-course-form").reset();
        });
    }
    else {
        alert("Name, Volume are required.")
    }
}
};

    const mystyle = {    
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
        <div align='center'>
            <div style={mystyle.formbox}>
                <h1 style={mystyle.formhead}> Add Product </h1>
                <form>
                    <div >
                        <input
                            type="text"
                            style={mystyle.forminput}
                            placeholder="Product ID"
                            onChange={(event) => { setProduct_id(event.target.value); }}
                        /><br />
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
    )
}

export default Add_Product;