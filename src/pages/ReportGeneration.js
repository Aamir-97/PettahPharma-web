import React,{useEffect,useState} from 'react';
import clsx from 'clsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import CategoryChart from '../../charts/CategoryChart';
import Chart from "react-apexcharts";
import ApexCharts from 'apexcharts'

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ApexChart from 'src/components/charts/ApexChart';

// import {Redirect} from "react-router-dom"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import {Bar, Pie, Doughnut,Line} from 'react-chartjs-2'
// import {userData} from "../../charts/dummydata"
// import { mainListItems, Logout } from './listItems';
// import '../css/Dashboard.css'
// import Chart from '../../charts/Chart'
// import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
// import { array } from 'yup/lib/locale';
// const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({

}));

// const styles = {
//   side:{
//     backgroundColor:'rgb(37, 37, 94)',
//   }
// };



const ReportGeneration=()=> {

  const dateOnly = (d) => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year} - ${month} - ${day}`;
  };

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const {todate}=useParams();
  const {fromdate}=useParams();
 
  const [quantityList,setQuantityList]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/CategoryNoChart").then((response)=>{
      setQuantityList(response.data)
      console.log(response)
    })
  },[])

  const [returnList,setReturnList]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/ReturnCount").then((response)=>{
      setReturnList(response.data)
      console.log(response)
    })
  },[])
 

  const [cusorderList,setCusOrderList]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/Cus_OrderChart").then((response)=>{
      setCusOrderList(response.data)
      console.log(response)
    })
  },[])

  const [customercount,setCustomerCount]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/CustomerCount").then((response)=>{
      setCustomerCount(response.data)
      console.log(response)
    })
  },[])

 
  const [order,setOrder]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/Order").then((response)=>{
      setOrder(response.data)
    })
  },[])

  const [orderanalyze,setOrderAnalyze]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/OrderAnalyze").then((response)=>{
      setOrderAnalyze(response.data)
    })
  },[])
 
  const orderdata={orderanalyze};
  console.log(orderdata);

const arr=quantityList.map(record=>record.quantity);
const cat=quantityList.map(record=>record.name);

const item=returnList.map(record=>record.name);
const value=returnList.map(record=>record.count);

const cus_quantity=cusorderList.map(record=>record.quantity);
const cus_cat=cusorderList.map(record=>record.category_name);

const month=customercount.map(record=>record.month);
const count=customercount.map(record=>record.count);

  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}

 <main style={{backgroundColor: '#f0f8ff'}} className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
         
            <Grid item xs={12} spacing={1}>
               {/* <h1><b>SYSTEM ANALYTICS</b></h1> */}
               </Grid>

               <div style={{display:'flex'}}>
               <Grid item xs={8} >
                          <Paper>
                      <br/>
                       <h2 style={{marginLeft:'20px'}}><b>Customer Analytics-2021</b></h2>
                     
                       <Bar  style={{width:'1100px',marginLeft:'10px'}}
      data={{
        labels:month,
        datasets:[{
          label:'No of Customers per month',
          data:count,
          backgroundColor:'#4166f5',
          barThickness:18
        },
       
       
        ]
      }}
      options={{
        tooltips:{
          mode:'index',
          callbacks:{
            label:function(toolTipItem){
              return ("Revenue: $"+toolTipItem.value)
            }
          }

        },
        scales:{
          xAxes:[
            {
              gridLines:{
              color:'cyan'
            },
              scaleLabel:{
                labelString:'Months',
                display:true,
                fontColor:'blue',
                fontSize:20
              },
              ticks:{
                fontColor:'green'
              }
            }
          ],
          yAxes:[
          {
            gridLines:{
              color:'cyan'
            },
            scaleLabel:{
                labelString:'Revenue',
                display:true,
                fontColor:'blue',
                fontSize:20,
              },
            ticks:{
              beginAtZero:true,
              fontColor:'green',
             
            }
          }
          ]
        }
      }}
      >

      </Bar>    
              </Paper>
            </Grid>
            <Grid item xs={8} style={{marginLeft:'20px'}}>
              <Paper  style={{width:'390px',height:'470px'}} >
              <h2 style={{marginLeft:'20px'}}><b>Returned Items</b></h2>
               <Doughnut
               
               data = {{
                labels: item,
                datasets: [{
                  data: value,
                  backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
                  'green'
                  ],
                  hoverBackgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
                  'green'
                  ]
                }]
                } }
               >

               </Doughnut>
               <br/>
             
              </Paper>
            </Grid>
    </div>

            <Grid item xs={12} style={{marginTop:'10px'}}>
              <Paper >
              <h2 style={{marginLeft:'20px'}}><b>Recent Orders</b></h2>
           
             
                     <Table style={{width:'1200px'}} striped bordered hover responsive>
                         <thead className="tableheading">
                         <th>Order Item</th>
                         <th>Customer Name</th>
                         <th>Date</th>
                         <th>Price</th>
                         </thead>
                         <tbody align='center' className="tablebody">
                         {order.map((record)=>{
                                 return(
                         <tr>
                             <td>{record.name}</td>
                             <td>{record.cus_name}</td>
                             <td>{dateOnly(record.o_date)}</td>
                             <td>{record.total_price}</td>
                         </tr>
                       
                                 )
                         })}
                         </tbody>
                     </Table>
               
              </Paper>
            </Grid>
           
       
            <Grid item xs={12}  >
              <Paper >
                  <div className={classes.piechart}  display='flex'>
                      <div className={classes.pieleft}>
                          <h2 align='center'><b>Categories</b></h2>
                         
                          <Chart
            options={{
                chart: {
                    width: 300,
                    type: 'pie',
                  },
                  labels: cat,
                  responsive: [{
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 150
                      },
                      legend: {
                        position: 'bottom'
                      }
                    }
                  }] }
        }
            series={arr}
            type="pie"
            width={500}
             />
     
      </div>
      <div className={classes.pieright}>
      <h2 align='center'><b>Customized Orders</b></h2>
              {/* <Pie style={{width:'200px'}}
      data={{
        labels:cus_cat,
        datasets:[{
          data:cus_quantity,
          backgroundColor:['red','orange','purple','blue','green'],
        },
        ]
      }
      }
      >

      </Pie> */}
      <Chart
            options={{
                chart: {
                    width: 300,
                    type: 'pie',
                  },
                  labels: cus_cat,
                  responsive: [{
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 150
                      },
                      legend: {
                        position: 'bottom'
                      }
                    }
                  }] }
        }
            series={cus_quantity}
            type="pie"
            width={500}
             />
      </div>
      </div>
              </Paper>
            </Grid>
            </Grid>
            <div style={{display:'flex',marginTop:'10px'}}>
            <Grid item xs={6} >
           
              <Paper style={{height:'430px'}} >
              <h2 style={{marginLeft:'20px',paddingTop:'10px'}}><b>Order Analytics Per Month</b></h2>
                <ApexChart />
              </Paper>
            </Grid>
           
         

          <Grid item xs={6} style={{marginLeft:'20px'}}>
              <Paper style={{height:'430px'}} >
              <h2 style={{marginLeft:'20px',paddingTop:'10px'}}><b>Delivery Status</b></h2>
                {/* <CategoryChart /> */}
              </Paper>
            </Grid>
           
            </div>

         
           
         
        </Container>
      </main>
    </div>
  );
}

export default ReportGeneration;
