<#import "/templates/web/includes/utils.ftl" as utils/>

<#macro videoList listVideos title shouldSearch containerClass>
    <div class="${containerClass}">
     <div class="searchbar">
            <div class="search-left">
                <p>${title}</p>
            </div>
            <#if shouldSearch=true>
              <div class="search-right">
                  <form>
                      <input type="text"><input type="submit" value="" />
                  </form>
              </div>
            </#if>
            <div class="clear"> </div>
        </div>
     
      <div>
          <#list listVideos as video>
            <div class="grid">
              <h3>${video.src.queryValue('title')}</h3>
                 <video id ="vid-table-${video.src.queryValue('folder-name')}" class="video-table" preload="metadata">
                    <source src="${video.src.queryValue('video')}" type="video/mp4">
                    <p>Your browser does not support H.264/MP4.</p>
                 </video>
                 <div class="table-player-container" id="player-table-${video.src.queryValue('folder-name')}">
          			<span></span>
          		</div>
              <div class="time" class= "time-video-table">
                <span id="span-table-${video.src.queryValue('folder-name')}"></span>
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
                  <a href="${utils.renderURL(video.src.storeUrl)}">Watch Now</a>
                </div>
                <div class="clear"> </div>
                <div class="lables">
                  <p>Tags:
                    <#if video.metaData.tags??>
                          <#list video.metaData.tags as tag>
                            <#if tag??>
                              <a href="${video.metaData.urls[tag?index]}">${tag}</a>,
                            </#if>
                          </#list>
                      </#if>
                   </p>
                </div>
              </div>
            </div>
          </#list>
      </div>
      <div class="clear"> </div>
        <ul class="dc_pagination dc_paginationA dc_paginationA03">
          <li><a href="#" class="first">First</a></li>
          <li><a href="#" class="previous">Previous</a></li>
          <#list 1..listVideos[0].totalItems as n>
          	<li><a id="page-number-${n}" class="pagination-page">${n}</a></li>
          </#list>
          <li><a href="#" class="next">Next</a></li>
          <li><a href="#" class="last">Last</a></li>
         </ul>
    <div class="clear"> </div>
    </div>
</#macro>