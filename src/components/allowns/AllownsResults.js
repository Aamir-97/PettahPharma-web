import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
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
    Button,
    Typography
} from '@material-ui/core';

import getInitials from 'src/utils/getInitials';
import { Link } from 'react-router-dom';

const AllownsResults = ({ Allowns, ...rest }) => {
    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
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
                    {/* <Link to={'/appp/ViewSummary'}> */}
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
                                        Expense Types
                                    </TableCell>
                                    <TableCell>
                                        Date
                                    </TableCell>
                                    {/* <TableCell>
                  Phone
                </TableCell> */}
                                    <TableCell>
                                    
                                    </TableCell>
                                    <TableCell>
                                     
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>

                                {Allowns.slice(0, limit).map((customer) => (

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
                                                {/* <Avatar
                                                    src={customer.avatarUrl}
                                                    sx={{ mr: 2 }}
                                                >
                                                    {getInitials(customer.doctor_name)}
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
                                            {customer.ExpenseTypes}
                                        </TableCell>
                                        <TableCell>
                                            {customer.date}
                                        </TableCell>
                                        <TableCell>
                                            
                                        </TableCell>
                                        <TableCell>
                                            
                                        </TableCell>
                                        <TableCell align="center"><IconButton aria-label="edit"><EditIcon /></IconButton></TableCell>
                                        <TableCell align="center"><IconButton color='Secondary'aria-label="delete"><DeleteIcon /></IconButton></TableCell>
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

                            </TableBody>

                        </Table>
                    {/* </Link> */}
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={Allowns.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
};

AllownsResults.propTypes = {
    Allowns: PropTypes.array.isRequired
};

export default AllownsResults;