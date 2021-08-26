// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import moment from 'moment';
// import PerfectScrollbar from 'react-perfect-scrollbar';
// import {
//     Avatar,
//     Box,
//     Card,
//     Checkbox,
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TablePagination,
//     TableRow,
//     Button,
//     Typography
// } from '@material-ui/core';
// import getInitials from 'src/utils/getInitials';
// import { Link } from 'react-router-dom';

// const LeaveResults = ({ Leave, ...rest }) => {
//     const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
//     const [limit, setLimit] = useState(10);
//     const [page, setPage] = useState(0);

//     // const handleSelectAll = (event) => {
//     //   let newSelectedCustomerIds;

//     //   if (event.target.checked) {
//     //     newSelectedCustomerIds = SummaryReport.map((customer) => customer.id);
//     //   } else {
//     //     newSelectedCustomerIds = [];
//     //   }

//     //   setSelectedCustomerIds(newSelectedCustomerIds);
//     // };

//     // const handleSelectOne = (event, id) => {
//     //   const selectedIndex = selectedCustomerIds.indexOf(id);
//     //   let newSelectedCustomerIds = [];

//     //   if (selectedIndex === -1) {
//     //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
//     //   } else if (selectedIndex === 0) {
//     //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
//     //   } else if (selectedIndex === selectedCustomerIds.length - 1) {
//     //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
//     //   } else if (selectedIndex > 0) {
//     //     newSelectedCustomerIds = newSelectedCustomerIds.concat(
//     //       selectedCustomerIds.slice(0, selectedIndex),
//     //       selectedCustomerIds.slice(selectedIndex + 1)
//     //     );
//     //   }

//     //   setSelectedCustomerIds(newSelectedCustomerIds);
//     // };

//     const handleLimitChange = (event) => {
//         setLimit(event.target.value);
//     };

//     const handlePageChange = (event, newPage) => {
//         setPage(newPage);
//     };

//     // const handleRoute = () =>{ 
//     //   history.push("'/appp/AsignTask'}");
//     // }
//     // function Home() {
//     //   const history = useHistory();

//     //   const handleRoute = () =>{ 
//     //     history.push("/appp/AsignTask");
//     //   }


//     return (
//         <Card {...rest}>
//             <PerfectScrollbar>
//                 <Box sx={{ minWidth: 1050 }}>
//                     {/* <Link to={'/appp/ViewSummary'}> */}
//                         <Table>
//                             <TableHead>
//                                 <TableRow onChange={handlePageChange}>

//                                     {/* <TableCell padding="checkbox"> */}
//                                     {/* <Checkbox
//                       checked={selectedCustomerIds.length === SummaryReport.length}
//                       color="primary"
//                       indeterminate={
//                         selectedCustomerIds.length > 0
//                         && selectedCustomerIds.length < SummaryReport.length
//                       }
//                       onChange={handleSelectAll}
//                     /> */}

//                                     {/* </TableCell> */}
//                                     <TableCell>
//                                         Employee Name
//                                     </TableCell>
//                                     <TableCell>
//                                         Leave Type
//                                     </TableCell>
//                                     <TableCell>
//                                         Date
//                                     </TableCell>
//                                     {/* <TableCell>
//                   Phone
//                 </TableCell> */}
//                                     <TableCell>
//                                         Duration
//                                     </TableCell>
//                                     <TableCell>
//                                         Description
//                                     </TableCell>
//                                     <TableCell></TableCell>
//                                     <TableCell></TableCell>
//                                 </TableRow>
//                             </TableHead>

//                             <TableBody>

//                                 {Leave.slice(0, limit).map((customer) => (

//                                     <TableRow
//                                         hover
//                                         key={customer.id}
//                                         selected={selectedCustomerIds.indexOf(customer.id) !== -1}
//                                     >

//                                         {/* <TableCell padding="checkbox"> */}
//                                         {/* <Checkbox
//                         checked={selectedCustomerIds.indexOf(customer.id) !== -1}
//                         onChange={(event) => handleSelectOne(event, customer.id)}
//                         value="true"
//                       /> */}
//                                         {/* <Link to={'/appp/AsignTask'}></Link> */}
//                                         {/* <Link to={'/appp/AsignTask'}></Link> */}
//                                         {/* </TableCell> */}

//                                         <TableCell>

