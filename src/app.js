const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 80;

require('./db/conn.js'); // Connecting our server with conn.js file that would handle separately databases
const Register =  require('./models/registration'); // Importing our model Register

// Using HBS as template engine
const templatePath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.set('views', templatePath);
hbs.registerPartials(partialsPath);

// Serving Static Images in HBS files
app.use(express.static(path.join(__dirname, '../templates/views/image')));

app.use(express.json()); // This is to be used to get data from the signup form to be saved in the database
app.use(express.urlencoded({extended:false}));

// Rendering dynamically using hbs
app.get('/',(req,res)=>{
    res.status(201).render("index");
})

app.get('/about',(req,res)=>{
    res.status(201).render("about");
})

app.get('/contacts',(req,res)=>{
    res.status(201).render("contacts");
})

app.get('/login',(req,res)=>{
    res.status(201).render("login");
})

app.get('/signup',(req,res)=>{
    res.status(201).render("signup");
})

app.post('/signup',async (req,res)=>{
    try {
        const psw = req.body.psw;
        const psw_repeat = req.body.psw_repeat;

        if(psw === psw_repeat){
            const registerUser = new Register({
                name : req.body.name,
                city : req.body.city,
                mobileNo : req.body.mobileNo,
                country : req.body.country,
                gender : req.body.gender,
                email : req.body.email,
                psw : req.body.psw,
                psw_repeat : req.body.psw_repeat
            });

            const registered = await registerUser.save();
            res.status(201).render("homepage");
        }
        else{
            res.send('Passwords are not matching');
        }
    } catch (error) {
        res.status(404).send(error);
    }
})

app.post('/login',async (req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userEmail = await Register.findOne({email : email});
        if(userEmail.password === password){
            res.status(201).render("homepage");
        }else{
            res.send("Invalid Email or Password");
        }
    } catch (error) {
        res.status(404).send("Invalid Email or Password")
    }
})


// Start the Server
app.listen(port,()=>{
    console.log(`Server Started at Port ${port}`);
})