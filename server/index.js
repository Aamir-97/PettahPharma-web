const express = require('express')
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
// const { name } = require('ejs');
// const bcrypt = require('bcrypt');
// const bodyParser =  require('body-parser')
// const saltRounds = 10;
// const fileUpload = require('express-fileupload');
// dotenv.config({path: './.env'});
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "pettahpharma"
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


// app.get('/login', (req, res) => {

//     db.query('SELECT * FROM salesmanager WHERE email=? AND password=?',
//         [req.query.email, req.query.password], (err, result) => {
//             if (!err) {
//                 // res.send(result);
//                 if (result.length > 0) {
//                     res.send({ message1: "Login salesmanager" });

//                     // console.log(result);

//                 }
//             };

//         });

//     db.query('SELECT * FROM admin WHERE email=? AND password=?',
//         [req.query.email, req.query.password], (err, result) => {
//             if (result.length > 0) {
//                 res.send({ message1: "Login admin" });
//                 // res.send(result);
//                 // console.log(result);

//             };
//         });
// });

app.get('/getid', (req, res) => {
    console.log(req.query.email);
    console.log(req.query.password);
    db.query('SELECT manager_ID FROM salesmanager WHERE email=? AND password=?',
        [req.query.email, req.query.password], (err, result) => {

            res.send(result);
            console.log(result);

        })
})

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

app.post('/createmanager', (req, res) => {
    console.log(req.body)
    const manager_ID = req.body.manager_ID;
    const name = req.body.name;
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

app.get('/view', (_req, res) => {
    db.query('SELECT * FROM salesmanager ', (err, result, _fields) => {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
        }
    });
});

app.get("/view/:manager_ID", (req, res) => {
    db.query("SELECT *FROM salesmanager WHERE manager_ID=?", [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.delete("/delete/:manager_ID", (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM salesmanager WHERE manager_ID=?";

    db.query(sqlDelete, id, (err, result) => {
        if (err) console.log(err);
    });
});

app.get('/viewname', (_req, res) => {
    db.query('SELECT name FROM salesmanager ', (err, result, _fields) => {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
        }
    });
});

app.put("/update/:manager_ID", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone_no = req.body.phone_no;
    const area = req.body.area;

    db.query('UPDATE salesmanager SET (name,email,phone_no,area) WHERE manager_ID=?', [name, email, phone_no, area], (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
        }
    });
});

app.post('/createproduct', (req, res) => {
    console.log(req.body)
    const product_ID = req.body.product_ID;
    const name = req.body.name;
    const quantity = req.body.quantity;
    const price = req.body.price;
    const description = req.body.description;

    db.query("INSERT INTO product (product_ID,name,quantity,price,description) VALUES (?,?,?,?,?)",
        [product_ID, name, quantity, price, description], (err, _results) => {
            if (err) {
                console.log(err);
            } else {
                res.send("product created");
            }

        });

});

app.post('/createmedicalrep', (req, res) => {
    console.log(req.body)
    const rep_ID = req.body.rep_ID;
    const name = req.body.name;
    const email = req.body.email;
    const phone_no = req.body.phone_no;
    const area = req.body.area;
    const level = req.body.level;
    const password = req.body.password;
    const manager_ID = req.body.manager_ID;


    db.query("INSERT INTO medicalrep (rep_ID,name,email,phone_no,area,level,password,manager_ID) VALUES (?,?,?,?,?,?,?,?)",
        [rep_ID, name, email, phone_no, area, level, password, manager_ID], (err, _results) => {
            if (err) {
                console.log(err);
            } else {
                res.send("medical rep created");
            }

        });

});

app.post('/createleavetype', (req, res) => {
    console.log(req.body)
    const name = req.body.name;
    const status = req.body.status;
    const quota = req.body.quota;
    const frequency = req.body.frequency;

    db.query("INSERT INTO leavetype (name,status,quota,frequency) VALUES (?,?,?,?)",
        [name, status, quota, frequency], (err, _results) => {
            if (err) {
                console.log(err);
            } else {
                res.send("leave type created");
            }

        });

});


app.get('/gettask', (req, res) => {
    db.query('SELECT medicalrep.name,task.type,task.title,task.date,task.session,task.task_id FROM medicalrep INNER JOIN task ON medicalrep.rep_ID = task.rep_ID WHERE task.manager_ID = ?', [req.query.manager_ID], (err, result, fields) => {
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
        }
    );
});


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
    db.query('SELECT visit_summary_report.report_id,visit_summary_report.visit_type,visit_summary_report.date,visit_summary_report.avg_duration,doctor_details.name AS doctorname,medicalrep.name FROM visit_summary_report INNER JOIN doctor_details ON visit_summary_report.doctor_id = doctor_details.doctor_id INNER JOIN medicalrep ON visit_summary_report.rep_ID = medicalrep.rep_ID WHERE visit_summary_report.manager_ID = ?', [req.query.manager_ID],(err,result,fields)=>{
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
// viewLeave

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
// addleavecomment
app.get('/viewLeave',(req,res)=>{
    db.query('SELECT leaves.leave_ID,leaves.leave_Type,leaves.start_Date,leaves.end_Date,leaves.description,leaves.salesmanager_comment,medicalrep.name AS repname FROM leaves INNER JOIN medicalrep ON leaves.rep_ID = medicalrep.rep_ID WHERE leaves.leave_ID = ?', [req.query.leave_ID],(err,result,fields)=>{
        if(!err){
            res.send(result);
            console.log(result);
        }
        else
        console.log(err);
    })
})

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
        }
    );
});

app.listen(3001, () => {
    console.log("Your server is running on port 3001");
});