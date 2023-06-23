require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOption =require('./Config folder/corsOption');
const {logger}= require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT ');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./Config folder/dbConn');
const PORT = process.env.port || 3500;
connectDB();
 
app.use(logger);
app.use(credentials);

app.use(cors(corsOption));

app.use(express.urlencoded({extended:false}));

app.use(express.json());

app.use(cookieParser());
app.use('/',express.static(path.join(__dirname,'/public')));





app.use('/',require('./Routes/roots'));
app.use('/register',require('./Routes/API/register'));
app.use('/auth',require('./Routes/API/auth'));
app.use('/refresh',require('./Routes/API/refresh'));
app.use('/logout',require('./Routes/API/Logout'));




app.use(verifyJWT);
app.use('/employees',require('./Routes/API/employees'));
app.all('*',(req,res)=>{
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','subdir','404.html'));
 }else if(req.accepts('json')){
    res.json({"error":"404 Not Found"});
 }else{
    res.type('txt').send("404 Not found");
 }
    
});

app.use(errorHandler);

mongoose.set('strictQuery',true);

mongoose.connection.once('open',()=>{
   console.log('succesfully connected to mongoDB');
   app.listen(PORT,()=>{console.log(`Server running on port ${PORT}`)})
});