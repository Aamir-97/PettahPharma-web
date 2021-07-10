const express = require('express')
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const { name } = require('ejs');
const bcrypt = require('bcrypt');
const bodyParser =  require('body-parser')
const saltRounds = 10;
//const fileUpload = require('express-fileupload');

app.use(cors());
app.use(express.json());
app.set("view engine","ejs");

const db = mysql.createConnection({
    user : 'root',
    host : 'localhost',
    password: '',
    database: 'pettahpharma',
});

db.connect((err)=>{
    if(err) throw err;
    else
    {
        console.log('database connected...');
    }
});

app.post('/create',(req,res)=>{
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
            res.send("data inserted");
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
    const manager_ID = req.body.manager_ID;
    const area = req.body.area;
  
    db.query('UPDATE salesmanager SET area=? WHERE manager_ID=?',[area,manager_ID],(err,result)=>{
        if(!err){
            res.send(result);
        }else{
        console.log(err);
        }
    });
});

app.listen(3001,()=>{
    console.log("Your server is running on port 3001");
});