//                                             <Box
//                                                 sx={{
//                                                     alignItems: 'center',
//                                                     display: 'flex'
//                                                 }}
//                                             >
//                                                 {/* <Avatar
//                                                     src={customer.avatarUrl}
//                                                     sx={{ mr: 2 }}
//                                                 >
//                                                     {getInitials(customer.doctor_name)}
//                                                 </Avatar> */}
//                                                 <Typography
//                                                     color="textPrimary"
//                                                     variant="body1"
//                                                 >
//                                                     {customer.name}
//                                                 </Typography>
//                                             </Box>
//                                         </TableCell>
//                                         <TableCell>
//                                             {customer.leaveType}
//                                         </TableCell>
//                                         <TableCell>
//                                             {customer.date}
//                                         </TableCell>
//                                         <TableCell>
//                                             {customer.duration}
//                                         </TableCell>
//                                         <TableCell>
//                                             {customer.description}
//                                         </TableCell>
//                                         <TableCell>
//                                             <Button
//                                                 color="primary"
//                                                 variant="contained"
//                                             >
//                                                 Accept
//                                             </Button>
//                                         </TableCell>
//                                         <TableCell>
//                                             <Button
//                                                 color="rebutton"
//                                                 variant="contained"
//                                             >
//                                                 Reject
//                                             </Button>
//                                         </TableCell>
//                                         {/* <TableCell>
//                     {`${customer.address.city}, ${customer.address.state}, ${customer.address.country}`}
//                     {`${customer.address.city}`}
//                   </TableCell>
//                   <TableCell>
//                     {customer.phone}
//                   </TableCell>
//                   <TableCell>
//                     {customer.price}
//                   </TableCell> */}

//                                     </TableRow>

//                                 ))}

//                             </TableBody>

//                         </Table>
//                     {/* </Link> */}
//                 </Box>
//             </PerfectScrollbar>
//             <TablePagination
//                 component="div"
//                 count={Leave.length}
//                 onPageChange={handlePageChange}
//                 onRowsPerPageChange={handleLimitChange}
//                 page={page}
//                 rowsPerPage={limit}
//                 rowsPerPageOptions={[5, 10, 25]}
//             />
//         </Card>
//     );
// };

// LeaveResults.propTypes = {
//     Leave: PropTypes.array.isRequired
// };

// export default LeaveResults;



// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import moment from 'moment';
// import PerfectScrollbar from 'react-perfect-scrollbar';
// import {
//   Avatar,
//   Box,
//   Card,
//   Checkbox,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TablePagination,
//   TableRow,
//   Typography
// } from '@material-ui/core';
// import getInitials from 'src/utils/getInitials';
// import { Link } from 'react-router-dom';

// const SummaryReportResults = ({ SummaryReport, ...rest }) => {
//   const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
//   const [limit, setLimit] = useState(10);
//   const [page, setPage] = useState(0);

//   // const handleSelectAll = (event) => {
//   //   let newSelectedCustomerIds;

//   //   if (event.target.checked) {
//   //     newSelectedCustomerIds = SummaryReport.map((customer) => customer.id);
//   //   } else {
//   //     newSelectedCustomerIds = [];
//   //   }

//   //   setSelectedCustomerIds(newSelectedCustomerIds);
//   // };

//   // const handleSelectOne = (event, id) => {
//   //   const selectedIndex = selectedCustomerIds.indexOf(id);
//   //   let newSelectedCustomerIds = [];

//   //   if (selectedIndex === -1) {
//   //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
//   //   } else if (selectedIndex === 0) {
//   //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
//   //   } else if (selectedIndex === selectedCustomerIds.length - 1) {
//   //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
//   //   } else if (selectedIndex > 0) {
//   //     newSelectedCustomerIds = newSelectedCustomerIds.concat(
//   //       selectedCustomerIds.slice(0, selectedIndex),
//   //       selectedCustomerIds.slice(selectedIndex + 1)
//   //     );
//   //   }

//   //   setSelectedCustomerIds(newSelectedCustomerIds);
//   // };

//   const handleLimitChange = (event) => {
//     setLimit(event.target.value);
//   };

//   const handlePageChange = (event, newPage) => {
//     setPage(newPage);
//   };

//   // const handleRoute = () =>{ 
//   //   history.push("'/appp/AsignTask'}");
//   // }
//   // function Home() {
//   //   const history = useHistory();

//   //   const handleRoute = () =>{ 
//   //     history.push("/appp/AsignTask");
//   //   }


//     return (
//       <Card {...rest}>
//         <PerfectScrollbar>
//           <Box sx={{ minWidth: 1050 }}>
//             <Link to={'/appp/ViewSummary'}>
//             <Table>
//               <TableHead>
//                 <TableRow onChange={handlePageChange}>

//                   {/* <TableCell padding="checkbox"> */}
//                     {/* <Checkbox
//                       checked={selectedCustomerIds.length === SummaryReport.length}
//                       color="primary"
//                       indeterminate={
//                         selectedCustomerIds.length > 0
//                         && selectedCustomerIds.length < SummaryReport.length
//                       }
//                       onChange={handleSelectAll}
//                     /> */}

//                   {/* </TableCell> */}
//                   <TableCell>
//                     Employee Name
//                   </TableCell>
//                   <TableCell>
//                     Location
//                   </TableCell>
//                   <TableCell>
//                     Visit Type
//                   </TableCell>
//                   {/* <TableCell>
//                   Phone
//                 </TableCell> */}
//                   <TableCell>
//                     Date
//                   </TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {/* <Link to={'/appp/AsignTask'}>  */}
//                 {SummaryReport.slice(0, limit).map((customer) => (
//                   // <Link to={'/appp/AsignTask'}> 
//                   <TableRow
//                     hover
//                     key={customer.id}
//                     selected={selectedCustomerIds.indexOf(customer.id) !== -1}
//                   >

