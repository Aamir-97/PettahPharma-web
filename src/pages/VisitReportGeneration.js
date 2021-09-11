import jsPDF from "jspdf";
import "jspdf-autotable";
const generatePDF = visits => {
  const doc = new jsPDF();
  const tableColumn1 = ["ID", "Visit Type", "Location", "Date", "Avg Duration", "No of Samples", "Description",
    "Doctor", "Product"];
  const tableRows1 = [];
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