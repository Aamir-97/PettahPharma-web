const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const nodemailer = require('nodemailer');
require('dotenv').config();
const hbs = require('nodemailer-express-handlebars');
app.use(cors({
    origin: true,
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static(__dirname + '/public'));  
app.use('/products', express.static('static/images/products')); 
app.use(express.json());


const db = mysql.createConnection({
    user : "admin",
    host : "pettahpharma-db.cjrpsgnfuucd.us-east-2.rds.amazonaws.com",
    password: "pharmadb2021",
    database: "pettahpharma",
    // user: "root",
    // host: "localhost",
    // password: "",
    // database: "pettahpharma",
    multipleStatements: true
});

app.listen(3001, () => {
    console.log("Your server is running on port 3001");
});

app.get ("/", (_req, res) => {
    res.send("Web Server is working Perfectly...!")
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
const imageDirectory = path.join(__dirname, '../public/')
console.log(__dirname);
app.set("view engine", "hbs");


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

app.get('/loginsal', (req, res) => {
    const email = req.query.email;
    const password = req.query.password;
    db.query("SELECT * FROM salesmanager WHERE email=? AND password=? ",
        [email,password], (err, result) => {


            if (result.length > 0) {


                res.send(result);

            }
            else {

                res.send({ message1: "Wrong email/password combination!" });
            }
        });
});

app.get('/loginadmin', (req, res) => {
    const email = req.query.email;
    const password = req.query.password;


    db.query("SELECT * FROM admin WHERE email=? AND password=?",
        [email, password], (err, result) => {
            if (result.length > 0) {

                res.send(result);
            }
            else {

                res.send({ message2: "Wrong email/password combination!" });
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
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    db.query("INSERT INTO admin (name,email,password) VALUES (?,?,?)",
        [name, email, password], (err, _results) => {
            if (err) {
                console.log(err);
            } else {
                res.send("admin created");
            }
    });
});

app.get('/adminprofile', (_req, res) => {
    db.query('SELECT * FROM admin ', (err, result, _fields) => {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
        }
    });
});

app.post('/updateadmin', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;


    db.query("UPDATE admin SET name = ?, email = ? ",
        [name, email],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.post('/createmanager', (req, res) => {
    console.log(req.body)
    const manager_ID = req.body.manager_ID;
    const name = req.body.name;
    const email = req.body.email;
    const phone_no = req.body.phone_no;
    const area = req.body.area;
    const password = req.body.password;
    const created_at = req.body.created_at

    let transport = nodemailer.createTransport(
        {
            service:'gmail',
            auth: {
                user: 'pettahpharma@gmail.com',
                pass:'MAdhu@1998'
            }
        }
    )

    const subject = 'Login Credentials';
    const message = `Dear ${name},
 

    Welcome to the team! We’re excited to have you at Pettah Pharmacy Private Limited. 
    We know you’re going to be a valuable asset to our company and can’t wait to see what you accomplish.
     
    You can login to our system by using your email : ${email} and your password : ${password}
                
    If you have any questions prior to your arrival, please feel free to email me and I’ll be more than happy to help you.
    
    We are looking forward to working with you and seeing you achieve great things!

    Best regards,
    Pettah Pharmacy Private Limited,
    pettahpharma@gmail.com`;
    
    let mailOptions = {
        from : 'pettahpharma@gmail.com',
        to: email,
        subject: subject,
        text: message
    }

    transport.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error)
        }
        else{
                db.query("INSERT INTO salesmanager (manager_ID,name,email,phone_no,area,password,created_at) VALUES (?,?,?,?,?,?,?)", 
                [manager_ID, name, email, phone_no, area, password, created_at], (err, _results) => {
                    if(err){
                        console.log(err)
                      }else{
                        res.send("sales manager created");
                      }
                })
        }
    })    
});

app.get('/viewmanagerlist', (_req, res) => {
    db.query('SELECT * FROM salesmanager ', (err, result, _fields) => {
        if (!err) {
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

app.post('/updatemanager', (req, res) => {
    const manager_ID = req.body.manager_ID;
    const name = req.body.name;
    const email = req.body.email;
    const phone_no = req.body.phone_no;
    const area = req.body.area;

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
    db.query("SELECT name,email,phone_no,area,display_photo FROM salesmanager WHERE manager_ID = ? ", [req.query.manager_ID], (err, result) => {
        res.send(result);
        console.log(result);
    })
})

const storage = multer.diskStorage({
    destination(req,file,cb){
      cb(null,'../public/')
    },
    filename(req,file,cb){
      cb(
        null,
        `${file.originalname}`
      )
    }
  })
   
  const upload = multer({
    storage,
    limits:{
      fileSize: 5000000
    },
    fileFilter(req,file,cb){
      if(!file.originalname.match(/\.(jpeg|jpg|png)$/i)){
        return  cb(new Error('please upload image with type of jpg or jpeg'))
    }
    cb(null,true)
  }
  })
  

app.post('/createproduct', (req, res) => {
    console.log(req.body)
    // const product_id = req.body.product_id;
    // const emp_img = req.body.emp_img;
    // const display_photo = imageDirectory + req.body.display_photo;
    const display_photo = req.body.display_photo;
    const name = req.body.name;
    const volume = req.body.volume;
    const price = req.body.price;
    const description = req.body.description;

    db.query("INSERT INTO product (display_photo,name,volume,price,description) VALUES (?,?,?,?,?)",
        [display_photo, name, volume, price, description], (err, _results) => {
            if (err) {
                console.log(err);
            } else {
                res.send("product created");
            }
        });
});

app.post('/updateproduct', (req, res) => {
    const product_id = req.body.product_id;
    const display_photo = req.body.display_photo;
    const name = req.body.name;
    const volume = req.body.volume;
    const price = req.body.price;
    const description = req.body.description;
    console.log(product_id,display_photo,name,volume,price,description)

    db.query("UPDATE product SET display_photo=?,name=?,volume=?,price=?,description=? WHERE product_id = ?",
        [display_photo, name, volume, price, description, product_id], (err, result) => {
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
        // console.log(result);
    })
})

app.get('/viewproductlist', (_req, res) => {
    db.query('SELECT * FROM product ', (err, result, _fields) => {
        if (!err) {
            res.send(result);
        } else {
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
    const email = req.body.email;
    const phone_no = req.body.phone_no;
    const working_area = req.body.working_area;
    const password = req.body.password;
    const manager_ID = req.body.manager_ID;
    const created_at = req.body.created_at

    let transport = nodemailer.createTransport(
        {
            service:'gmail',
            auth: {
                user: 'pettahpharma@gmail.com',
                pass:'MAdhu@1998'
            }
        }
    )

    const subject = 'Login Credentials';
    const message = `Dear ${name},
 

    Welcome to the team! We’re excited to have you at Pettah Pharmacy Private Limited. 
    We know you’re going to be a valuable asset to our company and can’t wait to see what you accomplish.
     
    You can login to our system by using your email : ${email} and your password : ${password}
    You will also contact with your salesmanager to discuss your tasks.
                
    If you have any questions prior to your arrival, please feel free to email me and I’ll be more than happy to help you.
    
    We are looking forward to working with you and seeing you achieve great things!

    Best regards,
    Pettah Pharmacy Private Limited,
    pettahpharma@gmail.com`;
    
    let mailOptions = {
        from : 'pettahpharma@gmail.com',
        to: email,
        subject: subject,
        text: message
    }

    transport.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error)
        }
        else{
            db.query("INSERT INTO medicalrep (rep_ID,name,email,phone_no,working_area,password,manager_ID,created_at) VALUES (?,?,?,?,?,?,?,?)",
            [rep_ID, name, email, phone_no, working_area, password, manager_ID, created_at], (err, _results) => {
                    if(err){
                        console.log(err)
                      }else{
                        res.send("medical rep created");
                      }
                })
        }
    })    
});

app.get('/viewmedicalreplist', (_req, res) => {
    db.query('SELECT * FROM medicalrep ', (err, result, _fields) => {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
        }
    });
});
 
app.get('/viewmedicalrep', (req, res) => {
    db.query("SELECT name,email,phone_no,working_area,rating FROM medicalrep WHERE rep_ID = ? ", [req.query.rep_ID], (err, result) => {
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
 
app.post('/updatemedicalrep', (req, res) => {
    const rep_ID = req.body.rep_ID;
    const name = req.body.name;
    const email = req.body.email;
    const phone_no = req.body.phone_no;
    const working_area = req.body.working_area;

    db.query('UPDATE medicalrep SET name = ?, email = ?, phone_no = ?, working_area = ? WHERE rep_ID=?',
        [name, email, phone_no, working_area, rep_ID],
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
    db.query('SELECT medicalrep.name,task.location,task.title,task.date,task.task_id,task.status FROM medicalrep INNER JOIN task ON medicalrep.rep_ID = task.rep_ID WHERE task.manager_ID = ? AND type="task" ORDER BY date DESC', [req.query.manager_ID], (err, result, fields) => {
        if (!err) {
            res.send(result);
            console.log(result);
        }
        else
            console.log(err);
    })
})
 
app.get('/viewtask', (req, res) => {
    db.query('SELECT medicalrep.name,task.type,task.title,task.location,task.date,task.session,task.description,task.rep_note,task.status,task.task_id,task.task_id,task.rep_ID FROM medicalrep INNER JOIN task ON medicalrep.rep_ID = task.rep_ID WHERE task.manager_ID = ? AND task.task_id=? ', [req.query.manager_ID, req.query.task_id], (err, result) => {
        res.send(result);
        console.log(result);
    })
})
 
app.post('/update', (req, res) => {
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
    db.query('SELECT name,manager_ID FROM salesmanager', (err, result) => {
        res.send(result);
        console.log(result);
    })
})
 
app.get('/managerCount', (req, res) => {
    console.log(req.body)

    db.query('SELECT COUNT(manager_ID) AS count FROM salesmanager', (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
        }
    });
});

app.get('/repCount', (req, res) => {
    console.log(req.body)

    db.query('SELECT COUNT(rep_ID) AS count FROM medicalrep', (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
        }
    });
});

app.get('/employeeCount', (req, res) => {
    console.log(req.body)

    db.query('SELECT SUM(tbl.count) AS totalcount FROM (SELECT COUNT(manager_ID) AS count FROM salesmanager UNION ALL SELECT COUNT(rep_ID) AS count FROM medicalrep)tbl', (err, result) => {
        if (!err) {
            res.send(result);
        } else {
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
    const created_at = req.body.created_at;

    db.query("INSERT INTO task (rep_ID,title,type,description,session,date,manager_ID,location,created_at) VALUES (?,?,?,?,?,?,?,?,?)",
        [rep_ID, title, type, description, session, date, manager_ID, location,created_at], (err, _results) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Assign task");
            }
        });
});

app.get('/productCount', (req, res) => {
    console.log(req.body)

    db.query('SELECT COUNT(product_id) AS count FROM product', (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
        }
    });
});

app.get('/expenseCount', (req, res) => {
    console.log(req.body)

    db.query('SELECT COUNT(expense_ID) AS count FROM expenses', (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
        }
    });
});

app.get('/totalExpenses', (req, res) => {
    console.log(req.body)

    db.query('SELECT SUM(CAST(amount AS DECIMAL(10,2))) AS totalexpense FROM expenses WHERE status=1', (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
        }
    });
});


app.get('/visitCount', (req, res) => {
    console.log(req.body)

    db.query('SELECT COUNT(report_ID) AS count FROM visit_summary_report', (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
        }
    });
});

// app.post('/upload', function (req, res) {
//     let sampleFile;
//     let uploadPath;

//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).send('No files were uploaded.');
//     }
//     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//     sampleFile = req.files.sampleFile;
//     uploadPath = __dirname + '/somewhere/on/your/server/' + sampleFile.name;

//     // Use the mv() method to place the file somewhere on your server
//     sampleFile.mv(uploadPath, function (err) {
//         if (err)
//             return res.status(500).send(err);

//         res.send('File uploaded!');
//     });
// });

app.get('/getrep', (req, res) => {
    console.log(req.query.date);
    db.query('SELECT medicalrep.name, medicalrep.rep_ID  FROM medicalrep WHERE medicalrep.rep_ID NOT IN (SELECT leaves.rep_ID FROM leaves WHERE start_Date= ? ) AND medicalrep.manager_ID= ? AND medicalrep.rep_ID NOT IN (SELECT task.rep_ID FROM task WHERE task.date= ? AND (task.session= ? OR task.session= ? ))', [req.query.date, req.query.manager_ID, req.query.date, req.query.session, req.query.fullday], (err, result) => {
        res.send(result);
        console.log('result');
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

app.get('/getsummary', (req, res) => {
    // console.log(req.query.manager_ID);
    db.query('SELECT visit_summary_report.report_id,visit_summary_report.visit_type,visit_summary_report.date,visit_summary_report.avg_duration,visit_summary_report.doctor_name,medicalrep.name FROM visit_summary_report INNER JOIN medicalrep ON visit_summary_report.rep_ID = medicalrep.rep_ID WHERE visit_summary_report.manager_ID = ? ORDER BY visit_summary_report.date DESC', [req.query.manager_ID], (err, result, fields) => {
        if (!err) {
            res.send(result);
            // console.log(result);
        }
        else
            console.log(err);
    })
})

app.get('/viewsummary', (req, res) => {
    db.query('SELECT visit_summary_report.no_of_sample,visit_summary_report.description,visit_summary_report.manager_comment,visit_summary_report.report_id,visit_summary_report.visit_type,visit_summary_report.date,visit_summary_report.avg_duration,visit_summary_report.doctor_name,medicalrep.name AS repname,visit_summary_report.product_name FROM visit_summary_report INNER JOIN medicalrep ON visit_summary_report.rep_ID = medicalrep.rep_ID WHERE visit_summary_report.manager_ID = ? AND visit_summary_report.report_id = ?', [req.query.manager_ID, req.query.report_id], (err, result) => {
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

app.post('/addcomment', (req, res) => {
    const report_id = req.body.report_id;
    const manager_comment = req.body.manager_comment;

    db.query("UPDATE visit_summary_report SET manager_comment = ? WHERE  report_id=?",
        [manager_comment, report_id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get('/getleave', (req, res) => {
    db.query('SELECT  \
            CASE WHEN leaves.status=0 THEN "Pending" WHEN leaves.status=1 THEN "Accept" ELSE "Rejected" END AS status \
            ,leaves.leave_ID,leaves.leave_Type,leaves.start_Date,leaves.end_Date,medicalrep.name AS repname FROM medicalrep INNER JOIN leaves ON medicalrep.rep_ID = leaves.rep_ID WHERE medicalrep.manager_ID = ? ORDER BY start_Date DESC', [req.query.manager_ID], (err, result, fields) => {
        if (!err) {
            res.send(result);
            // console.log(result);
        }
        else
            console.log(err);
    })
})

app.get('/viewLeave', (req, res) => {
    db.query('SELECT leaves.status,leaves.leave_ID,leaves.leave_Type,leaves.start_Date,leaves.end_Date,leaves.description,leaves.salesmanager_comment,medicalrep.name AS repname FROM leaves INNER JOIN medicalrep ON leaves.rep_ID = medicalrep.rep_ID WHERE leaves.leave_ID = ?', [req.query.leave_ID], (err, result, fields) => {
        if (!err) {
            res.send(result);
            console.log(result);
        }
        else
            console.log(err);
    })
});
 
app.post('/addleavecomment', (req, res) => {
    const leave_ID = req.body.leave_ID;
    const salesmanager_comment = req.body.salesmanager_comment;

    db.query("UPDATE leaves SET salesmanager_comment = ? WHERE  leave_ID=?",
        [salesmanager_comment, leave_ID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});

app.get('/taskanalysis', (req, res) => {
    db.query('SELECT EXTRACT(MONTH FROM date) AS month, COUNT(task_id) AS count FROM task WHERE status="Complete" GROUP BY month ORDER BY month', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
            // console.log(result);
        }
    });
});
 
app.get('/completeTaskCount', (req, res) => {
    console.log(req.body)

    db.query('SELECT COUNT(task_id) AS count FROM task WHERE status="Complete"', (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
        }
    });
});
 
app.get('/pendingTaskCount', (req, res) => {
    console.log(req.body)

    db.query('SELECT COUNT(task_id) AS count FROM task WHERE status="Pending"', (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
        }
    });
});
 
app.get('/rejectTaskCount', (req, res) => {
    console.log(req.body)

    db.query('SELECT COUNT(task_id) AS count FROM task WHERE status="Reject"', (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
        }
    });
});
 
app.get('/visitanalysis', (req, res) => {
    db.query('SELECT EXTRACT(MONTH FROM date) AS month, COUNT(report_id) AS count FROM visit_summary_report GROUP BY month ORDER BY month', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
            // console.log(result);
        }
    });
});

app.get('/TaskReport', (req, res) => {
    db.query('SELECT task_id, title,location,date,description,re_note,manager_ID,rep_ID FROM task WHERE EXTRACT(MONTH FROM o_date) = MONTH(CURRENT_TIMESTAMP) AND status="Complete"', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    });
});
 
app.post('/addstatus', (req, res) => {
    const status = req.body.status;
    const leave_ID = req.body.leave_ID;

    db.query("UPDATE leaves SET status = ? WHERE  leave_ID=?",
        [status, leave_ID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});
 
app.get('/getexpense', (req, res) => {
    db.query('SELECT expenses.expense_ID,\
            CASE WHEN expenses.status=0 THEN "Pending" WHEN expenses.status=1 THEN "Accept" ELSE "Rejected" END AS status \
            ,expenses.expense_type,expenses.location,expenses.date,expenses.amount,medicalrep.name AS repname FROM medicalrep INNER JOIN expenses ON medicalrep.rep_ID = expenses.rep_ID WHERE medicalrep.manager_ID = ? ORDER BY expenses.date DESC', [req.query.manager_ID], (err, result, fields) => {
        if (!err) {
            res.send(result);
            // console.log(result);
        }
        else
            console.log(err);
    })
})

app.get('/viewexpense', (req, res) => {
    db.query('SELECT expenses.bills,expenses.status,expenses.expense_type,expenses.location,expenses.date,expenses.amount,expenses.description,expenses.salesmanager_comment,medicalrep.name AS repname FROM expenses INNER JOIN medicalrep ON expenses.rep_ID = medicalrep.rep_ID WHERE expenses.expense_ID = ?', [req.query.expense_ID], (err, result, fields) => {
        if (!err) {
            res.send(result);
            console.log(result);
        }
        else
            console.log(err);
    })
});

app.post('/addexpensecomment', (req, res) => {
    const expense_ID = req.body.expense_ID;
    const salesmanager_comment = req.body.salesmanager_comment;

    db.query("UPDATE expenses SET salesmanager_comment = ? WHERE  expense_ID=?",
        [salesmanager_comment, expense_ID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});

app.post('/addexpensestatus', (req, res) => {
    const status = req.body.status;
    const expense_ID = req.body.expense_ID;

    db.query("UPDATE expenses SET status = ? WHERE  expense_ID=?",
        [status, expense_ID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});

app.get('/fuelexpense', (req, res) => {
    db.query('SELECT EXTRACT(MONTH FROM date) AS month, SUM(CAST(amount AS DECIMAL(10,2))) AS expense FROM expenses WHERE status=1  AND expense_Type="Fuel" GROUP BY month ORDER BY month ', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    });
});
 
app.get('/accommodationexpense', (req, res) => {
    db.query('SELECT EXTRACT(MONTH FROM date) AS month, SUM(CAST(amount AS DECIMAL(10,2))) AS expense FROM expenses WHERE status=1  AND expense_Type="Accommodation" GROUP BY month ORDER BY month', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    });
});

app.get('/dailyexpense', (req, res) => {
    db.query('SELECT EXTRACT(MONTH FROM date) AS month, SUM(CAST(amount AS DECIMAL(10,2))) AS expense FROM expenses WHERE status=1  AND expense_Type="Daily batta" GROUP BY month ORDER BY month', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    });
});

app.get('/otherexpense', (req, res) => {
    db.query('SELECT EXTRACT(MONTH FROM date) AS month, SUM(CAST(amount AS DECIMAL(10,2))) AS expense FROM expenses WHERE status=1  AND expense_Type="Other" GROUP BY month ORDER BY month', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    });
});

app.get('/promotionVisitCount', (req, res) => {
    console.log(req.body)

    db.query('SELECT COUNT(report_id) AS count FROM visit_summary_report WHERE visit_type="Promotion"', (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
        }
    });
});

app.get('/generalVisitCount', (req, res) => {
    console.log(req.body)

    db.query('SELECT COUNT(report_id) AS count FROM visit_summary_report WHERE visit_type="General"', (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
        }
    });
});

app.get('/feedbackVisitCount', (req, res) => {
    console.log(req.body)

    db.query('SELECT COUNT(report_id) AS count FROM visit_summary_report WHERE visit_type="Feedback"', (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
        }
    });
});

app.get('/viewvisitsummary', (req, res) => {
    db.query('SELECT * FROM visit_summary_report', [req.query.report_id], (err, result) => {
        res.send(result);
        console.log(result);
    })
})

app.get('/viewvisitsummaryReport',(req,res) => {
    db.query("SELECT * FROM visit_summary_report WHERE date BETWEEN ? AND ? ",[req.query.from_date,req.query.to_date], (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
           
        }
    });
 }); 

app.get('/viewexpensesummary', (req, res) => {
    db.query('SELECT * FROM expenses WHERE status="1"', [req.query.expense_ID], (err, result) => {
        res.send(result);
        console.log(result);
    })
})

app.get('/viewexpensesummaryReport',(req,res) => {
    db.query('SELECT * FROM expenses WHERE status="1" AND date BETWEEN ? AND ? ',[req.query.from_date,req.query.to_date], (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
           
        }
    });
 }); 

app.get('/viewtasksummary', (req, res) => {
    db.query('SELECT * FROM task WHERE status="Complete"', [req.query.task_id], (err, result) => {
        res.send(result);
        console.log(result);
    })
})

app.get('/viewtasksummaryReport',(req,res) => {
    db.query('SELECT * FROM task WHERE status="Complete" AND date BETWEEN ? AND ? ',[req.query.from_date,req.query.to_date], (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
           
        }
    });
 }); 

app.get('/totalRepExpenses', (req, res) => {
    const manager_ID = req.query.manager_ID;
    db.query('SELECT SUM(CAST(expenses.amount AS DECIMAL(10,2))) AS totalexpense FROM expenses INNER JOIN medicalrep ON expenses.rep_ID=medicalrep.rep_ID WHERE expenses.status=1 AND medicalrep.manager_ID= ?', [manager_ID], (err, result) => {
        if (!err) {
            res.send(result);
            console.log(result)
        } else {
            console.log(err);
        }
    });
});

app.get('/MedicalRepCount', (req, res) => {
    // console.log(req.body)
    const manager_ID = req.query.manager_ID;
    db.query('SELECT COUNT(rep_ID) AS count FROM medicalrep WHERE manager_ID =?', [manager_ID], (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
        }
    });
});

app.get('/repvisitCount', (req, res) => {
    console.log(req.body)
    const manager_ID = req.query.manager_ID;
    db.query('SELECT COUNT(report_ID) AS count FROM visit_summary_report WHERE manager_ID =?', [manager_ID], (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
        }
    });
});

app.get('/repfuelexpense', (req, res) => {
    const manager_ID = req.query.manager_ID;
    db.query('SELECT EXTRACT(MONTH FROM expenses.date) AS month, SUM(CAST(expenses.amount AS DECIMAL(10,2))) AS expense FROM expenses INNER JOIN medicalrep ON expenses.rep_ID=medicalrep.rep_ID WHERE expenses.status=1  AND expenses.expense_Type="Fuel" AND medicalrep.manager_ID=? GROUP BY month', [manager_ID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);

        }
    });
});


app.get('/repaccommodationexpense', (req, res) => {
    const manager_ID = req.query.manager_ID;
    db.query('SELECT EXTRACT(MONTH FROM expenses.date) AS month, SUM(CAST(expenses.amount AS DECIMAL(10,2))) AS expense FROM expenses INNER JOIN medicalrep ON expenses.rep_ID=medicalrep.rep_ID WHERE status=1  AND expense_Type="Accommodation" AND medicalrep.manager_ID=? GROUP BY month', [manager_ID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);

        }
    });
});

app.get('/repdailyexpense', (req, res) => {
    const manager_ID = req.query.manager_ID;
    db.query('SELECT EXTRACT(MONTH FROM expenses.date) AS month, SUM(CAST(expenses.amount AS DECIMAL(10,2))) AS expense FROM expenses INNER JOIN medicalrep ON expenses.rep_ID=medicalrep.rep_ID WHERE status=1  AND expense_Type="Daily batta" AND medicalrep.manager_ID=? GROUP BY month', [manager_ID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    });
});

app.get('/repotherexpense', (req, res) => {
    const manager_ID = req.query.manager_ID;
    db.query('SELECT EXTRACT(MONTH FROM date) AS month, SUM(CAST(amount AS DECIMAL(10,2))) AS expense FROM expenses INNER JOIN medicalrep  ON medicalrep.rep_ID=expenses.rep_ID  WHERE expenses.status=1  AND expenses.expense_Type="Other" AND medicalrep.manager_ID=? GROUP BY month', [manager_ID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    });
});

app.get('/repcompleteTaskCount', (req, res) => {
    const manager_ID = req.query.manager_ID;
    db.query('SELECT COUNT(task_id) AS count FROM task WHERE status="Complete" AND manager_id=?', [manager_ID], (err, result) => {
        if (!err) {
            res.send(result);
            console.log('result')
            console.log(result)
        } else {
            console.log(err);
        }
    });
});

app.get('/reppendingTaskCount', (req, res) => {
    const manager_ID = req.query.manager_ID;
    console.log(manager_ID)
    db.query('SELECT COUNT(task_id) AS count FROM task WHERE status="Pending" AND manager_id=?', [manager_ID], (err, result) => {
        if (!err) {
            res.send(result);
            console.log('result')
            console.log(result)
        } else {
            console.log(err);
        }
    });
});

app.get('/reprejectTaskCount', (req, res) => {
    const manager_ID = req.query.manager_ID;
    db.query('SELECT COUNT(task_id) AS count FROM task WHERE status="Reject" AND manager_id=?', [manager_ID], (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
        }
    });
});

app.get('/repvisitanalysis', (req, res) => {
    const manager_ID = req.query.manager_ID;
    db.query('SELECT EXTRACT(MONTH FROM date) AS month, COUNT(report_id) AS count FROM visit_summary_report WHERE manager_ID=? GROUP BY month', [manager_ID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    });
});

app.get('/reppromotionVisitCount', (req, res) => {
    console.log(req.body)
    const manager_ID = req.query.manager_ID;
    db.query('SELECT COUNT(report_id) AS count FROM visit_summary_report WHERE visit_type="Promotion" AND manager_ID=?', [manager_ID], (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
        }
    });
});

app.get('/repgeneralVisitCount', (req, res) => {
    console.log(req.body)
    const manager_ID = req.query.manager_ID;
    db.query('SELECT COUNT(report_id) AS count FROM visit_summary_report WHERE visit_type="General" AND manager_ID=?', [manager_ID], (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
        }
    });
});

