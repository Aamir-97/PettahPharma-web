import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import axios from "axios";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';

function CustomerListResults() {
  const [searchTerm,setSearchTerm]=useState("");
  const [employeeList,setEmployeeList]=useState([])
 useEffect(()=>{
   axios.get("http://localhost:3001/view").then((response)=>{
     setEmployeeList(response.data)
   })
 },[])

 const deleteEmployee =(manager_ID)=>{
  axios.delete(`http://localhost:3001/delete/${manager_ID}`);
}

const viewEmployee =(manager_ID)=>{
  axios.get(`http://localhost:3001/view/${manager_ID}`);
}

const updateEmployee =(manager_ID)=>{
  axios.put("http://localhost:3001/update/${manager_ID}");
}


  // const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  // const [limit, setLimit] = useState(10);
  // const [page, setPage] = useState(0);

  // const handleSelectAll = (event) => {
  //   let newSelectedCustomerIds;

  //   if (event.target.checked) {
  //     newSelectedCustomerIds = Employee.map((customer) => customer.id);
  //   } else {
  //     newSelectedCustomerIds = [];
  //   }

  //   setSelectedCustomerIds(newSelectedCustomerIds);
  // };

  // const handleSelectOne = (event, id) => {
  //   const selectedIndex = selectedCustomerIds.indexOf(id);
  //   let newSelectedCustomerIds = [];

  //   if (selectedIndex === -1) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
  //   } else if (selectedIndex === 0) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
  //   } else if (selectedIndex === selectedCustomerIds.length - 1) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(
  //       selectedCustomerIds.slice(0, selectedIndex),
  //       selectedCustomerIds.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelectedCustomerIds(newSelectedCustomerIds);
  // };

  // const handleLimitChange = (event) => {
  //   setLimit(event.target.value);
  // };

  // const handlePageChange = (event, newPage) => {
  //   setPage(newPage);
  // };

  return (
    // <Card {...rest}>
    //   <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === Employee.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < Employee.length
                    }
                    onChange={handleSelectAll}
                  /> */}
                {/* </TableCell> */}
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Area
                </TableCell>
                <TableCell colspan={2}> 
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {customers.slice(0, limit).map((customer) => ( */}
                <TableRow
                  // hover
                  // key={customer.id}
                  // selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    {/* <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                    /> */}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      {/* <Avatar
                        src={customer.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(customer.name)}
                      </Avatar> */}
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer.email}
                  </TableCell>
                  <TableCell>
                    {/* {`${customer.address.city}, ${customer.address.state}, ${customer.address.country}`} */}
                    {`${customer.phone}`}
                  </TableCell>
                  <TableCell>
                    {customer.area}
                  </TableCell>
                  <TableCell><IconButton aria-label="edit"><EditIcon /></IconButton>
                    {customer.action}
                  </TableCell>
                  <TableCell><IconButton aria-label="delete"><DeleteIcon /></IconButton>
                    {customer.action}
                  </TableCell>
                </TableRow>
              ))
            </TableBody>
          </Table>
        </Box>
      // {/* </PerfectScrollbar>
      // <TablePagination
      //   component="div"
      //   count={customers.length}
      //   onPageChange={handlePageChange}
      //   onRowsPerPageChange={handleLimitChange}
      //   page={page}
      //   rowsPerPage={limit}
      //   rowsPerPageOptions={[5, 10, 25]}
      // />
    // </Card> */}
  );
};
// CustomerListResults.propTypes = {
//   customers: PropTypes.array.isRequired
// };

export default CustomerListResults;
