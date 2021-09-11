import jsPDF from "jspdf";
const generatePDF = expenses => {
    const doc = new jsPDF();
    const tableColumn2 = ["Rep ID", "Expense ID", "Expense Type", "Location", "Bills", "Date", "Amount", "Description", "Salesmanager Comment"];
    const tableRows2 = [];
  
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
      ];
      tableRows2.push(expenseData);
    });
  
    doc.autoTable(tableColumn2, tableRows2, { startY: 20 });
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    doc.text("Annual Expense Report" , 14, 15);
    doc.save(`report_${dateStr}.pdf`);
  };

export default generatePDF;