app.get('/repfeedbackVisitCount', (req, res) => {
    console.log(req.body)
    const manager_ID = req.query.manager_ID;
    db.query('SELECT COUNT(report_id) AS count FROM visit_summary_report WHERE visit_type="Feedback" AND manager_ID=?', [manager_ID], (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
        }
    });
});

app.get('/updatepassword', (req, res) => {
    const password = req.query.oldpassword;
    const confirm_password = req.query.confirm_password;
    const manager_ID = req.query.manager_ID;
    db.query("UPDATE salesmanager SET password = ? WHERE manager_ID=? AND password=?",
        [confirm_password, manager_ID, password],
        (err, result) => {

        });
   
});

app.get('/passwordvalidation', (req, res) => {
    const confirm_password = req.query.confirm_password;
    const manager_ID = req.query.manager_ID;

    // bcrypt.hash(oldpassword, saltRounds, (err, hasholdpassword) => {
    db.query("SELECT * FROM salesmanager  WHERE manager_ID=? AND password=? ",
        [manager_ID,confirm_password],
        (err, result) => {
            if (result.length > 0) {
                
                res.send({ message: "successfully password changed" });
                res.send({ message0: " " });
            }
            else {
                res.send({ message: "The current password is wrong. " });
            }
        });
    // });
});

