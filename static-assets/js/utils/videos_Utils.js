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
                <span id="span-table-${video.src.dom.page["folder-name"]}">Loading...</span>
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
         </div>
        `
    })
    container.append(videos)
    $(".video-table").on("durationchange", ()=> {
      const tablePlayer = videoHandler('.table-player-container');
        const tableVideos = timeLabelHandler('.video-table');
    })
    const tablePlayer = videoHandler('.table-player-container');
    const tableVideos = timeLabelHandler('.video-table');
}

function requestVideos(start, categoryPath) {
    $.get("/api/1/services/videos.json?start="+start+"&category="+categoryPath)
      .done((data)=> {
           if(data.length > 0) {
            const p = new Promise((resolve)=> {
              generateGridVideos(data)        
              resolve('success')
           })
           p.then(()=>{
               $("#gridContainer").css("display","block");
           })
          }   
        });
}

