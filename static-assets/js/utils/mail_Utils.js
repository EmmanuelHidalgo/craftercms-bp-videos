function sendMail(btn) {
    var thisButton = $(btn);
    alertify.set('notifier','position', 'top-right');

    if(!thisButton.hasClass("loading") && !thisButton.hasClass("done")){
      var frm = $("#contact");
      if (!frm[0].checkValidity()) {
        frm.find('input[type=submit]').click()
      } else {
          var data = frm.serializeArray();
          data = data.reduce(function (m, e) { m[e.name] = e.value; return m; }, {});
          $.ajax({
            type: "POST",
            "url": "/api/1/services/mail.json",
            "data": data,
          }).done(function () {
              $('#contact')[0].reset();
              alertify.success('Your message was sent');
          }).fail(function (error) {
              alertify.error('There was an error during the action');
              console.error(error);
          }).always(function(){
              setTimeout(function(){
                thisButton.removeClass('done error');
              }, 2000);
          });
      }
    }
}