app.get('/adminupdatepassword', (req, res) => {
    const password = req.query.oldpassword;
    const confirm_password = req.query.confirm_password;
    db.query("UPDATE admin SET password = ? WHERE  password=?",
        [confirm_password, password],
        (err, result) => {

        });
   
});

app.get('/adminpasswordvalidation', (req, res) => {
    const confirm_password = req.query.confirm_password;
    db.query("SELECT * FROM admin  WHERE password=? ",
        [confirm_password],
        (err, result) => {
            if (result.length > 0) {
                
                res.send({ message: "successfully password changed" });
                res.send({ message0: " " });
            }
            else {
                res.send({ message: "The current password is wrong. " });
            }
        });
    // });
});

  
  app.post("/imageUpload",upload.single('file'),(req,res)=> {
     
  })

  app.post('/updateProfile', (req,res) => {
    const manager_ID=req.body.manager_ID;
    const emp_img = req.body.emp_img;
    
   
    db.query("UPDATE salesmanager SET display_photo=? WHERE manager_ID = ?", 
    [emp_img,manager_ID], 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
       }
    );
  });


  app.get('/GetMedicalRapList',(req,res) => {
    const manager_ID = req.query.manager_ID;
    // console.log(manager_ID); 

    const getRepListSQL = "SELECT * FROM medicalrep WHERE manager_ID=?"

    db.query (getRepListSQL,[manager_ID],(err,result) => {
        if (err) {
            console.log(err);  
            console.log("Error while get medical rep details in server code");
        } else {
            res.send(result);
        }

    })

  })

app.post('/Kpi/StatisticData', (req, res) => {
    const rep_ID=req.body.rep_ID;

    db.query("SELECT \
    (SELECT COUNT(report_id) FROM visit_summary_report WHERE rep_ID=?) AS reportCount ,\
    (SELECT SUM(amount) FROM expenses WHERE rep_ID=?) AS expensesAmount, \
    (SELECT COUNT(rep_ID) FROM leaves WHERE rep_ID=?) AS leaveCount,\
    (SELECT COUNT(doctor_ID) FROM doctor_details WHERE rep_ID=?) AS doctorCount, \
    (SELECT Count(task_id) FROM task WHERE type='task' AND status='Complete' AND rep_ID = ?) AS taskcount,\
    (SELECT Count(task_id) FROM task WHERE type='task' AND rep_ID = ?) AS totalTask,\
    (SELECT Count(DISTINCT doctor_name) FROM visit_summary_report WHERE rep_ID = ?) AS visitedDoctorcount",
    [rep_ID,rep_ID,rep_ID,rep_ID,rep_ID,rep_ID,rep_ID],  (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
        }
    });
});


