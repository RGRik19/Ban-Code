const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    city : {
        type: String,
        required: true
    },
    mobileNo : {
        type: String,
        required: true,
        unique: true
    },
    country : {
        type: String,
        required: true
    },
    gender : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    psw : {
        type: String,
        required: true
    },
    psw_repeat : {
        type: String,
        required: true
    }
})

const Register = new mongoose.model('Register',userSchema);

module.exports = Register;