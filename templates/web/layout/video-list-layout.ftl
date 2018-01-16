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
              <a href="${utils.renderURL(video.src.storeUrl)}">
                <img src="/static-assets/images/g1 copy.png" title="video-name">
              </a>
              <div class="time">
                <span>0:10</span>
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
                  <p>Labels:<a href="#">Lorem</a></p>
                </div>
              </div>
            </div>
          </#list>
      </div>
    </div>
</#macro>