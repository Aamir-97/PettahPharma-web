import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
  Box
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  table: {
    border: '1px solid #009688',
    display: 'inline - block',
    padding: '10px 10px',
    margin: '2px 0',
    width: '100%',
    boxShadow: "2px 2px 5px  2px #9E9E9E",
  },
  tbody: {
    textalign: 'left',
    padding: '8px',
  },
  thead: {
    backgroundColor: '#80cbc4',
    textalign: 'left',
    padding: '8px',
  },
}));


const AnnualExpenseReportTable = ({ expenses }) => {

  const classes = useStyles();

  return (
    <div >
    <Box>
      {expenses.length === 0 ? (
        "You currently have no expenses created"
      ) : (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.thead}>
          <TableRow>
              <TableCell scope="col">Rep ID</TableCell>
              <TableCell scope="col">Expense ID</TableCell>
              <TableCell scope="col">Expense Type</TableCell>
              <TableCell scope="col">Date</TableCell>
              <TableCell scope="col">Amount</TableCell>
              <TableCell scope="col">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tbody}>
            {expenses.map((expense) => {
              const dt = new Date(expense.date);
              const year = dt.getFullYear() + '/';
              const month = ('0' + (dt.getMonth() + 1)).slice(-2) + '/';
              const day = ('0' + dt.getDate()).slice(-2);
              return (
              <TableRow  key={expense.expense_ID}>
                <TableCell>{expense.rep_ID}</TableCell>
                <TableCell>{expense.expense_ID}</TableCell>
                <TableCell>{expense.expense_Type}</TableCell>
                <TableCell>{year+month+day}</TableCell>
                <TableCell>{expense.amount}</TableCell>
                <TableCell>{expense.description}</TableCell>
              </TableRow >
                )
              })
            }
          </TableBody>
        </Table>
        </TableContainer>
      )
    }
    </Box>
    </div>
  );
};

export default AnnualExpenseReportTable;