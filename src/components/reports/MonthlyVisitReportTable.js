import React from "react";
// import { Link } from "react-router-dom";

const MonthlyVisitReportTable = ({ visits }) => {

  return (
    <div className="container">
      {visits.length === 0 ? (
        "You currently have no visits created"
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Report ID</th>
              <th scope="col">Visit Type</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {visits.map((visit) => {
              const dt = new Date(visit.date);
              const year = dt.getFullYear() + '/';
              const month = ('0' + (dt.getMonth() + 1)).slice(-2) + '/';
              const day = ('0' + dt.getDate()).slice(-2);
              return (
              <tr key={visit.report_id}>
                <td>{visit.report_id}</td>
                <td>{visit.visit_type}</td>
                <td>{year+month+day}</td>
              </tr>
                )
              })
            }
            
          </tbody>
        </table>
      )
    }
    </div>
  );
};

export default MonthlyVisitReportTable;