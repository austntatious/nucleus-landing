$(document).ready(function () {
  $('#contact-form').ajaxForm({
    beforeSubmit: function () {
      $('#contact-form .help-block').remove();
      $('#contact-form .form-group').removeClass('has-error');
    },
    success: function (data) {
      var data = $.parseJSON(data);
      if (data.success) {
        $('#contact-form .contact-form-inner .js-alert-holder').html('<div class="alert alert-success">Your message has been successfully sent</div><br/>');
        $('#contact-form')[0].reset();
      }
      else {
        for (var i = 0; i < data.errors.length; i++) {
          $('#c' + data.errors[i].field).parents('.form-group').addClass('has-error');
          $('#c' + data.errors[i].field).parents('.form-group').append('<p class="help-block">' + data.errors[i].msg + '</p>');
        }
      }
    }
  });
});