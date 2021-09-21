import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddBoxIcon from '@material-ui/icons/AddBox';
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
import { Link } from 'react-router-dom';
import { Search as SearchIcon } from 'react-feather';
import { makeStyles } from '@material-ui/core/styles';
import back from '../images/back3.jpg';
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacyOutlined';

const ProductList = ({ rest,props} ) => {

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
      fontWeight: 'bold'
    },
  }));


  const classes = useStyles();

  const [selectedRowIds, setSelectedRowIds] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/viewproductlist', {
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

  const deleteProduct = (product_id) => {
    axios.get("http://localhost:3001/deleteproduct", {
      params: {
        product_id: product_id,
      }
    }).then((response) => {
      window.location.reload();
    })
  };

  const [searchTerm, setSearchTerm] = useState("");
  const path = require('path');

  return (
    <>
    <Helmet>
      <title>Products</title>
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
            marginLeft: '400px',
          }}
        >
          <view className={classes.view}> <LocalPharmacyIcon style={{ fontSize:"40px" }} /></view>
          <h1 style={{flex:3, flexWrap: 'wrap'}} className={classes.h1} >Products</h1>
          <Link to={'/app/Add_Product'}>
            <Button
              color="primary"
              variant="contained"
              startIcon={<AddBoxIcon />}
            >
              Add Product
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
                <TableCell align="center"><b>Image</b></TableCell> 
                <TableCell align="center"><b>Name</b></TableCell>
                <TableCell align="center"><b>Volume</b></TableCell>
                <TableCell align="center"><b>Price</b></TableCell>
                <TableCell align="center"><b>Description</b></TableCell>
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
                    val.product_id==searchTerm) {
                    return val
                  }
                }).map((Row) => {
                  return (
                    <TableRow
                      hover
                      key={Row.product_ID}
                    >
                      <TableCell align="center">{Row.product_id}</TableCell>
                    <TableCell align="center"><img style={{height:'100px',width:'100px'}} src= {`/${Row.display_photo}`} /></TableCell>
                      <TableCell align="center">{Row.name}</TableCell>
                      <TableCell align="center">{Row.volume}</TableCell>
                      <TableCell align="center">{Row.price}.00</TableCell>
                      <TableCell >{Row.description}</TableCell>
                       <TableCell align="center">
                        <Link to={`/app/Edit_Product/${Row.product_id}`}  >
                          <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            startIcon={<EditIcon />}>
                            Edit
                          </Button>
                        </Link>
                        </TableCell>
                        <TableCell align="center">
                        <Button onClick={() => { deleteProduct(Row.product_id) }} 
                          color="exit"
                          variant="contained"
                          size="small"
                          className={classes.button}
                          startIcon={<DeleteIcon />}>
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
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </>
    </Container>
    </Box>
  </>
  ); 
};

export default ProductList;
