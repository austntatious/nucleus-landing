var express 	= require('express'),
	nodemailer	= require('nodemailer'),
	app			    = express(),
  bodyParser  = require('body-parser'),
  dotenv      = require('dotenv'),
	postContact;

dotenv.load({ path: '.env' });

// to do: add error handling and sanitation 

// use bodyparser.urlencoded for www-form-urlencoded
app.use(app.use(bodyParser.urlencoded({ extended: false })));
app.use(app.use(bodyParser.json()));

app.post('/contact', function(req, res) {
  var transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: process.env.SENDGRID_USER,
      pass: process.env.SENDGRID_PASSWORD
    }
  });

//  var errors = req.validationErrors();


  var from = req.body.email,
      body = req.body.message,
      to = process.env.RECEIVING_EMAIL,
      subject = 'Contact Form | Nucleus Landing Page';

  var mailOptions = {
    to: to,
    from: from,
    subject: subject,
    text: body
  };

  transporter.sendMail(mailOptions, function(err) {
    if (err) {
      req.flash('errors', { msg: err.message });
      return res.redirect('/');
    }
    req.flash('success', { msg: 'Email has been sent successfully!' });
    res.redirect('/');
  });
});



app.listen(3000, function() {
  console.log('App listening on post 3000!');
});