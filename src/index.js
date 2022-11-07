const express = require('express');
const path = require('path');
const app = express();
const port = 80;

// C:\Users\rgyt1\Desktop\Ban-Code\public
// Using ExpressJS as middleware
app.use(express.static(path.join(__dirname,'../public')));

// GET Request Stuffs
app.get('/',(req,res)=>{
    res.send('Serving Request to Home Page');
})
app.get('/contacts',(req,res)=>{
    res.send('Serving Request to Contacts Page');
})
app.get('/about',(req,res)=>{
    res.send('Serving Request to About Page');
})
app.get('/services',(req,res)=>{
    res.send('Serving Request to Services Page');
})


// Start the Server
app.listen(port,()=>{
    console.log(`Server Started at Port ${port}`);
})