var express 	= require('express'),
	nodemailer	= require('nodemailer'),
	app			    = express(),
  bodyParser  = require('body-parser'),
  dotenv      = require('dotenv'),
	postContact;

dotenv.load({ path: '.env' });

// to do: add error handling and sanitation 

// use bodyparser.urlencoded for www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/contact', function(req, res) {
  var transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: process.env.SENDGRID_USER,
      pass: process.env.SENDGRID_PASSWORD
    }
  });

//  var errors = req.validationErrors();


  var from        = req.body.contactemail,
      body        = req.body.contactmessage,
      name        = req.body.contactname,
      to          = process.env.RECEIVING_EMAIL,
      subject     = 'Contact Form | Nucleus Landing Page |';

  var mailOptions = {
    to: to,
    from: from,
    subject: subject,
    text: name + body
  };

  transporter.sendMail(mailOptions, function(err) {
    if (err) {
      return res.json({error: err});
    }
    res.json({ msg: 'Email has been sent successfully!' });
  });
});



app.listen(3000, function() {
  console.log('App listening on post 3000!');
});