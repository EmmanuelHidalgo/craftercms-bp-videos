function getVideoTime(time) {
  const minutes = parseInt(time/60, 10);
  let seconds =  (time % 60).toFixed(0);
  if (seconds == 0) {
    seconds = '00'
  } else if(seconds > 0 && seconds < 10 ) {
    seconds = '0'+seconds
  }
  return minutes+':'+seconds
}

function parseData(data) {
	const dataArr = [];
    data.item.children.forEach((child) => {
        const nodes = child.children ? child.children : [];
        if (child.name !== 'index.xml') {
        dataArr.push({
            id: child.name,
            text: child.name,
            url: child.url,
            children: generateChildren(nodes),
            a_attr: {
            	href:child.url,
            }
        })
      }
    })
   return dataArr;
}

function generateChildren(parentChildren) {
  if(!parentChildren) return ` `;
  const filteredChild = parentChildren.filter((child) => child.name !== 'index.xml');
  return filteredChild.map((child) => {
    return {
        id: child.name,
        text: child.name,
        url: child.url,
        children: generateChildren(child.children),
        a_attr: {
        	href: child.url,
        }
    }
  })
}


function videoHandler(videoClass){
  return $(videoClass).on('click', function () {
    const formatedId= this.id.split('-').splice(1,this.id.length).join('-')
      const video = document.getElementById('vid-'+formatedId)        
  
      video.onseeked = () => {
      video.controls = true;
      	this.paused = false;
        this.style.visibility = "hidden";
      }
      
      video.onseeking = () => {
        video.controls = true;
        video.paused = false;
        this.style.visibility = "hidden";
      }

      video.onplaying = () => {
      	this.style.visibility = "hidden";
        video.paused = false;
      }
      
      video.onpause = () => {
        video.controls = true;
        this.style.visibility = "visible";
      }
      
      if(video.paused) {
          video.play()
          video.controls = true;
          this.style.visibility = "hidden";
      }
  })
}

function timeLabelHandler(videoClass){
 const videoCollection = $(videoClass);

 $.each(videoCollection, function() {
 	const videoElement = this;
    setTimeout(()=> {
     if(videoElement.readyState >= 0) {
        const videoTime = getVideoTime(videoElement.duration)
        const formatedId = videoElement.id.split('-').splice(1,videoElement.id.length).join('-')
        if (formatedId != '') {
        const spanElement = document.getElementById('span-'+formatedId)
        spanElement.innerHTML= videoTime
      }
   }
    }, 1000)
 })
}

function generateTags(tags) {
  if(!tags) return `There are no tags fo this video`

  return tags.map((tag) => {        
      return `<a href="#">${tag}</a>`
  })
}

function generateVideoUrl(url){
return url.split('/').splice(3).filter((item) => item != 'index.xml').join('/')
}

function generateGridVideos(data){
  const container = $("#gridContainer")
  container.empty();
  const videos = data.map((video)=> {
      return `
       <div class = "grid">
          <h3>${video.src.dom.page.title}</h3>
          <video id="vid-table-${video.src.dom.page["folder-name"]}" class="video-table" preload="metadata">
              <source src="${video.src.dom.page.video}" type="video/mp4">
              <p>Your browser does not support H.264/mp4</p>
          </video>
          <div class="table-player-container" id="player-table-${video.src.dom.page["folder-name"]}">
              <span><span>
          </div>
          <div class="time" class="time-video-table">
              <span id="span-table-${video.src.dom.page["folder-name"]}"></span>
          </div>
          <div class="grid-info">
              <div class="video-share">
                  <ul>
                      <li><a href="#"><img src="/static-assets/images/likes.png" title="links"></a></li>
                      <li><a href="#"><img src="/static-assets/images/link.png" title="Link"></a></li>
                      <li><a href="#"><img src="/static-assets/images/views.png" title="Views"></a></li>
                  </ul>
              </div>
              <div class="video-watch">
                  <a href="${generateVideoUrl(video.src.storeUrl)}">Watch Now</a>
              </div>
              <div class="clear"></div>
              <div class="lables">
                  <p>Tags:
                      ${generateTags(video.metaData.tags)}
                  </p>
              </div>
          </div>
       </grid>
      `
  })
container.append(videos)
}

        
function requestVideos(start, categoryPath) {
  $.get("/api/1/services/videos.json?start="+start+"&category="+categoryPath)
    .done((data)=> {
           console.log(data)
          if(data.length > 0) {
      generateGridVideos(data)
        const tablePlayer = videoHandler('.table-player-container');
      const tableVideos = timeLabelHandler('.video-table');
    }   
    });
}


(function (root, factory) {
  $(document).ready(function() {
    const carouselVideos = timeLabelHandler('.video-carousel');
    const tableVideos = timeLabelHandler('.video-table');
    const carouselPlayer = videoHandler('.carousel-player-container');
    const tablePlayer = videoHandler('.table-player-container');
  });

  $('.pagination-page').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    const pageNumber = this.id.split('-')[2]
    const start = pageNumber == 1 ? 0 : (pageNumber*10)-10
    requestVideos(start)
  });//termina el pagination

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
      //$('#jstree').on("changed.jstree", function (e, data) {
        //if (data && data.node) {
          //const url = data.node.original.url
              //const formatedUrl = url.split('/').splice(3,url.length).join('/')
                  //window.location = '/'+formatedUrl;
        //}  
      //});
      $('#jstree').on("select_node.jstree", function (e, data) {
         console.log(data)  
      	 requestVideos(0, data.node.original.url)
        
      });
    }
  }).fail(function (error) {
    console.error(error);
  })
})();