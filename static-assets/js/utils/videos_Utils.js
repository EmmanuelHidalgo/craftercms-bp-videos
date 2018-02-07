function getVideoTime(time) {
    if(isNaN(time)){
        return 'Loading...'
    }
    var minutes = parseInt(time/60, 10);
    var seconds =  (time % 60).toFixed(0);
    if (seconds == 0) {
      seconds = '00'
    } else if(seconds > 0 && seconds < 10 ) {
      seconds = '0'+seconds
    }
    return minutes+':'+seconds
  }

function videoHandler(videoClass){
    return $(videoClass).on('click', function () {
        var formatedId= this.id.split('-').splice(1,this.id.length).join('-');
        var video = document.getElementById('vid-'+formatedId)  
        var playerIcon =  document.getElementById('player-'+formatedId)
        var timeContainer = document.getElementById('time-'+formatedId)

        video.onseeked = function(){
          video.controls = true;
          video.paused = false;
          playerIcon.style.visibility = "hidden";
        }
        
        video.onseeking = function(){
          video.controls = true;
          video.paused = false;
          playerIcon.style.visibility = "hidden";
        }

        video.onplaying = function() {
          playerIcon.style.visibility = "hidden";
          video.paused = false;
          timeContainer.style.display = "none";
        }
        
        video.onpause = function() {
          video.controls = true;
          playerIcon.style.visibility = "visible";
        }
        
        if(video.paused) {
            video.play()
            video.controls = true;
            playerIcon.style.visibility = "hidden";
        }
    })
}

function timeLabelHandler(videoClass){
    var videoCollection = $(videoClass);
    $.each(videoCollection, function() {
        var videoElement = this;
        setTimeout(function() {
        if(videoElement.readyState >= 0) {
            var videoTime = getVideoTime(videoElement.duration)
            var formatedId = videoElement.id.split('-').splice(1,videoElement.id.length).join('-')
            if (formatedId != '') {
            var spanElement = document.getElementById('span-'+formatedId)
            spanElement.innerHTML= videoTime
            }
        }
        }, 0)
    })
}


function generateTags(tags) {
    if(!tags || tags && tags.length === 0) return ["There are no tags"]
  
    return tags.map(function(tag){ 
        if(!tag.tagName) return
        
        return tag.tagName
    })
}

function generateVideoUrl(url){
    return url.split('/').splice(3).filter(function(item){
    	return item != 'index.xml'
    }).join('/')
}

function generateGridVideos(data){
    var container = $("#gridContainer")
    container.empty();
    if(data.responseVideos.length === 0) {
    	var content = document.getElementById("no-results-table-template")
        if(!content) return
        var source   = content.innerHTML;
        var template = Handlebars.compile(source);
        var context = {};
		var html    = template(context);
    	container.append(html)
        return
    }
    const videos = data.responseVideos.map(function(video) {
    	video.videoUrl = generateVideoUrl(video.src.storeUrl)
        video.tags = generateTags(video.tags)
        var content = document.getElementById("video-table-template")
        if(!content) return 
    	var source   = content.innerHTML;
        var template = Handlebars.compile(source);
        var context = video;
		var html    = template(context);
        return html
    })
    container.append(videos)
      $(".video-table").on("durationchange", function() {
      var tablePlayer = videoHandler('.table-player-container');
      var tableVideos = timeLabelHandler('.video-table');
    })
    
}

function searchVideos(start, videoText, path) {
	currentSearchVale = videoText
	var api = "/api/1/services/search.json?start="+start+"&searchValue="+videoText+"&path="+path
    $.get(api)
      .done(function(data) {
           if(data) {
            var p = new Promise(function(resolve){
              generateGridVideos(data)        
              resolve('success')
           })
           p.then(function() {
               $("#gridContainer").css("display","block");
                generatePagination((data.totalCount/10) + 1, data.selectedPage)
                handlePagination()
                $('#input-search-text').val(currentSearchVale)
           })
          }   
        })
      .fail(function(error) {
          console.log(error)   
        });
}

function requestVideos(start, categoryPath) {
    $.get("/api/1/services/videos.json?start="+start+"&category="+categoryPath+"&searchInput="+currentSearchVale)
      .done(function(data) {
           if(data) {
            var p = new Promise(function(resolve) {
              generateGridVideos(data)        
              resolve('success')
           })
           p.then(function(){
               $("#gridContainer").css("display","block");
                   generatePagination((data.totalCount/10) + 1, data.selectedPage)
    			   handlePagination()
           })
          }   
        })
      .fail(function(error) {
          console.log(error)   
        });
}

function categoryRedirect(tagName){
	console.log(tagName)
    currentSearchVale = tagName
    localStorage.removeItem('jstree');
    localStorage.setItem('tagName', tagName)
    window.location.replace("/categories");
    
}


