function getVideoTime(time) {
    if(isNaN(time)){
        return 'Loading...'
    }
    const minutes = parseInt(time/60, 10);
    let seconds =  (time % 60).toFixed(0);
    if (seconds == 0) {
      seconds = '00'
    } else if(seconds > 0 && seconds < 10 ) {
      seconds = '0'+seconds
    }
    return minutes+':'+seconds
  }

function videoHandler(videoClass){
    return $(videoClass).on('click', function () {
        const formatedId= this.id.split('-').splice(1,this.id.length).join('-');
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
        }, 0)
    })
}


function generateTags(tags) {
    if(!tags || tags && tags.length === 0) return ["There are no tags"]
  
    return tags.map((tag) => { 
        if(!tag.tagName) return
        
        return tag.tagName
    })
}

function generateVideoUrl(url){
    return url.split('/').splice(3).filter((item) => item != 'index.xml').join('/')
}

function generateGridVideos(data){
    const container = $("#gridContainer")
    container.empty();
    console.log(data)
    if(data.responseVideos.length === 0) {
    	const content = document.getElementById("no-results-table-template")
        if(!content) return
        const source   = content.innerHTML;
        const template = Handlebars.compile(source);
        const context = {};
		const html    = template(context);
    	container.append(html)
        return
    }
    const videos = data.responseVideos.map((video)=> {
    	video.videoUrl = generateVideoUrl(video.src.storeUrl)
        video.tags = generateTags(video.tags)
        const content = document.getElementById("video-table-template")
        if(!content) return 
    	const source   = content.innerHTML;
        const template = Handlebars.compile(source);
        const context = video;
		const html    = template(context);
        return html
    })
    container.append(videos)
    $(".video-table").on("durationchange", ()=> {
      const tablePlayer = videoHandler('.table-player-container');
      const tableVideos = timeLabelHandler('.video-table');
    })
}

function searchVideos(start, videoText, path) {
	currentSearchVale = videoText
	const api = "/api/1/services/search.json?start="+start+"&searchValue="+videoText+"&path="+path
    $.get(api)
      .done((data)=> {
           if(data) {
            const p = new Promise((resolve)=> {
              generateGridVideos(data)        
              resolve('success')
           })
           p.then(()=>{
               $("#gridContainer").css("display","block");
                generatePagination((data.totalCount/10) + 1, data.selectedPage)
                handlePagination()
                $('#input-search-text').val(currentSearchVale)
           })
          }   
        })
      .fail((error)=> {
          console.log(error)   
        });
}

function requestVideos(start, categoryPath) {
    $.get("/api/1/services/videos.json?start="+start+"&category="+categoryPath+"&searchInput="+currentSearchVale)
      .done((data)=> {
           if(data) {
            const p = new Promise((resolve)=> {
              generateGridVideos(data)        
              resolve('success')
           })
           p.then(()=>{
               $("#gridContainer").css("display","block");
                   generatePagination((data.totalCount/10) + 1, data.selectedPage)
    			   handlePagination()
           })
          }   
        })
      .fail((error)=> {
          console.log(error)   
        });
}

function categoryRedirect(tagName){
	window.location.replace("/categories");
    currentSearchVale = tagName
    localStorage.removeItem('jstree');
    requestVideos(0)
}


