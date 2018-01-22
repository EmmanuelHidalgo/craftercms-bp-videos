/*
  Main JS of the app, here you can find all the
  main initializations and interactions of the page components,
  the majority of the functions are called from other
  js files that you can find inside Utils folder.
*/
$(document).ready(function() {
  /*
    This code is the one in charge of all video connection to the dom,
    the functions videoHandler, timeLabelHandler and requestVideos
    can be found in videos_Utils.js inside Utils folder
  */
  $(".video-carousel").on("durationchange", ()=> {
  const tablePlayer = videoHandler('.carousel-player-container');
  const tableVideos = timeLabelHandler('.video-carousel');
  })
  //const carouselVideos = timeLabelHandler('.video-carousel');
  //const carouselPlayer = videoHandler('.carousel-player-container');
  
  //loads first 10 videos when the page load for the first time, in this case 0 means start at row number 0
  requestVideos(0)
  
  /*
    This code handles the search service for the videos
  */
  $("#search-form").on('submit', function(e){
  	e.preventDefault()
    const inputText = $('#input-search-text').val()
    searchVideos(0, inputText)
  })
  
  /*
    This code is the one in charge of all pagination connections to the dom,
    the functions navigate, go, goLast, goNext can be found in
    pagination_Utils.js inside Utils folder
  */
  $("#page-number-1").addClass('current')
  
  $('.pagination-page').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    navigate(this);
  });
  
  $("#first-btn").on('click', function(e){
    e.preventDefault();
    goFirst()
  });
  
  $("#last-btn").on('click', function(e){
    e.preventDefault();
    goLast()
  });
  
  $("#next-btn").on('click', function(e){
    e.preventDefault();
    go('next')
  })
  
  $("#previous-btn").on('click', function(e){
    e.preventDefault();
    go('previous')
  })
  
  /*
    This code is the one in charge of load the slider (carousel) into the dom
    the function getSliderConfig can be found in slider_Utils.js inside Utils
    folder
  */
  $('.slider').slick(getSliderConfig());
  
  /*
    This code is the one in charge of add the fearture
    of sending emails, the function sendMails can be found in
    mail_Utils.js inside Utilsfolder
  */
  $("#form-submit").click(function(e){
    e.preventDefault();
    sendMail(this)
  });
  
  /*
    This code is the one in charge of add the categories tree in
    the page (jsTree)
  */
  var api = "/api/site-map.json"
  $.ajax({
    type: "GET",
    "url": api,
  }).done(function (data) {
    if(data.item) {
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

});//end of document ready
