const express = require('express')
const app = express();
const mysql = require('mysql');
const cors = require('cors');
// const dotenv = require('dotenv');
const path = require('path');
const fileUpload = require('express-fileupload');
const nodemailer = require('nodemailer');
require('dotenv').config();
const hbs = require('nodemailer-express-handlebars');
const sendMail = require('./mail');
// const multer = require('multer');
// const { name } = require('ejs');
// const bcrypt = require('bcrypt'); 
// const bodyParser =  require('body-parser')
// const saltRounds = 10;
// const fileUpload = require('express-fileupload');
app.use(cors());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

app.use(
    fileUpload({
      useTempFiles: true,
      safeFileNames: true,
      preserveExtension: true,
      tempFileDir: `${__dirname}/public/files/temp`
    })
  );

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "pettahpharma",
    multipleStatements:true
}); 

db.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Database Connected...');
    }
});

const publicDirectory = path.join(__dirname, './public')
console.log(__dirname);
app.set("view engine", "hbs");

// app.get('/',(_req,res)=>{
//             //res.send("<h1>Pettah Pharma - Web App</h1>");
//             res.render("../../src/pages/Login")
//         })
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

transporter.use('compile', hbs({
    viewEngine: 'express-handlebars',
    viewPath: '.'
}));

let mailOptions = {
    from: 'mamadhu1219@gmail.com',
    to: 'madhushadavidmathivannan@gmail.com',
    // cc: 'msaamirali123@gmail.com',
    subject: 'Password for PettahPharma',
    text: 'This is your password',
    template: 'main'
};

transporter.sendMail(mailOptions, function(err,data){
    if (err){
        console.log('Error Occurs',err);
    } else {
        console.log('Email Sent');
    }
});

app.post('/email', (req, res) => {
    const { subject, email, text } = req.body;
    log('Data: ', req.body);

    sendMail(email, subject, text, function(err, data) {
        if (err) {
            log('ERROR: ', err);
            return res.status(500).json({ message: err.message || 'Internal Error' });
        }
        log('Email sent!!!');
        return res.json({ message: 'Email sent!!!!!' });
    });
});

app.get('/email/sent', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'emailMessage.html'));
});

app.get('/getManagerid', (req, res) => {
    db.query('SELECT * FROM salesmanager WHERE email=? AND password=?', [req.query.email, req.query.password], (err, result) => {
        // res.send(result);
        // console.log(result);
        if (err) {
            console.log("error");
            console.log('nnnnn');
        } else {
            res.send(result);
            console.log(result);
            console.log('bdnbbb');
        }
    })
})

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;


    db.query("SELECT * FROM salesmanager WHERE email=? AND password=?",
        [email, password], (err, result) => {
            if (result.length > 0) {
                res.send({ message1: "Login salesmanager" });

            }
        });

    db.query("SELECT * FROM admin WHERE email=? AND password=?",
        [email, password], (err, result) => {
            if (result.length > 0) {
                res.send({ message2: "Login admin" });
            }
        });
});


app.get('/getid', (req, res) => {
    console.log(req.query.email);
    console.log(req.query.password);
    db.query('SELECT manager_ID FROM salesmanager WHERE email=? AND password=?',
        [req.query.email, req.query.password], (err, result) => {

            res.send(result);
            console.log(result);

        })
});

app.post('/createadmin', (req, res) => {
    console.log(req.body)
    const display_photo = req.body.display_photo;
    const name = req.body.name;
    const contact_no =req.body.contact_no;
    const email = req.body.email;
    const password = req.body.password;

    db.query("INSERT INTO admin (display_photo,name,contact_no,email,password) VALUES (?,?,?,?,?)",
        [display_photo,name,contact_no,email, password], (err, _results) => {
            if (err) {
                console.log(err);
            } else {
                res.send("admin created");
            }
        });

});

