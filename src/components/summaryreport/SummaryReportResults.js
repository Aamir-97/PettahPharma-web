import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
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
import { Link } from 'react-router-dom';

const SummaryReportResults = ({ SummaryReport, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  // const handleSelectAll = (event) => {
  //   let newSelectedCustomerIds;

  //   if (event.target.checked) {
  //     newSelectedCustomerIds = SummaryReport.map((customer) => customer.id);
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

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // const handleRoute = () =>{ 
  //   history.push("'/appp/AsignTask'}");
  // }
  // function Home() {
  //   const history = useHistory();

  //   const handleRoute = () =>{ 
  //     history.push("/appp/AsignTask");
  //   }
  

    return (
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Link to={'/appp/ViewSummary'}>
            <Table>
              <TableHead>
                <TableRow onChange={handlePageChange}>

                  {/* <TableCell padding="checkbox"> */}
                    {/* <Checkbox
                      checked={selectedCustomerIds.length === SummaryReport.length}
                      color="primary"
                      indeterminate={
                        selectedCustomerIds.length > 0
                        && selectedCustomerIds.length < SummaryReport.length
                      }
                      onChange={handleSelectAll}
                    /> */}
                    
                  {/* </TableCell> */}
                  <TableCell>
                    Employee Name
                  </TableCell>
                  <TableCell>
                    Location
                  </TableCell>
                  <TableCell>
                    Visit Type
                  </TableCell>
                  {/* <TableCell>
                  Phone
                </TableCell> */}
                  <TableCell>
                    Date
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {/* <Link to={'/appp/AsignTask'}>  */}
                {SummaryReport.slice(0, limit).map((customer) => (
                  // <Link to={'/appp/AsignTask'}> 
                  <TableRow
                    hover
                    key={customer.id}
                    selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                  >

                    {/* <TableCell padding="checkbox"> */}
                      {/* <Checkbox
                        checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                        onChange={(event) => handleSelectOne(event, customer.id)}
                        value="true"
                      /> */}
                      {/* <Link to={'/appp/AsignTask'}></Link> */}
                      {/* <Link to={'/appp/AsignTask'}></Link> */}
                    {/* </TableCell> */}

                    <TableCell>

                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Avatar
                          src={customer.avatarUrl}
                          sx={{ mr: 2 }}
                        >
                          {getInitials(customer.doctor_name)}
                        </Avatar>
                        <Typography
                          color="textPrimary"
                          variant="body1"
                        >
                          {customer.doctor_name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {customer.location}
                    </TableCell>
                    <TableCell>
                      {customer.visittype}
                    </TableCell>
                    <TableCell>
                      {customer.date}
                    </TableCell>
                    {/* <TableCell>
                    {`${customer.address.city}, ${customer.address.state}, ${customer.address.country}`}
                    {`${customer.address.city}`}
                  </TableCell>
                  <TableCell>
                    {customer.phone}
                  </TableCell>
                  <TableCell>
                    {customer.price}
                  </TableCell> */}

                  </TableRow>

                ))}
                {/* </Link> */}
              </TableBody>

            </Table>
            </Link>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={SummaryReport.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    );
  };

  SummaryReportResults.propTypes = {
    SummaryReport: PropTypes.array.isRequired
  };

  export default SummaryReportResults;
