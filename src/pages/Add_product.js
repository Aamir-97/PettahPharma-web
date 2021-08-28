import React, { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import shadows from 'src/theme/shadows';
import axios from "axios";
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

function Add_Product() {

    // let admin_ID = localStorage.getItem('admin_ID');
    // admin_ID = JSON.parse(admin_ID)
    // console.log(admin_ID);

    const [product_id, setProduct_id] = useState("")
    const [display_photo, setDisplay_photo] = useState("")
    const [name, setName] = useState("");
    const [volume, setVolume] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const add_Product = () => {
        axios.post('http://localhost:3001/createproduct', {
            product_id: product_id,
            display_photo: display_photo,
            name: name,
            volume: volume,
            price: price,
            description: description,

        }).then(() => {
            console.log("success");
            window.location.reload();
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
                <h1 style={mystyle.formhead}> Add Product </h1>
                <form >
                    <div >
                        <input
                            type="text"
                            style={mystyle.forminput}
                            placeholder="Product ID"
                            onChange={(event) => { setProduct_id(event.target.value); }}
                        /><br />
                        <input
                            type="file"
                            style={mystyle.forminput}
                            placeholder="Product Image"
                            onChange={(event) => { setDisplay_photo(event.target.value); }}
                        /><br />
                        <input
                            type="text"
                            style={mystyle.forminput}
                            placeholder="Name"
                            onChange={(event) => { setName(event.target.value); }}
                        /><br />
                        <input
                            type="text"
                            style={mystyle.forminput}
                            placeholder="Volume"
                            onChange={(event) => { setVolume(event.target.value); }}
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

                        <Link to='/app/ProductList'>
                            <button
                                type="submit"
                                id="submitBtn"
                                style={mystyle.submitBtn}
                                onClick={add_Product}
                            > Create</button>
                        </Link>
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