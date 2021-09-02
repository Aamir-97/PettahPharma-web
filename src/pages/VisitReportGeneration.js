import jsPDF from "jspdf";
import "jspdf-autotable";
// import autoTable from 'jspdf-autotable'
// Date Fns is used to format the dates we receive
// from our API call
// import jsPDF from 'jspdf/dist/jspdf.node.debug'
// import { applyPlugin } from 'jspdf-autotable'
// applyPlugin(jsPDF)
import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const generatePDF = visits => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn1 = ["ID", "Visit Type", "Location", "Date", "Avg Duration", "No of Samples", "Description",
    "Doctor", "Product"];
  // define an empty array of rows
  const tableRows1 = [];

  // for each visit pass all its data into an array
  visits.forEach(visit => {
    const dt = new Date(visit.date);
    const year = dt.getFullYear() + '/';
    const month = ('0' + (dt.getMonth() + 1)).slice(-2) + '/';
    const day = ('0' + dt.getDate()).slice(-2);
    const visitData = [
      visit.report_id,
      visit.visit_type,
      visit.location,
      year+month+day,
      visit.avg_duration,
      visit.no_of_sample,
      visit.description,
      visit.doctor_name,
      visit.product_name,
      // visit.rep_ID,
      // visit.manager_ID,
      // visit.manager_comment,

      // called date-fns to format the date on the visit
      // format(new Date(visit.date), "yyyy-MM-dd","")
    ];
    // push each visit's info into a row
    tableRows1.push(visitData);
  });

  // startY is basically margin-top
  doc.autoTable(tableColumn1, tableRows1, { startY: 20 });
  
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // title and margin-top + margin-left
  doc.text("Annual Visit Report", 14, 15);
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;