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


const AnnualTaskReportTable = ({ tasks }) => {

  const classes = useStyles();

  return (
    <div >
    <Box>
      {tasks.length === 0 ? (
        "You currently have no tasks created"
      ) : (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.thead} >
          <TableRow>
              <TableCell scope="col">Task ID</TableCell>
              <TableCell scope="col">Title</TableCell>
              <TableCell scope="col">Location</TableCell>
              {/* <TableCell scope="col">Session</TableCell> */}
              <TableCell scope="col">Date</TableCell>
              {/* <TableCell scope="col">Description</TableCell> */}
              <TableCell scope="col">Task Type</TableCell>
              {/* <TableCell scope="col">Rep Note</TableCell>
              <TableCell scope="col">Manager ID</TableCell>
              <TableCell scope="col">Rep ID</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody className={classes.tbody} >
            {tasks.map((task) => {
              const dt = new Date(task.date);
              const year = dt.getFullYear() + '/';
              const month = ('0' + (dt.getMonth() + 1)).slice(-2) + '/';
              const day = ('0' + dt.getDate()).slice(-2);
              return (
              <TableRow  key={task.task_id}>
                <TableCell>{task.task_id}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.location}</TableCell>
                {/* <TableCell>{task.session}</TableCell> */}
                <TableCell>{year+month+day}</TableCell>
                {/* <TableCell>{task.description}</TableCell> */}
                <TableCell>{task.type}</TableCell>
                {/* <TableCell>{task.rep_note}</TableCell>
                <TableCell>{task.manager_ID}</TableCell>
                <TableCell>{task.rep_ID}</TableCell> */}
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

export default AnnualTaskReportTable;