app.get('/adminprofile',(_req,res)=>{
    db.query('SELECT * FROM admin ',(err,result,_fields)=>{
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
});  
    // db.query("SELECT * FROM admin WHERE email=? AND password=?",
    //     [email,password],(err,result)=>{
    //         if(err){
    //             res.send({err:err})
    //         }
    //           if(result.length > 0){
    //             res.send({message1 : "Login Successful" });
    //           } else{
    //             res.send({message2 : "Wrong Username Or password"});
    //         }
    // });

app.post('/createmanager', (req, res) => {
    console.log(req.body)
    const manager_ID = req.body.manager_ID;
    const name = req.body.name;
    // const display_photo = req.body.display_photo;
    const email = req.body.email;
    const phone_no = req.body.phone_no;
    const area = req.body.area;
    const password = req.body.password;

    db.query("INSERT INTO salesmanager (manager_ID,name,email,phone_no,area,password) VALUES (?,?,?,?,?,?)",
        [manager_ID, name, email, phone_no, area, password], (err, _results) => {
            if (err) {
                console.log(err);
            } else {
                res.send("sales manager created");
            }

        });

});
     
app.get('/viewmanagerlist',(_req,res)=>{
    db.query('SELECT * FROM salesmanager ',(err,result,_fields)=>{
        if(!err){
            res.send(result);
        } else {
            console.log(err);
        }
    });
});

app.get("/deletemanager", (req, res) => {
    const manager_ID = req.query.manager_ID;
    db.query("DELETE FROM salesmanager WHERE manager_ID=?",
        [manager_ID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }

    );
});

app.put('/updatemanager', (req, res) => {
    const manager_ID = req.body.manager_ID;
    const name = req.body.name;
    // const display_photo = req.body.display_photo;
    const email = req.body.email;
    const phone_no = req.body.phone_no;
    const area = req.body.area;
    // console.log(manager_ID,name,email,phone_no,area)

    db.query("UPDATE salesmanager SET name = ?, email = ?,phone_no = ?,area = ? WHERE manager_ID=?",
        [name, email, phone_no, area, manager_ID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get('/viewmanager', (req, res) => {
    db.query("SELECT name,email,phone_no,area FROM salesmanager WHERE manager_ID = ? ", [req.query.manager_ID], (err, result) => {
        res.send(result);
        console.log(result);
    })
})
 
app.post('/createproduct', (req, res) => {
    console.log(req.body)
    const product_id = req.body.product_id;
    const display_photo= req.body.display_photo;
    const name = req.body.name;
    const volume = req.body.volume;
    const price = req.body.price;
    const description = req.body.description;
     
    db.query("INSERT INTO product (product_id,display_photo,name,volume,price,description) VALUES (?,?,?,?,?,?)",
    [product_id,display_photo,name,volume,price,description],(err,_results)=>{
        if(err){
            console.log(err);
        } else{
            res.send("product created");
        }
    });
});

app.put('/updateproduct', (req, res) => {
    const product_id = req.body.product_id;
    const display_photo= req.body.image;
    const name = req.body.name;
    const volume = req.body.volume;
    const price = req.body.price;
    const description = req.body.description;

    db.query("UPDATE product SET display_photo=?,name=?,volume=?,price=?,description=? WHERE product_id = ?", 
    [display_photo,name,volume,price,description,product_id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/viewproduct', (req, res) => {
    db.query("SELECT display_photo,name,volume,price,description FROM product WHERE product_id = ? ", [req.query.product_id], (err, result) => {
        res.send(result);
        console.log(result);
    })
})

app.get('/viewproductlist',(_req,res)=>{
    db.query('SELECT * FROM product ',(err,result,_fields)=>{
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
});
  
app.get("/deleteproduct", (req, res) => {
    const product_id = req.query.product_id;
    db.query("DELETE FROM product WHERE product_id=?",
        [product_id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }

    );
});
 
app.post('/createmedicalrep', (req, res) => {
    console.log(req.body)
    const rep_ID = req.body.rep_ID;
    const name = req.body.name;
    // const display_photo=req.body.display_photo;
    const email = req.body.email;
    const phone_no = req.body.phone_no;
    const area = req.body.area;
    // const rating = req.body.rating;
    const password = req.body.password;
    const manager_ID = req.body.manager_ID;


    db.query("INSERT INTO medicalrep (rep_ID,name,email,phone_no,area,password,manager_ID) VALUES (?,?,?,?,?,?,?)",
    [rep_ID,name,email,phone_no,area,password,manager_ID],(err,_results)=>{
        if(err){
            console.log(err);
        } else{
            res.send("medical rep created");
        }
    });  
});

app.get('/viewmedicalreplist',(_req,res)=>{
    db.query('SELECT * FROM medicalrep ',(err,result,_fields)=>{
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
});

app.get('/viewmedicalrep', (req, res) => {
    db.query("SELECT name,email,phone_no,area,rating FROM medicalrep WHERE rep_ID = ? ", [req.query.rep_ID], (err, result) => {
        res.send(result);
        console.log(result);
    })
})

app.get("/deletemedicalrep", (req, res) => {
    const rep_ID = req.query.rep_ID;
    db.query("DELETE FROM medicalrep WHERE rep_ID=?",
        [rep_ID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }

    );
});
 
app.put('/updatemedicalrep', (req, res) => {
    const rep_ID = req.body.rep_ID;
    const name = req.body.name;
    // const display_photo = req.body.image;
    const email = req.body.email;
    const phone_no = req.body.phone_no;
    const area = req.body.area;
    // const rating = req.body.rating;
    // const manager_ID = req.body.manager_ID;

    db.query('UPDATE medicalrep SET name = ?, email = ?, phone_no = ?, area = ? WHERE rep_ID=?',
        [name, email, phone_no, area, rep_ID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get('/gettask', (req, res) => {
    db.query('SELECT medicalrep.name,task.type,task.title,task.date,task.session,task.task_id FROM medicalrep INNER JOIN task ON medicalrep.rep_ID = task.rep_ID WHERE task.manager_ID = ? ORDER BY date DESC', [req.query.manager_ID], (err, result, fields) => {
        if (!err) {
            res.send(result);
            console.log(result);
        }
        else
            console.log(err);
    })
})

app.get('/viewtask', (req, res) => {
    db.query('SELECT medicalrep.name,task.type,task.title,task.location,task.date,task.session,task.description,task.rep_note,task.status,task.task_id,task.task_id,task.rep_ID FROM medicalrep INNER JOIN task ON medicalrep.rep_ID = task.rep_ID WHERE task.manager_ID = ? AND task.task_id=?', [req.query.manager_ID, req.query.task_id], (err, result) => {
        res.send(result);
        console.log(result);
    })
})

app.put('/update', (req, res) => {
    const rep_ID = req.body.rep_ID;
    const type = req.body.type;
    const title = req.body.title;
    const location = req.body.location;
    const date = req.body.date;
    const session = req.body.session;
    const description = req.body.description;
    const task_id = req.body.task_id;
    const manager_ID = req.body.manager_ID;

    db.query("UPDATE task SET rep_ID = ?,type = ?,title = ?,location = ?,date = ?,session = ?,description = ? WHERE task_id = ? AND manager_ID=?",
        [rep_ID, type, title, location, date, session, description, task_id, manager_ID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get('/getmanagername', (req, res) => {
    db.query('SELECT name FROM salesmanager WHERE  manager_ID=?', [req.query.manager_ID], (err, result) => {
        res.send(result);
        console.log(result);
    })
})

app.get('/getmanager', (req, res) => {
    db.query('SELECT name,manager_ID FROM salesmanager', [req.query.manager_ID], (err, result) => {
        res.send(result);
        console.log(result);
    })
})

app.get('/managerCount',(req,res) => {
    console.log(req.body)
    
    db.query('SELECT COUNT(manager_ID) AS count FROM salesmanager', (err, result) => {
    if(!err){
        res.send(result);
    }else{
        console.log(err);
    }
    });
});

app.get('/repCount',(req,res) => {
    console.log(req.body)
    
    db.query('SELECT COUNT(rep_ID) AS count FROM medicalrep', (err, result) => {
    if(!err){
        res.send(result);
    }else{
        console.log(err);
    }
    });
});

app.get('/employeeCount',(req,res) => {
    console.log(req.body)

    db.query('SELECT SUM(tbl.count) AS totalcount FROM (SELECT COUNT(manager_ID) AS count FROM salesmanager UNION ALL SELECT COUNT(rep_ID) AS count FROM medicalrep)tbl',(err, result) => {
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
});

app.post('/assigntask', (req, res) => {
    const rep_ID = req.body.rep_ID;
    const title = req.body.title;
    const type = req.body.type;
    const description = req.body.description;
    const session = req.body.session;
    const date = req.body.date;
    const location = req.body.location;
    const manager_ID = req.body.manager_ID;

    db.query("INSERT INTO task (rep_ID,title,type,description,session,date,manager_ID,location) VALUES (?,?,?,?,?,?,?,?)",
        [rep_ID, title, type, description, session, date, manager_ID, location], (err, _results) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Assign task");
            }
    });
});

app.get('/productCount',(req,res) => {
        console.log(req.body)
    
        db.query('SELECT COUNT(product_id) AS count FROM product', (err, result) => {
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
});

app.get('/expenseCount',(req,res) => {
    console.log(req.body)

    db.query('SELECT COUNT(expense_ID) AS count FROM expenses', (err, result) => {
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
});

app.get('/totalExpenses',(req,res) => {
    console.log(req.body)

    db.query('SELECT SUM(CAST(amount AS DECIMAL(10,2))) AS totalexpense FROM expenses WHERE status=1',(err, result) => {
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
});

app.get('/visitCount',(req,res) => {
    console.log(req.body)

    db.query('SELECT COUNT(report_ID) AS count FROM visit_summary_report', (err, result) => {
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
});

app.post('/upload', function(req, res) {
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/somewhere/on/your/server/' + sampleFile.name;
  
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
  
      res.send('File uploaded!');
    });
  });

// app.put("/update/:manager_ID",(req,res)=>{
//     const manager_ID = req.body.manager_ID;
//     const area = req.body.area;
  
//     db.query('UPDATE salesmanager SET area=? WHERE manager_ID=?',[area,manager_ID],(err,result)=>{
//         if(!err){
//             res.send(result);
//         }else{
//         console.log(err);
//         }
//     });
// });



app.get('/getrep', (req, res) => {
    db.query('SELECT name,rep_ID FROM medicalrep WHERE  manager_ID=?', [req.query.manager_ID], (err, result) => {
        res.send(result);
        console.log(result);

    })
})

app.get("/delete", (req, res) => {
    const task_id = req.query.task_id;
    db.query("DELETE FROM task WHERE task_id=?",
        [task_id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }

    );
});

app.get('/getsummary',(req,res)=>{
    db.query('SELECT visit_summary_report.report_id,visit_summary_report.visit_type,visit_summary_report.date,visit_summary_report.avg_duration,doctor_details.name AS doctorname,medicalrep.name FROM visit_summary_report INNER JOIN doctor_details ON visit_summary_report.doctor_id = doctor_details.doctor_id INNER JOIN medicalrep ON visit_summary_report.rep_ID = medicalrep.rep_ID WHERE visit_summary_report.manager_ID = ? ORDER BY visit_summary_report.date DESC', [req.query.manager_ID],(err,result,fields)=>{
        if(!err){
            res.send(result);
            console.log(result);
        }
        else
        console.log(err);
    })
})

app.get('/viewsummary', (req, res) => {
    db.query('SELECT visit_summary_report.no_of_sample,visit_summary_report.description,visit_summary_report.manager_comment,visit_summary_report.report_id,visit_summary_report.visit_type,visit_summary_report.date,visit_summary_report.avg_duration,doctor_details.name AS doctorname,medicalrep.name AS repname,product.name AS proname FROM visit_summary_report INNER JOIN doctor_details ON visit_summary_report.doctor_id = doctor_details.doctor_id INNER JOIN medicalrep ON visit_summary_report.rep_ID = medicalrep.rep_ID INNER JOIN product ON visit_summary_report.product_id = product.product_id WHERE visit_summary_report.manager_ID = ? AND visit_summary_report.report_id = ?', [req.query.manager_ID, req.query.report_id], (err, result) => {
        res.send(result);
        console.log(result);
    })
})

app.get("/deletesummary", (req, res) => {
    const report_id = req.query.report_id;
    db.query("DELETE FROM visit_summary_report WHERE report_id=?",
        [report_id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }

    );
});

app.put('/addcomment', (req, res) => {
    const report_id = req.body.report_id;
    const manager_comment = req.body.manager_comment;

    db.query("UPDATE visit_summary_report SET manager_comment = ? WHERE  report_id=?",
        [manager_comment,report_id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});


app.get('/getleave',(req,res)=>{
    db.query('SELECT leaves.leave_ID,leaves.leave_Type,leaves.start_Date,leaves.end_Date,medicalrep.name AS repname FROM medicalrep INNER JOIN leaves ON medicalrep.rep_ID = leaves.rep_ID WHERE medicalrep.manager_ID = ?', [req.query.manager_ID],(err,result,fields)=>{
        if(!err){
            res.send(result);
            console.log(result);
        }
        else
        console.log(err);
    })
})

app.get('/viewLeave',(req,res)=>{
    db.query('SELECT leaves.leave_ID,leaves.leave_Type,leaves.start_Date,leaves.end_Date,leaves.description,leaves.salesmanager_comment,medicalrep.name AS repname FROM leaves INNER JOIN medicalrep ON leaves.rep_ID = medicalrep.rep_ID WHERE leaves.leave_ID = ?', [req.query.leave_ID],(err,result,fields)=>{
        if(!err){
            res.send(result);
            console.log(result);
        }
        else
        console.log(err);
    })
});

app.put('/addleavecomment', (req, res) => {
    const leave_ID = req.body.leave_ID;
    const salesmanager_comment = req.body.salesmanager_comment;

    db.query("UPDATE leaves SET salesmanager_comment = ? WHERE  leave_ID=?",
        [salesmanager_comment,leave_ID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});

app.get('/taskanalysis',(req,res) => {
    db.query('SELECT EXTRACT(MONTH FROM date) AS month, COUNT(task_id) AS count FROM task WHERE status="Complete" GROUP BY month', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
            // console.log(result);
        }
    });
});

app.get('/completeTaskCount',(req,res) => {
    console.log(req.body)

    db.query('SELECT COUNT(task_id) AS count FROM task WHERE status="Complete"', (err, result) => {
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
});
 
app.get('/pendingTaskCount',(req,res) => {
    console.log(req.body)

    db.query('SELECT COUNT(task_id) AS count FROM task WHERE status="Pending"', (err, result) => {
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
});

app.get('/rejectTaskCount',(req,res) => {
    console.log(req.body)

    db.query('SELECT COUNT(task_id) AS count FROM task WHERE status="Reject"', (err, result) => {
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
});
 
app.get('/visitanalysis',(req,res) => {
    db.query('SELECT EXTRACT(MONTH FROM date) AS month, COUNT(report_id) AS count FROM visit_summary_report GROUP BY month', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
            // console.log(result);
        }
    });
});

app.get('/TaskReport',(req,res) => {
    db.query('SELECT task_id, title,location,date,description,re_note,manager_ID,rep_ID FROM task WHERE EXTRACT(MONTH FROM o_date) = MONTH(CURRENT_TIMESTAMP) AND status="Complete"', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);   
        }
    });
  });

app.listen(3001, () => {
    console.log("Your server is running on port 3001");
});