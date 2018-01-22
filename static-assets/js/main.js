(function (root, factory) {
  $(document).ready(function() {
    $(".video-carousel").on("durationchange", ()=> {
    const tablePlayer = videoHandler('.carousel-player-container');
  	const tableVideos = timeLabelHandler('.video-carousel');
  	})
    const carouselVideos = timeLabelHandler('.video-carousel');
    const carouselPlayer = videoHandler('.carousel-player-container');
  });
  
  $("#page-number-1").addClass('current')
  $('.pagination-page').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    navigate(this);
  });

  requestVideos(0)

  $('.slider').slick(getSliderConfig());

  $("#form-submit").click(function(e){
    e.preventDefault();
    sendMail(this)
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
      	 requestVideos(0, data.node.original.url)
      });
    }
  }).fail(function (error) {
    console.error(error);
  })
})();