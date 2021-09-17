import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import axios from "axios";
import {
  Box,
  Card,
  Table,
  Container,
  Button,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Link } from 'react-router-dom';
import { Search as SearchIcon } from 'react-feather';
import { makeStyles } from '@material-ui/core/styles';
import back from '../images/back3.jpg';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';

const ManagerList = ({ rest,props} ) => {

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
      padding: "2vh",
      borderRadius: "5px",
    },
    button: {
      margin: theme.spacing(1),
    },
    backgroud: {
      backgroundColor: '#5eb6b8',
      backgroundImage: `url(${back})`,
    },
    view: {
      paddingRight:'10px',
      color: '#FFF',
      size:'200px',
    },
    h1: {
      fontFamily: "Sans-serif",
      color: '#FFF',
    },
  }));


  const classes = useStyles();
  const [selectedRowIds, setSelectedRowIds] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/viewmanagerlist', {
      });
      setSelectedRowIds(response.data);
      console.log(response.data);
    };
    fetchData();
  }, []);

  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const deleteManager = (manager_ID) => {
    axios.get("http://localhost:3001/deletemanager", {
      params: {
        manager_ID: manager_ID,
      }
    }).then((response) => {
      window.location.reload();
    })
  };

  const [searchTerm, setSearchTerm] = useState("");
  

  return (
    <>
    <Helmet>
      <title>Sales Managers</title>
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
            mt: 3,
            flex: 3,
            marginLeft: '350px',
          }}
        >
          <view className={classes.view}> <SupervisorAccountOutlinedIcon style={{ fontSize:"40px" }} /></view>
          <h1 style={{flex:3, flexWrap: 'wrap'}} className={classes.h1} > <b> Sales Managers </b></h1>
          <Link to={'/app/Add_Salesmanager'}>
            <Button
              color="primary"
              variant="contained"
              startIcon={<PersonAddIcon />}
            >
              Add Salesmanager
            </Button>
          </Link>

        </Box>
        <Box sx={{ mt: 3 }}
        >
          <Card>
            <CardContent>
              <Box sx={{ maxWidth: 1050 }}>
                <TextField
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
                  placeholder="Search"
                  variant="outlined"
                  onChange={(e) => { setSearchTerm(e.target.value); }}
                  className={classes.textfield}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <br />
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell align="center"><b>ID</b></TableCell>  
                <TableCell align="center"><b>Name</b></TableCell>
                <TableCell align="center"><b>Email</b></TableCell>
                <TableCell align="center"><b>Phone No</b></TableCell>
                <TableCell align="center"><b>Area</b></TableCell>
                <TableCell colSpan={2} align="center"><b>Action</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedRowIds.slice(0, limit).filter(val => {
                 if (searchTerm === "") {
                  return val;
                } 
                else if (
                  val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return val
                }
                else if (
                  val.manager_ID==searchTerm) {
                  return val
                }
                }).map((Row) => {
                  return (
                    <TableRow
                      hover
                      key={Row.manager_ID}
                    >
                      <TableCell align="center">{Row.manager_ID}</TableCell> 
                      <TableCell align="center">{Row.name}</TableCell>
                      <TableCell align="center">{Row.email}</TableCell>
                      <TableCell align="center">{Row.phone_no}</TableCell>
                      <TableCell align="center">{Row.area}</TableCell>
                       <TableCell align="center">
                        <Link to={`/app/Edit_Salesmanager/${Row.manager_ID}`}  >
                          <Button
                            color="primary"
                            size="small"
                            variant="contained"
                            className={classes.button}
                            startIcon={<EditIcon />}>
                            Edit
                          </Button>
                        </Link>
                        </TableCell>
                        <TableCell align="center">
                        <Button 
                          onClick={() => { deleteManager(Row.manager_ID) }} 
                          color="exit"
                          size="small"
                          variant="contained"
                          className={classes.button}
                          startIcon={<DeleteIcon />}
                          >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })
                }
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
            component="div"
            count={10}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleLimitChange}
            rowsPerPage={limit}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
      />
      </Card>
    </>
    </Container>
    </Box>
  </>
  ); 
};

export default ManagerList;
