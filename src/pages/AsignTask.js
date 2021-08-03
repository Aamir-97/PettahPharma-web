import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shadows from 'src/theme/shadows';
function AsignTask() {

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
            marginRight: '150px'
        }


    };

    return (
        <div align='center'>
            <div style={mystyle.formbox}>
                <h1 style={mystyle.formhead}> ASIGN TASK </h1>
                <form >
                    <div >


                        <input
                            type="text"
                            style={mystyle.forminput}
                            // className="forminput"
                            name="Name"
                            placeholder="Name of Task"
                        /><br />

                        <input
                            type="email"
                            style={mystyle.forminput}
                            name="EmployeeName"
                            placeholder="Name of Employee of Task"
                        /><br />

                        <textarea 
                            type="text"
                            style={mystyle.formtextarea}
                            name="details"
                            placeholder="Details of Task"

                        ></textarea><br />


                        {/* <input
              type="tel"
              style={mystyle.forminput}
              name=""
              placeholder="Phone 000-0000000"
            /><br /> */}
                        <input
                            type="date"
                            style={mystyle.forminput}
                            name="deadline"
                            placeholder="Deadline"
                        /><br />


                        <input
                            type="time"
                            style={mystyle.forminput}
                            name="timeline"
                            placeholder="Timeline"
                        /><br />




                    </div>

                    <div display='flex' align='right'>

                        <Link to='/appp/dataplan'>
                            <button
                                type="submit"
                                id="submitBtn"
                                style={mystyle.submitBtn}
                            //className="nextBtn"
                            > Create</button>
                        </Link>

                        <Link to='/appp/dataplan'>
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

export default AsignTask;