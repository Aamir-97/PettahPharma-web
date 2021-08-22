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
  Typography,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import { Link, Route } from 'react-router-dom';
import { Search as SearchIcon } from 'react-feather';
import { makeStyles } from '@material-ui/core/styles';

const ManagerListResults = ({ Manager, rest, props }) => {

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
  }));
  const classes = useStyles();

  const [selectedrowIds, setSelectedrowIds] = useState([])

  let admin_ID = localStorage.getItem('admin_ID');
  admin_ID = JSON.parse(admin_ID)
  console.log(admin_ID);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/viewmanager', {
        params: {
            admin_ID: admin_ID,
        }
      });
      setSelectedrowIds(response.data);
      console.log(response.data);
    };
    fetchData();
  }, [admin_ID]);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedrowIds;
    if (event.target.checked) {
      newSelectedrowIds = Manager.map((row) => row.id);
    } else {
      newSelectedrowIds = [];
    }
    setSelectedrowIds(newSelectedrowIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedrowIds.indexOf(id);
    let newSelectedrowIds = [];
    if (selectedIndex === -1) {
      newSelectedrowIds = newSelectedrowIds.concat(selectedrowIds, id);
    } else if (selectedIndex === 0) {
      newSelectedrowIds = newSelectedrowIds.concat(selectedrowIds.slice(1));
    } else if (selectedIndex === selectedrowIds.length - 1) {
      newSelectedrowIds = newSelectedrowIds.concat(selectedrowIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedrowIds = newSelectedrowIds.concat(
        selectedrowIds.slice(0, selectedIndex),
        selectedrowIds.slice(selectedIndex + 1)
      );
    }
    setSelectedrowIds(newSelectedrowIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
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
      <Box {...props}>
        <Box
          sx={{
            display: 'flex',
            // justifyContent: 'flex-end',
            mt: 3,
            flex: 3
          }}
        >
          <h1 style={{flex:3, flexWrap: 'wrap'}} >TASK</h1>
          <Link to={'/app/Add_Salesmanager.js'}>
            <Button
              color="primary"
              variant="contained"
            >
              Add Salesmanager
            </Button>
          </Link>

        </Box>
        <Box sx={{ mt: 3 }}
        >
          <Card>
            <CardContent>
              <Box sx={{ maxWidth: 500 }}>
                <TextField
                  // fullWidth
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
                  // alignItems="center"
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
                <TableCell align="center"><b>Manager Name</b></TableCell>
                <TableCell align="center"><b>Email</b></TableCell>
                <TableCell align="center"><b>Phone No</b></TableCell>
                <TableCell align="center"><b>Area</b></TableCell>
                <TableCell colSpan={3} align="center"><b>Action</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {selectedrowIds.slice(0, limit).map((row) => ( */}
                {selectedrowIds.slice(0, limit).filter(val => {
                  if (searchTerm === "") {
                    return val;
                  } else if (
                    val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                  }
                }).map((row) => {
                  return (
                    <TableRow
                      hover
                      key={row.manager_ID}
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
                            {row.name}

                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.phone_no}</TableCell>
                      <TableCell>{row.area}</TableCell>
                      <TableCell align="center">
                        <Link to={`/app/ManagerInfo/${row.manager_ID}`}  >
                          <Button
                            color="primary"
                            variant="contained">
                            View
                          </Button>
                        </Link>
                       </TableCell>
                       <TableCell>
                        <Link to={`/app/UpdateManager/${row.manager_ID}`}  >
                          <Button
                            color="primary"
                            variant="contained">
                            Edit
                          </Button>
                        </Link>
                        </TableCell>
                        <TableCell>
                        <Button onClick={() => { deleteManager(row.manager_ID) }} color="primary"
                          variant="contained">
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
        //   count={length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5,10,20 ]}
        />
      </Card>
    </>
  );
};

ManagerListResults.propTypes = {
  Manager: PropTypes.array.isRequired
};

export default ManagerListResults;
