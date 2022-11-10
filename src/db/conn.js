const mongoose = require('mongoose');

const uri = "mongodb://127.0.0.1:27017/KTRegistration";
mongoose.connect(uri).then(
    () => { 
        console.log('Connection Established');
     },
    err => { 
        console.log(err);
     }
  );