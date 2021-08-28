// import moment from 'moment';
// import { v4 as uuid } from 'uuid';
// import PerfectScrollbar from 'react-perfect-scrollbar';
// import {
//   Box,
//   Button,
//   Card,
//   CardHeader,
//   Chip,
//   Divider,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   TableSortLabel,
//   Tooltip
// } from '@material-ui/core';
// import ArrowRightIcon from '@material-ui/icons/ArrowRight';

// // const [tasks,setTasks]=useState([])
// //   useEffect(()=>{
// //     axios.get("http://localhost:3001/tasks").then((response)=>{
// //       setTasks(response.data)
// //     })
// //   },[])

// // const arr=tasks.map(record=>record.month);
// // const cat=tasks.map(record=>record.count);

// const LatestTasks = (props) => (
//   <Card {...props}>
//     <CardHeader title="Latest Tasks" />
//     <Divider />
//     <PerfectScrollbar>
//       <Box sx={{ minWidth: 800 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>
//                 Task ID
//               </TableCell>
//               <TableCell>
//                 Title
//               </TableCell>
//               <TableCell sortDirection="desc">
//                 <Tooltip
//                   enterDelay={300}
//                   title="Sort"
//                 >
//                   <TableSortLabel
//                     active
//                     direction="desc"
//                   >
//                     Date
//                   </TableSortLabel>
//                 </Tooltip>
//               </TableCell>
//               <TableCell>
//                 Status
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {orders.map((order) => (
//               <TableRow
//                 hover
//                 key={order.id}
//               >
//                 <TableCell>
//                   {order.ref}
//                 </TableCell>
//                 <TableCell>
//                   {order.customer.name}
//                 </TableCell>
//                 <TableCell>
//                   {moment(order.createdAt).format('DD/MM/YYYY')}
//                 </TableCell>
//                 <TableCell>
//                   <Chip
//                     color="primary"
//                     label={order.status}
//                     size="small"
//                   />
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Box>
//     </PerfectScrollbar>
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'flex-end',
//         p: 2
//       }}
//     >
//       <Button
//         color="primary"
//         endIcon={<ArrowRightIcon />}
//         size="small"
//         variant="text"
//       >
//         View all
//       </Button>
//     </Box>
//   </Card>
// );

// export default LatestTasks;
