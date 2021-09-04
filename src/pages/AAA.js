import React from 'react';
import './App.css';
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//For Image Save
import axios from 'axios';
//For Image Upload
import ImageUploading from "react-images-uploading";
class App extends React.Component {
  onChange = (imageList) => {
    // data for submit
    
    // Create an object of formData 
    const formData = new FormData(); 
     
    // Update the formData object 
    formData.append( 
      "myFile", 
      imageList[0].file, 
      imageList[0].file.name
    ); 
   
    // Details of the uploaded file 
    console.log(imageList[0].file); 
   
    // Request made to the backend api 
    // Send formData object to my php file for save in folder
    axios.post("http://localhost/reactimageupload.php", formData); 
  }; 
   
  render() {
   
    return (
     
      <div className="maincontainer">
        
        <h1 className="mr-5 ml-5 mt-5">TheRichPost</h1>
        <div className="container mb-5 mt-5">
        
        <ImageUploading
        onChange={this.onChange}
      >
        {({ imageList, onImageUpload }) => (
          // write your building UI
          <div className="imageuploader">
            <div className="mainBtns">
            <button className="btn btn-primary mr-1" onClick={onImageUpload}>Upload Image</button>
            
            </div>
            {imageList.map((image) => (
              <div className="imagecontainer" key={image.key}>
                <img src={image.dataURL} />
                
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
       
            
      </div>
      
      </div>
      
)
};
}
export default App;