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
    user : "root",
    host : "localhost",
    password: "",
    database: "pettahpharma"
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
     
    db.query("SELECT * FROM salesmanager WHERE email=? AND password=?",
        [email,password],(err,result)=>{
            if(err){
                res.send({err:err})
            }
              if(result.length > 0){
                res.send({message1 :"Login Successful" });
              } else{
                res.send({message2 : " Wrong Username Or password "});
              }
            });
});

app.post('/createadmin',(req,res)=>{
    console.log(req.body)
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    
    db.query("INSERT INTO admin (name,email,password) VALUES (?,?,?)",
    [name,email,password],(err,_results)=>{
        if(err){
            console.log(err);
        } else{
            res.send("admin created");
        }  
    });
    
});

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

app.get('/view',(_req,res)=>{
    db.query('SELECT * FROM salesmanager ',(err,result,_fields)=>{
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
});

app.get("/view/:manager_ID",(req,res)=>{
    db.query( "SELECT *FROM salesmanager WHERE manager_ID=?",[req.params.id],(err,rows,fields)=>
   {
        if(!err)
        res.send(rows);
        else
        console.log(err);
   })
});

app.delete("/delete/:manager_ID",(req,res)=>{
    const id = req.params.id;
    const sqlDelete="DELETE FROM salesmanager WHERE manager_ID=?";

    db.query(sqlDelete,id,(err,result)=>{
      if(err) console.log(err);
    });
});

app.get('/viewname',(_req,res)=>{
    db.query('SELECT name FROM salesmanager ',(err,result,_fields)=>{
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
});

app.put("/update/:manager_ID",(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const phone_no = req.body.phone_no;
    const area = req.body.area;
  
    db.query('UPDATE salesmanager SET (name,email,phone_no,area) WHERE manager_ID=?',[name,email,phone_no,area],(err,result)=>{
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
});

app.post('/createproduct',(req,res)=>{
    console.log(req.body)
    const product_ID = req.body.product_ID;
    const name = req.body.name;
    const quantity = req.body.quantity;
    const price = req.body.price;
    const description = req.body.description;
    
    db.query("INSERT INTO product (product_ID,name,quantity,price,description) VALUES (?,?,?,?,?)",
    [product_ID,name,quantity,price,description],(err,_results)=>{
        if(err){
            console.log(err);
        } else{
            res.send("product created");
        }
    
    });
    
});

app.post('/createmedicalrep',(req,res)=>{
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
    [rep_ID,name,email,phone_no,area,level,password,manager_ID],(err,_results)=>{
        if(err){
            console.log(err);
        } else{
            res.send("medical rep created");
        }
    
    });
    
});

app.post('/createleavetype',(req,res)=>{
    console.log(req.body)
    const name = req.body.name;
    const status = req.body.status;
    const quota = req.body.quota;
    const frequency = req.body.frequency;

    db.query("INSERT INTO leavetype (name,status,quota,frequency) VALUES (?,?,?,?)",
    [name,status,quota,frequency],(err,_results)=>{
        if(err){
            console.log(err);
        } else{
            res.send("leave type created");
        }
    
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