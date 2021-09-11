import jsPDF from "jspdf";
const generatePDF = tasks => {
    const doc = new jsPDF();
    const tableColumn3 = ["Task ID", "Title", "Location", "Session", "Date", "Description", "Task Type", "Rep Note", "Manager ID", "Rep ID"] ;
    const tableRows3 = [];
    tasks.forEach(task => {
      const dt = new Date(task.date);
      const year = dt.getFullYear() + '/';
      const month = ('0' + (dt.getMonth() + 1)).slice(-2) + '/';
      const day = ('0' + dt.getDate()).slice(-2);
      const taskData = [
        task.task_id,
        task.title,
        task.location,
        task.session,
        year+month+day,
        task.description,
        task.type,
        task.rep_note,
        task.manager_ID,
        task.rep_ID
      ];
      tableRows3.push(taskData);
    });
  
    doc.autoTable(tableColumn3, tableRows3, { startY: 20 });
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    doc.text("Annual Task Report", 14, 15);
    doc.save(`report_${dateStr}.pdf`);
  };

export default generatePDF;