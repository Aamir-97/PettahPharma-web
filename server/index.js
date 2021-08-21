const express = require('express')
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fileUpload = require('express-fileupload');
// const multer = require('multer');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const { name } = require('ejs');
// const bcrypt = require('bcrypt'); 
// const bodyParser =  require('body-parser')
// const saltRounds = 10;
// const fileUpload = require('express-fileupload');
// dotenv.config({path: './.env'});
app.use(cors());
app.use(express.json());
// app.use(cookieParser());
// app.use(session());
app.use(
    fileUpload({
      useTempFiles: true,
      safeFileNames: true,
      preserveExtension: true,
      tempFileDir: `${__dirname}/public/files/temp`
    })
  );

const db = mysql.createConnection({
    user : "root",
    host : "localhost",
    password: "",
    database: "pettahpharma",
    multipleStatements:true
}); 

db.connect((err)=>{
    if(err) 
    {
        console.log(err);
    }
    else
    {
        console.log('Database Connected...');
    }
});

const publicDirectory = path.join(__dirname,'./public')
console.log(__dirname);
app.set("view engine","hbs");

// app.get('/',(_req,res)=>{
//             //res.send("<h1>Pettah Pharma - Web App</h1>");
//             res.render("../../src/pages/Login")
//         })


app.post('/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
     
    db.query("SELECT * FROM admin WHERE email=? AND password=?",
        [email,password],(err,result)=>{
            if(err){
                res.send({err:err})
            }
              if(result.length > 0){
                res.send({message1 : "Login Successful" });
              } else{
                res.send({message2 : "Wrong Username Or password"});
            }
    });
});

// app.post('/createadmin',(req,res)=>{
//     console.log(req.body)
//     const name = req.body.name;
//     const email = req.body.email;
//     const password = req.body.password;
    
//     db.query("INSERT INTO admin (name,email,password) VALUES (?,?,?)",
//     [name,email,password],(err,_results)=>{
//         if(err){
//             console.log(err);
//         } else{
//             res.send("admin created");
//         }  
//     });
    
// });

app.post('/createmanager',(req,res)=>{
    console.log(req.body)
    const manager_ID = req.body.manager_ID;
    const name = req.body.name;
    const email = req.body.email;
    const phone_no = req.body.phone_no;
    const area = req.body.area;
    const password = req.body.password;
   
    db.query("INSERT INTO salesmanager (manager_ID,name,email,phone_no,area,password) VALUES (?,?,?,?,?,?)",
    [manager_ID,name,email,phone_no,area,password],(err,_results)=>{
        if(err){
            console.log(err);
        } else{
            res.send("sales manager created");
        }   
    });
});

app.get('/viewmanager',(_req,res)=>{
    db.query('SELECT * FROM salesmanager ',(err,result,_fields)=>{
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
});

app.get("/view/:manager_ID",(req,res)=>{
    db.query( "SELECT * FROM salesmanager WHERE manager_ID=?",[req.params.id],(err,rows,fields)=>
   {
        if(!err)
        res.send(rows);
        else
        console.log(err);
   });
});

app.delete("/delete/:manager_ID",(req,res)=>{
    const manager_ID = req.params.manager_ID;

    db.query("DELETE FROM salesmanager WHERE manager_ID=?",[manager_ID],(err,rows)=>{
            if(!err)
            res.send(rows);
            else
            console.log(err);
       });
});

app.delete('/deletemanager', (req,res) => {
    manager_ID = req.params.manager_ID;
    
    db.query("DELETE FROM salesmanager WHERE manager_ID=?",[req.query.manager_ID], (err, result) => {
        if(!err)
        res.send(result);
        else
        console.log(err);
   });
});
 
// app.delete("/deletemanager",(req,res)=>{
//     console.log(req.body)
//     const manager_ID = req.body.manager_ID;

//     db.query("DELETE FROM salesmanager WHERE manager_ID=?",[manager_ID],(err,rows)=>{
//             if(!err)
//             res.send(rows);
//             else
//             console.log(err);
//        });
// });

app.get('/viewmanager',(_req,res)=>{
    db.query('SELECT name FROM salesmanager ',(err,result,_fields)=>{
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
});

app.get('/viewrep',(_req,res)=>{
    db.query('SELECT * FROM medicalrep ',(err,result,_fields)=>{
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
});

app.put("/edit/:manager_ID",(req,res)=>{
    const manager_ID = req.params.manager_ID;
    // const name = req.body.name;
    // const email = req.body.email;
    // const phone_no = req.body.phone_no;
    // const area = req.body.area;
  
    db.query('UPDATE salesmanager SET (name,email,phone_no,area) WHERE manager_ID=?',[manager_ID],(err,result)=>{
        if(!err){
            res.send("updated");
        }else{
        console.log(err);
        }
    });
});

app.post('/createproduct',(req,res)=>{
    console.log(req.body)
    const product_ID = req.body.product_ID;
    const display_photo= req.body.image;
    const name = req.body.name;
    const volume = req.body.volume;
    const price = req.body.price;
    const description = req.body.description;
     
    db.query("INSERT INTO product (product_ID,display_photo,name,volume,price,description) VALUES (?,?,?,?,?)",
    [product_ID,display_photo,name,volume,price,description],(err,_results)=>{
        if(err){
            console.log(err);
        } else{
            res.send("product created");
        }
    });
});
 
app.put('/editProduct', (req,res) => {
    console.log(req.body)
    const product_ID = req.body.product_ID;
    const display_photo= req.body.image;
    const name = req.body.name;
    const volume = req.body.volume;
    const price = req.body.price;
    const description = req.body.description;

    db.query("UPDATE products SET display_photo=?,name=?,volume=?,price=?,description=? WHERE product_ID = ?", 
    [product_ID,display_photo,name,volume,price,description], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/viewproduct',(_req,res)=>{
    db.query('SELECT * FROM product ',(err,result,_fields)=>{
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
});

app.post('/createmedicalrep',(req,res)=>{
    console.log(req.body)
    const rep_ID = req.body.rep_ID;
    const name = req.body.name;
    const display_photo=rep.body.image;
    const email = req.body.email;
    const phone_no = req.body.phone_no;
    const area = req.body.area;
    const rating = req.body.rating;
    const password = req.body.password;
    const manager_ID = req.body.manager_ID;

    db.query("INSERT INTO medicalrep (rep_ID,name,display_photo,email,phone_no,area,rating,password,manager_ID) VALUES (?,?,?,?,?,?,?,?)",
    [rep_ID,name,display_photo,email,phone_no,area,rating,password,manager_ID],(err,_results)=>{
        if(err){
            console.log(err);
        } else{
            res.send("medical rep created");
        }
    });  
});

app.get('/viewmedicalrep',(_req,res)=>{
    db.query('SELECT * FROM medicalrep ',(err,result,_fields)=>{
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
});

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

 
app.get('/productCount',(req,res) => {
    console.log(req.body)

    db.query('SELECT COUNT(product_ID) AS count FROM product', (err, result) => {
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

    db.query('SELECT SUM(amount) AS totalexpense FROM expenses',(err, result) => {
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

app.listen(3001,()=>{
    console.log("Your server is running on port 3001");
});