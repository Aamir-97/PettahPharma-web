// import React,{useState,useEffect} from 'react';
// import axios from 'axios'
// import {Bar, Pie, Doughnut,Line} from 'react-chartjs-2'
// import ReactApexChart from "react-apexcharts";
// import Chart from "react-apexcharts";
// import ExpenseAnalysis from 'src/components/charts/ExpenseAnalysis';
// import AnnualExpenseReport from 'src/components/reports/AnnualExpenseReport';
// import AnnualVisitReport from 'src/components/reports/AnnualVisitReport';
// import AnnualTaskReport from 'src/components/reports/AnnualTaskReport';


// const dateOnly = (d) => {
//     const date = new Date(d);
//     const year = date.getFullYear();
//     const month = date.getMonth() + 1;
//     const day = date.getDate();
//     return `${year} - ${month} - ${day}`;
//   };

  
// export default function CustomerData() {
//     const[to_date,setTodate]=useState("");
//     const[from_date,setFromdate]=useState("");
//     const [orderanalyze,setOrderAnalyze]=useState([])
//     const [cusList,setCusList]=useState([])
//     const [ordList,setOrdList]=useState([])
//     const [returnList,setReturnList]=useState([])
//     const [returncList,setReturnCList]=useState([])
//     const [customercount,setCustomerCount]=useState([])
//     const [customizedList,setCustomizedList]=useState([])
//     const [cusorderList,setCusOrderList]=useState([])
//     const [deliveryList,setDeliveryList]=useState([])
//     const [quantityList,setQuantityList]=useState([])
//     const [deliveryList1,setDeliveryList1]=useState([])
  
//     const customer = async () => {
//         const response = await axios.get('http://localhost:3001/CustomerReport1', {
//             params: {
//                to_date:to_date,  
//                from_date:from_date
//             }
            
//         });
   
//         setCusList(response.data);

//         const response2 = await axios.get('http://localhost:3001/OrderReport1', {
//             params: {
//                to_date:to_date,  
//                from_date:from_date
//             }
            
//         });
   
//         setOrdList(response2.data);

//         const response1 = await axios.get('http://localhost:3001/CustomerCount1', {
//             params: {
//                to_date:to_date,  
//                from_date:from_date
//             }
            
//         });
   
//         setCustomerCount(response1.data) 

//         const response3 = await axios.get('http://localhost:3001/OrderChart', {
//             params: {
//                to_date:to_date,  
//                from_date:from_date
//             }
            
//         });
    
//         setOrderAnalyze(response3.data) 

//         const response4 = await axios.get('http://localhost:3001/ReturnItemReport1', {
//             params: {
//                to_date:to_date,  
//                from_date:from_date
//             }
            
//         });
    
//         setReturnList(response4.data) 

//         const response5 = await axios.get('http://localhost:3001/ReturnCount1', {
//             params: {
//                to_date:to_date,  
//                from_date:from_date
//             }
            
//         });
    
//         setReturnCList(response5.data) 

//         const response6 = await axios.get('http://localhost:3001/CustomizedReport1', {
//             params: {
//                to_date:to_date,  
//                from_date:from_date
//             }
            
//         });
    
//         setCustomizedList(response6.data) 

//         const response7 = await axios.get('http://localhost:3001/Cus_OrderChart', {
//             params: {
//                to_date:to_date,  
//                from_date:from_date
//             }
            
//         });
    
//         setCusOrderList(response7.data) 

//         const response8 = await axios.get('http://localhost:3001/DeliveryReport1', {
//             params: {
//                to_date:to_date,  
//                from_date:from_date
//             }
            
//         });
    
//         setDeliveryList(response8.data) 

//         const response9 = await axios.get('http://localhost:3001/DeliveryStatus1', {
//             params: {
//                to_date:to_date,  
//                from_date:from_date
//             }
            
//         });
    
//         setDeliveryList1(response9.data) 
    
//     }
//     const month=customercount.map(record=>dateOnly(record.date));
//     const count=customercount.map(record=>record.count);

//     const arr=orderanalyze.map(record=>dateOnly(record.o_date));
//     const cat=orderanalyze.map(record=>record.count);

//     const item=returncList.map(record=>record.name);
//     const value=returncList.map(record=>record.count);

//     const cus_quantity=cusorderList.map(record=>record.quantity);
//     const cus_cat=cusorderList.map(record=>record.category_name);

//     const arr1=quantityList.map(record=>record.quantity);
//     const cat1=quantityList.map(record=>record.name);

//     const count1 = deliveryList1.map(record=>record.count);
    

//       return (
//         <div style={{width:'1000px',alignItems:'center',marginRight:'30px',marginLeft:'30px'}}>
       
//          <div style={{display:'flex',alignItems:'center',height:'100px'}}>
//                    <div>
//                   <label style={{marginLeft:'40px',fontSize:'18px'}}>From Date</label>
//                   <input type='date' style={{width:'300px',height:'40px',border:'none',backgroundColor:'white',paddingLeft:'20px',marginTop:'10px',marginLeft:'20px',borderRadius:'10px'}} placeholder='From Date' 
//                    onChange={(event)=> {
//                     setFromdate(event.target.value);
//                   }} ></input>
//                   </div>
//                   <div>
//                <label style={{marginLeft:'40px',fontSize:'18px'}}>To Date</label>
//               <input type='date' style={{width:'300px',height:'40px',border:'none',backgroundColor:'white',paddingLeft:'20px',marginTop:'10px',marginLeft:'20px',borderRadius:'10px'}} placeholder='To date' 
//                    onChange={(event)=> {
//                     setTodate(event.target.value);
//                   }} ></input>
//                   </div>
//                   <button style={{marginLeft:'30px',fontSize:'15px',width:'200px',height:'35px',backgroundColor:'#0A6466',border:'none',borderRadius:'5px',color:'white',marginTop:'10px'}}
//                   onClick={()=>{customer()}}><b>GENERATE</b></button>
//                   </div><br/>

//     <div>
//     <AnnualVisitReport/>
//     </div>

//     <div>
//     <AnnualExpenseReport/>
//     </div>

//    <div>
//     <ExpenseAnalysis/>   
//     </div>

//     <div>
//     <AnnualTaskReport/>
//     </div>
               

//     </div>    
//       );
//     }
  
