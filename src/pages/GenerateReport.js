import React,{useEffect,useState} from 'react';
// import clsx from 'clsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Drawer from '@material-ui/core/Drawer';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
// import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
// import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
// import Divider from '@material-ui/core/Divider';
import ReactToPrint from 'react-to-print';
import DataComponent from './DataComponent';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    fontSize:40,
    fontWeight:600,
  },

  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
   
  },
  custom:{
    display:'flex',
    paddingLeft:'20px',
    
   height:'80px',
   paddingBottom:'10px',
    color:'black',
    fontSize:'20px',
   
  
},
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 'auto',
  },
  maindash:{
    display:'flex'
  },
  piechart:{
      display:'flex'
  },
  pieleft:{
 width:'400px',
 marginLeft:'100px'
  },
  pieright:{
    width:'400px',
    marginLeft:'300px'
     },
 datesalign:{
  display:'flex'
},
dateleft:{
    marginRight:'100px',
    marginBottom:'20px',
    marginLeft:'30px'
},

}));

const styles = {
  side:{
    backgroundColor:'rgb(37, 37, 94)',
  }
};


 



const GenerateReport=({componentRef})=> {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(true);
  // const {id}=useParams();
  // const [Dt, setDt] = useState([])
  // const[to_date,setTodate]=useState("");
  // const[from_date,setFromdate]=useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //       const response = await axios.get('http://localhost:3001/viewAdmin', {
  //           params: {
  //               id: id,  
  //           }
  //       });
   
  //       setDt(response.data[0]);
  //          console.log(response.data[0]);
   
  //   };
  //   fetchData();
  //  }, [id]);

  //  const [cus,setCus]=useState([])

  
    // const customer = async () => {
    //     const response = await axios.get('http://localhost:3001/CusWithDate', {
    //         params: {
    //            to_date:to_date,  
    //            from_date:from_date
    //         }
            
    //     });
   
    //     setCus(response.data);
           
   
    // }

  // const [cusorderCount,setCusOrderCount]=useState([])
  // useEffect(()=>{
  //   axios.get("http://localhost:3001/CustomizedOrderCount").then((response)=>{
  //     setCusOrderCount(response.data)
      
  //   })
  // },[])

  
  // const customizedcount=cusorderCount.map(record=>record.count);
  // const total=Number(customizedcount);

  return (
    <div className={classes.root}>
      <CssBaseline />

      {/* <main className={classes.content}> */}
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
          
          
              <div style={{display:'flex'}}>
                   <div style={{width:'1000px'}}>
               <Grid item xs={16}  direction="row">
              <Paper style={{marginTop:'20px'}}>
                
                 
              <div align='right' style={{marginTop:'20px'}}>
          <ReactToPrint
           content={() =>componentRef}
            trigger={() => <button className="btn btn-success" style={{marginTop:'20px',border:'none',marginRight:'30px',marginBottom:'20px',backgroundColor:'#0A6466'}}>Generate PDF</button>}
          />
         </div>
         
          <DataComponent  ref={(response) => (componentRef = response)} />
          
              
              </Paper>
              </Grid><br/>
              </div>
              </div>
              </Grid>
        </Container>
      {/* </main> */}
    </div>
  );
}

export default GenerateReport;