import { Helmet } from 'react-helmet';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import axios from "axios";
import {
  Box,
  Card,
  Table,
  Button,
  CardContent,
  TextField,
  Container,
    InputAdornment,
    SvgIcon,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddCommentIcon from '@material-ui/icons/AddComment';
import back from '../images/back3.jpg';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { Search as SearchIcon } from 'react-feather';
import { makeStyles } from '@material-ui/core/styles';

const AllownsList = ({ rest, props }) => {

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',

    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: 'black',
    },
    formbox: {
      backgroundColor: 'gray',
      width: '60%',
      marginTop: '40px',
      marginLeft: '200px',
      height: 'full',
      boxShadow: "2px 2px 5px  2px #9E9E9E",
      padding: "2vh",
      borderRadius: "5px",
      align: 'center',
    },
    textfield: {
      backgroundColor: 'white',
      width: '100%',
      marginTop: '0px',
      marginLeft: '100px',
      height: '100%',
      // boxShadow: "2px 2px 5px  2px #9E9E9E",
      padding: "2vh",
      borderRadius: "5px",
    },
    // debutton:{
    //   backgroundColor: 'red',
    // },
    link: {
      // backgroundColor: '#5eb6b8',
      color: '#FFF',
    },
    h1: {
      //  backgroundColor: '#5eb6b8',
      //  color: '#0A6466',
      color: '#FFF',
      fontFamily: "Sans-serif",
    },
    view: {
      // backgroundColor: '#5eb6b8',
      //  color: '#0A6466',
      // marginTop: '7px',
      paddingRight:'10px',
      // fontSize:'100px',
      // color: '#0A6466',
      color: '#FFF',
      size:'200px',
    },
    backgroud: {
      backgroundColor: '#5eb6b8',
      backgroundImage: `url(${back})`
      //  color: '#0A6466',
      // marginTop: '7px',
      // paddingRight:'10px',
      // fontSize:'100px',
      // size:'200px',
    },
  }));

  const classes = useStyles();

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([])
  const [searchTerm, setSearchTerm] = useState("");

  let manager_ID = localStorage.getItem('managerid');
  manager_ID = JSON.parse(manager_ID)
  console.log(manager_ID);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/getexpense', {
        params: {
          manager_ID: manager_ID,
        }
      });
      setSelectedCustomerIds(response.data);
      console.log(response.data);
    };
    fetchData();
  }, [manager_ID]);


  const addstatus = (status, expense_ID) => {
    console.log(status);
    axios.post("http://localhost:3001/addexpensestatus",
      { status: status, expense_ID: expense_ID }).then(
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
return(
  <>
    <Helmet>
      <title>Data</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
      className={classes.backgroud}
    >
      <Container maxWidth={false}>
        <>
          <Box {...props}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '0px',
                marginLeft: '450px',
              }}
            >
              <view className={classes.view}> <ReceiptIcon style={{ fontSize: "40px" }} /></view>
              <h1 style={{ flex: 3, flexWrap: 'wrap' }} className={classes.h1}  >Expenses</h1>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Card>
                <CardContent>
                  <Box sx={{ maxWidth: 500 }}>
                    <TextField
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SvgIcon
                              fontSize="small"
                              color="action"
                            >
                              <SearchIcon />
                            </SvgIcon>
                          </InputAdornment>
                        )
                      }}
                      placeholder="Search Medical Rep Name OR Date"
                      onChange={(e) => { setSearchTerm(e.target.value); }}
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
          <Box sx={{ pt: 3 }}>
            <Card {...rest}>
              <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell> <b>Medical Rep Name</b></TableCell>
                        <TableCell><b>Expense Type</b></TableCell>
                        {/* <TableCell>Location</TableCell> */}
                        <TableCell><b>Amount</b></TableCell>
                        <TableCell><b>Date</b></TableCell>
                        <TableCell><b>Status</b></TableCell>
                        <TableCell align="center"><b>Action</b></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {selectedCustomerIds.slice(0, limit).filter(val => {
                        if (searchTerm === "") {
                          return val;
                        }
                        else if (
                          val.repname.toLowerCase().includes(searchTerm.toLowerCase())) {
                          return val
                        }
                        else if (
                          val.date.includes(searchTerm)) {
                          return val
                        }
                      }).map((customer) => {
                        const dt = new Date(customer.date);
                        const year = dt.getFullYear() + '/';
                        const month = ('0' + (dt.getMonth() + 1)).slice(-2) + '/';
                        const day = ('0' + dt.getDate()).slice(-2);
                        // const dtt = new Date(customer.end_Date);
                        // const yearr = dtt.getFullYear() + '/';
                        // const monthr = ('0' + (dtt.getMonth() + 1)).slice(-2) + '/';
                        // const dayr = ('0' + dtt.getDate()).slice(-2);
                        return (
                          <TableRow
                            hover
                          // key={customer.task_id}
                          >
                            <TableCell>
                              <Box
                                sx={{
                                  alignItems: 'center',
                                  display: 'flex',
                                  marginLeft:2
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
                            <TableCell>{customer.expense_type}</TableCell>
                            {/* <TableCell>{customer.location}</TableCell> */}
                            <TableCell>{customer.amount} /=</TableCell>
                            <TableCell>{year + month + day}</TableCell>
                            {/* <TableCell>{yearr + monthr + dayr}</TableCell> */}
                            <TableCell style = {{color:'blue' , fontWeight :'bold' }}>{customer.status}</TableCell>
                            <TableCell align="center">
                              <Link to={`/appp/AllownsInfo/${customer.expense_ID}`}  >
                                <Button
                                  color="primary"
                                  variant="contained"
                                  size="small"
                                  startIcon={<VisibilityIcon />}>
                                  View
                                </Button>
                              </Link>
                              {'   '}
                              <Link to={`/appp/AllownsComment/${customer.expense_ID}`}  >
                                <Button
                                  color="edit"
                                  variant="contained"
                                  size="small"
                                  startIcon={<AddCommentIcon />}>
                                  Add Reason
                                </Button>
                              </Link>
                              {' '}
                              <Button
                                color="primary"
                                variant="contained"
                                size="small"
                                // onClick={addstatus("Accept", customer.leave_ID)}
                                onClick={() => { addstatus("1", customer.expense_ID) }}
                                disabled={customer.status == "Accept" ||customer.status == "Rejected"}
                                startIcon={<CheckIcon />}>
                                Accept
                              </Button>
                              {' '}
                              <Button
                                color="exit"
                                variant="contained"
                                size="small"
                                onClick={() => { addstatus("2", customer.expense_ID) }}
                                disabled={customer.status == "Rejected" ||customer.status == "Accept"}
                                startIcon={<ClearIcon />}>
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
                count="6"
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </Card>
          </Box>
        </>

      </Container>
    </Box>
  </>
);
};
export default AllownsList;