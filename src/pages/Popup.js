import React from "react";

const Popup = props => {
    const popupstyle = {
          /* Popup style */
    popupbox : {
    position: 'fixed',
    background: '#00000050',
    width: '100 %',
    height: '100vh',
    top: '0',
    left: '0',
  },
    
    box : {
    /* position: relative; */
    alignitems: 'center',
    width: '60 %',
    margin: '0 auto',
    height: 'auto',
    maxheight: '100vh',
    margintop: 'calc(100vh - 85vh - 20px)',
    background: '#fff',
    borderradius: '4px',
    padding: '1px',
    border: '1px solid #999',
    overflow: 'auto',
  },
    
    closeicon : {
    content: 'x',
    cursor: 'pointer',
    position: 'fixed',
    right: 'calc(15 % - -68px)',
    top: 'calc(100vh - 85vh - 20px)',
    background: '#cfe2c2',
    width: '25px',
    height: '25px',
    /* border-radius: 50%; */
    lineheight: '20px',
    textalign: 'center',
    border: '1px solid #999',
    fontsize: '20px',
  },
    };
  return (
    <div style={popupstyle.popupbox}>
      <div style={popupstyle.box}>
        <span style={popupstyle.closeicon} onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};

export default Popup;
