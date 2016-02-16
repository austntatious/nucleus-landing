var express 	= require('express'),
	nodemailer	= require('nodemailer'),
	app			    = express(),
	postContact;


// to do: add error handling and sanitation 

app.post('/contact', postContact);

postContact = function(req, res) {
  var transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: process.env.SENDGRID_USER,
      pass: process.env.SENDGRID_PASSWORD
    }
  });

  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('message', 'Message cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/');
  }

  var from = req.body.email,
      body = req.body.message,
      to = 'your@email.com',
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
};

app.listen(3000, function() {
  console.log('App listening on post 3000!');
});