//                     {/* <TableCell padding="checkbox"> */}
//                       {/* <Checkbox
//                         checked={selectedCustomerIds.indexOf(customer.id) !== -1}
//                         onChange={(event) => handleSelectOne(event, customer.id)}
//                         value="true"
//                       /> */}
//                       {/* <Link to={'/appp/AsignTask'}></Link> */}
//                       {/* <Link to={'/appp/AsignTask'}></Link> */}
//                     {/* </TableCell> */}

//                     <TableCell>

//                       <Box
//                         sx={{
//                           alignItems: 'center',
//                           display: 'flex'
//                         }}
//                       >
//                         <Avatar
//                           src={customer.avatarUrl}
//                           sx={{ mr: 2 }}
//                         >
//                           {getInitials(customer.doctor_name)}
//                         </Avatar>
//                         <Typography
//                           color="textPrimary"
//                           variant="body1"
//                         >
//                           {customer.doctor_name}
//                         </Typography>
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       {customer.location}
//                     </TableCell>
//                     <TableCell>
//                       {customer.visittype}
//                     </TableCell>
//                     <TableCell>
//                       {customer.date}
//                     </TableCell>
//                     {/* <TableCell>
//                     {`${customer.address.city}, ${customer.address.state}, ${customer.address.country}`}
//                     {`${customer.address.city}`}
//                   </TableCell>
//                   <TableCell>
//                     {customer.phone}
//                   </TableCell>
//                   <TableCell>
//                     {customer.price}
//                   </TableCell> */}

//                   </TableRow>

//                 ))}
//                 {/* </Link> */}
//               </TableBody>

//             </Table>
//             </Link>
//           </Box>
//         </PerfectScrollbar>
//         <TablePagination
//           component="div"
//           count={SummaryReport.length}
//           onPageChange={handlePageChange}
//           onRowsPerPageChange={handleLimitChange}
//           page={page}
//           rowsPerPage={limit}
//           rowsPerPageOptions={[5, 10, 25]}
//         />
//       </Card>
//     );
//   };

//   SummaryReportResults.propTypes = {
//     SummaryReport: PropTypes.array.isRequired
//   };

//   export default SummaryReportResults;


import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import axios from "axios";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  Button,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import { Link, Route } from 'react-router-dom';

const LeaveResults = ({ Leave, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([])

  let manager_ID = localStorage.getItem('managerid');
  manager_ID = JSON.parse(manager_ID)
  console.log(manager_ID);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/getleave', {
        params: {
          manager_ID: manager_ID,
        }
      });
      setSelectedCustomerIds(response.data);
      console.log(response.data);
    };
    fetchData();
  }, [manager_ID]);


  const addstatus = (status, leave_ID) => {
    console.log(status);
    axios.put("http://localhost:3001/addstatus",
      { status: status, leave_ID: leave_ID }).then(
        (response) => {
          window.location.reload();
          // this.setState({});
         }
      )
  };


  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);


  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  // constructor = () => {
  // this.state.Date().toLocaleString();
  // };
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell> Medical Rep Name</TableCell>
                <TableCell>Leave Type</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                {/* <TableCell>Date</TableCell> */}
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedCustomerIds.slice(0, limit).map((customer) => {
                const dt = new Date(customer.start_Date);
                const year = dt.getFullYear() + '/';
                const month = ('0' + (dt.getMonth() + 1)).slice(-2) + '/';
                const day = ('0' + dt.getDate()).slice(-2);
                const dtt = new Date(customer.end_Date);
                const yearr = dtt.getFullYear() + '/';
                const monthr = ('0' + (dtt.getMonth() + 1)).slice(-2) + '/';
                const dayr = ('0' + dtt.getDate()).slice(-2);
                return (
                  <TableRow
                    hover
                  // key={customer.task_id}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Typography
                          color="textPrimary"
                          variant="body1"
                        >
                          {customer.repname}

                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{customer.leave_Type}</TableCell>
                    <TableCell>{year + month + day}</TableCell>
                    <TableCell>{yearr + monthr + dayr}</TableCell>
                    {/* <TableCell>{customer.date}</TableCell> */}
                    <TableCell align="center">
                      <Link to={`/appp/LeaveInfo/${customer.leave_ID}`}  >
                        <Button
                          color="primary"
                          variant="contained">
                          View
                        </Button>
                      </Link>
                      {'   '}
                      <Link to={`/appp/LeaveComment/${customer.leave_ID}`}  >
                        <Button
                          color="primary"
                          variant="contained">
                          Add Comment
                        </Button>
                      </Link>
                      {' '}
                      <Button
                        color="primary"
                        variant="contained"
                        // onClick={addstatus("Accept", customer.leave_ID)}
                        onClick={()=>{addstatus("1", customer.leave_ID)}} 
                        disabled={customer.status =="1"}>
                        Accept
                      </Button>
                      {' '}
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={()=>{addstatus("0", customer.leave_ID)}} 
                        disabled={customer.status =="0"} >
                        Reject 
                      </Button>
                      {' '}

                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={Leave.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

LeaveResults.propTypes = {
  Leave: PropTypes.array.isRequired
};

export default LeaveResults;

