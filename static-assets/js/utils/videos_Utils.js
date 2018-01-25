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
    if(!tags || tags && tags.length === 0) return `There are no tags fo this video`
  
    return tags.map((tag) => { 
        if(!tag.name && !tag.tagName) return
        
        return `<a href="${tag.tagUrl}">${tag.tagName}</a>`
    })
}

function generateVideoUrl(url){
    return url.split('/').splice(3).filter((item) => item != 'index.xml').join('/')
}

function generateGridVideos(data){
    const container = $("#gridContainer")
    container.empty();
    const videos = data.responseVideos.map((video)=> {
        return `
         <div class = "grid">
            <h3>${video.src.dom.page.title}</h3>
            <video id="vid-table-${video.src.dom.page["folder-name"]}" class="video-table" preload="auto">
                <source src="${video.src.dom.page.video}" type="video/mp4">
                <p>Your browser does not support H.264/mp4</p>
            </video>
            <div class="table-player-container" id="player-table-${video.src.dom.page["folder-name"]}">
                <span><span>
            </div>
            <div class="watch" class="time-video-table">
                <a href="${generateVideoUrl(video.src.storeUrl)}" class="fa fa-info-circle"></a>
            </div>
            <div class="time" class="time-video-table">
                <span id="span-table-${video.src.dom.page["folder-name"]}">Loading...</span>
            </div>
            <div class="grid-info">
                <div class="clear"></div>
                <div class="lables">
                    <p>Tags:
                        ${generateTags(video.tags)}
                    </p>
                </div>
            </div>
         </div>
        `
    })
    container.append(videos)
    $(".video-table").on("durationchange", ()=> {
      const tablePlayer = videoHandler('.table-player-container');
      const tableVideos = timeLabelHandler('.video-table');
    })
}

function requestVideos(start, categoryPath) {
    $.get("/api/1/services/videos.json?start="+start+"&category="+categoryPath)
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

function searchVideos(start, videoText) {
    $.get("/api/1/services/search.json?start="+start+"&searchValue="+videoText)
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

