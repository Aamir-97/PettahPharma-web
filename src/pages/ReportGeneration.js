import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const generatePDF = visits => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Report ID", "Visit Type", "Date"];
  // define an empty array of rows
  const tableRows = [];

  // for each visit pass all its data into an array
  visits.forEach(visit => {
    const dt = new Date(visit.date);
    const year = dt.getFullYear() + '/';
    const month = ('0' + (dt.getMonth() + 1)).slice(-2) + '/';
    const day = ('0' + dt.getDate()).slice(-2);
    const visitData = [
      visit.report_id,
      visit.visit_type,
      year+month+day,
      // called date-fns to format the date on the visit
      // format(new Date(visit.date), "yyyy-MM-dd","")
    ];
    // push each visit's info into a row
    tableRows.push(visitData);
  });

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // title and margin-top + margin-left
  doc.text("Summary Report", 14, 15);
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;