(function (root, factory) {
  $(document).ready(function() {
    $(".video-carousel").on("durationchange", ()=> {
    const tablePlayer = videoHandler('.carousel-player-container');
  	const tableVideos = timeLabelHandler('.video-carousel');
  	})
    const carouselVideos = timeLabelHandler('.video-carousel');
    const carouselPlayer = videoHandler('.carousel-player-container');
  });

  $('.pagination-page').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    const pageNumber = this.id.split('-')[2]
    const start = pageNumber == 1 ? 0 : (pageNumber*10)-10
    requestVideos(start)
  });

  requestVideos(0)

  $('.slider').slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: true,
    infinite: true,
    arrows: true,
    autoplay: false,
    focusOnSelect: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        }
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 320,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
    }
  );

  $("#form-submit").click(function(e){
    e.preventDefault();
    var thisButton = $(this);
    alertify.set('notifier','position', 'top-right');

    if(!thisButton.hasClass("loading") && !thisButton.hasClass("done")){
      var frm = $("#contact");
      if (!frm[0].checkValidity()) {
        frm.find('input[type=submit]').click()
      } else {
          var data = frm.serializeArray();
          data = data.reduce(function (m, e) { m[e.name] = e.value; return m; }, {});
        console.log(data)
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
  });

  var api = "/api/site-map.json"
  $.ajax({
    type: "GET",
    "url": api,
  }).done(function (data) {
    if(data.item) {
      //here is the configuration of the jstree library
      $('#jstree').jstree({
        core: {
          data:parseData(data),
          themes: {
            responsive: true,
            dots: false
          }
        },
        state:{key: 'jstree'},
        plugins:['state','unique']
      });

      $('#jstree').on("select_node.jstree", function (e, data) {
         console.log(data)  
      	 requestVideos(0, data.node.original.url)
        
      });
    }
  }).fail(function (error) {
    console.error(error);
  })
})();