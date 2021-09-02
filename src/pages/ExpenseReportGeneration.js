import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";

const generatePDF = expenses => {
    // initialize jsPDF
    const doc = new jsPDF();
  
    // define the columns we want and their titles
    const tableColumn2 = ["Rep ID", "Expense ID", "Expense Type", "Location", "Bills", "Date", "Amount", "Description", "Salesmanager Comment"];
    // define an empty array of rows
    const tableRows2 = [];
  
    // for each visit pass all its data into an array
    expenses.forEach(expense => {
      const dt = new Date(expense.date);
      const year = dt.getFullYear() + '/';
      const month = ('0' + (dt.getMonth() + 1)).slice(-2) + '/';
      const day = ('0' + dt.getDate()).slice(-2);
      const expenseData = [
        expense.rep_ID,
        expense.expense_ID,
        expense.expense_Type,
        expense.location,
        expense.bills,
        year+month+day,
        expense.amount,
        expense.description,
        expense.salesmanager_comment
  
        // called date-fns to format the date on the visit
        // format(new Date(visit.date), "yyyy-MM-dd","")
      ];
      // push each visit's info into a row
      tableRows2.push(expenseData);
    });
  
    // startY is basically margin-top
    doc.autoTable(tableColumn2, tableRows2, { startY: 20 });
    const date = Date().split(" ");
    // const dt = new Date(date);
    // const year = dt.getFullYear();
    // we use a date string to generate our filename.
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    // title and margin-top + margin-left
    doc.text("Annual Expense Report" , 14, 15);
    // we define the name of our PDF file.
    doc.save(`report_${dateStr}.pdf`);
  };

export default generatePDF;