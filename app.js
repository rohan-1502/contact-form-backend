const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');   
// const mailGun = require('mailgun-js');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join((__dirname, 'public'))));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/thanks', function(req, res) {
    
    console.log(req.body);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rohan.pratap15@gmail.com',
            pass: 'ujsmupbdiovkmsgt',
        }
    });
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var message = req.body.message;
    var data = {
        email,
        name,
        phone,
        message
    }
    console.log(data);
    
    var mailOptions = {
        from: name,
        to: 'rohan.pratap15@gmail.com',
        subject: 'New Enquiry',
        text: `${name}
        ${phone}
        ${email}
        ${message}`,
    };

    transporter.sendMail(mailOptions, function(error){
        if(error){
            console.log(error);
            res.send(error);
        }
        else {
            console.log('Email sent');
            res.sendFile(__dirname +"/public/thanks.html");
        }
    });
  
});



app.listen(3000, () => console.log("Server Starter"));