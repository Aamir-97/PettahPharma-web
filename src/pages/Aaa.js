// import React from "react";
// //import background from "./img/placeholder.png";

// function Aaa() {
    
      
//       return (
//         <h1>hello</h1>
//       );
// }

// export default Aaa;

import React, { useState } from 'react';
import Popup from './Popup';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';

function Aaa() {
  const [isOpen, setIsOpen] = useState(true);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }


  return <Box>

    {isOpen && <Popup
      content={<>
        <Box >

          <h5 className="form-step"> ADD CUSTOMER DETAILS </h5>

          <form >
            <Box >


              <TextField
                type="text"
                className="form-input"
                name="name"
                placeholder="Name"
              />


              <TextField
                type="tel"
                className="form-input"
                name="phone"
                placeholder="Phone 000-000-0000"
              />

              <TextField
                type="email"
                className="form-input"
                name="email"
                placeholder="E-mail"
              />

              <TextField
                type="date"
                className="form-input"
                name="deadline"
                placeholder="Deadline"
              />

              <TextField
                type="text"
                className="form-input"
                name="shippingAddress"
                placeholder="Employee Type"

              />

              <TextField
                type="text"
                className="form-input"
                name="projectAddress"
                placeholder="Employee Area"

              />
            </Box>

            <Button
              type="submit"
              id="submitBtn"
              className="nextBtn"
            > submit</Button>

          </form>

        </Box>
      </>}
      handleClose={togglePopup}
    />}
  </Box>
}

export default Aaa;