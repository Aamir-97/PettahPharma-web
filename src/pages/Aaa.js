// // import React from "react";
// // //import background from "./img/placeholder.png";

// // function Aaa() {


// //       return (
// //         <h1>hello</h1>
// //       );
// // }

// // export default Aaa;

// import React, { useState } from 'react';
// import Popup from './Popup';
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   TextField,
//   InputAdornment,
//   SvgIcon
// } from '@material-ui/core';

// function Aaa() {
//   const [isOpen, setIsOpen] = useState(true);

//   const togglePopup = () => {
//     setIsOpen(!isOpen);
//   }
//   const mystyle = {
//   formbox : {
//     position: 'fixed',
//     background: '#00000050',
//     width: '85vh',
//     height: '85vh',
//     top: '12vh',
//     left: '080vh',
//   },
//   formbox : {
//     aline
//   }

//   };

//   return <div >

//     {isOpen && <Popup
//       content={<>
//         <div style={mystyle.formbox}>

//           <h5 style={mystyle.heading}> ADD CUSTOMER DETAILS </h5>

//           <form >
//             <div className="field4">


//               <input
//                 type="text"
//                 className="form-input"
//                 name="name"
//                 placeholder="Name"
//               />


//               <input
//                 type="tel"
//                 className="form-input"
//                 name="phone"
//                 placeholder="Phone 000-000-0000"
//               />

//               <input
//                 type="email"
//                 className="form-input"
//                 name="email"
//                 placeholder="E-mail"
//               />

//               <input
//                 type="date"
//                 className="form-input"
//                 name="deadline"
//                 placeholder="Deadline"
//               />

//               <input
//                 type="text"
//                 className="form-input"
//                 name="shippingAddress"
//                 placeholder="Employee Type"

//               />

//               <input
//                 type="text"
//                 className="form-input"
//                 name="projectAddress"
//                 placeholder="Employee Area"

//               />
//             </div>

//             <button
//               type="submit"
//               id="submitBtn"
//               className="nextBtn"
//             > submit</button>

//           </form>

//         </div>
//       </>}
//       handleClose={togglePopup}
//     />}
//   </div>
// }

// export default Aaa;



// import React from "react";
// //import background from "./img/placeholder.png";

// function Aaa() {


//       return (
//         <h1>hello</h1>
//       );
// }

// export default Aaa;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function Aaa() {

  const mystyle = {


    formstep: {
      fontsize: '35px',
      textalign: 'center',
      color: '#23750a',
      /* margin: 0 0 .5vh 0; */
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
      width: '150px',
      height: '50px',
      fontSize: '18px',
      backgroundColor: 'green',
      border: 'none',
      borderRadius: '5px',
      color: 'white',
      marginRight: '30px'
    },
    closeBtn: {
      marginTop: '20px',
      width: '150px',
      height: '50px',
      fontSize: '18px',
      backgroundColor: 'red',
      border: 'none',
      borderRadius: '5px',
      color: 'white',
      marginRight: '150px'
    }


  };

  return (
    <div align='center'>
      <div style={mystyle.formbox}>
        <h1 style={mystyle.formhead}> ADD CUSTOMER DETAILS </h1>
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
              type="email"
              style={mystyle.forminput}
              name="email"
              placeholder="E-mail"
            /><br />

            <input
              type="text"
              style={mystyle.forminput}
              name="projectAddress"
              placeholder="Location"

            /><br />


            <input
              type="tel"
              style={mystyle.forminput}
              name="phone"
              placeholder="Phone 000-0000000"
            /><br />



            <input
              type="date"
              style={mystyle.forminput}
              name="deadline"
              placeholder="Deadline"
            /><br />




          </div>

          <div display='flex' align='right'>

            <Link to='/app/customers'>
              <button
                type="submit"
                id="submitBtn"
                style={mystyle.submitBtn}
              //className="nextBtn"
              > Add</button>
            </Link>

            <Link to='/app/customers'>
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

export default Aaa;