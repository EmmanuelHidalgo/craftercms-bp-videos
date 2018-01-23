<#import "/templates/system/common/craftercms-common.ftl" as crafterCommon/>
<#import "/templates/web/navigation2/navigation.ftl" as nav/>
<#import "/templates/web/includes/utils.ftl" as utils/>

<#macro carousel listVideos>
<div class="slider">
  <#list listVideos as video>
    <div class="grid">
      <h3>${video.src.queryValue('title')}</h3>
          <video id ="vid-carousel-${video.src.queryValue('folder-name')}" class="video-carousel" preload="auto">
            	<source src="${video.src.queryValue('video')}" type="video/mp4">
            	<p>Your browser does not support H.264/MP4.</p>
          </video>
          <div class="carousel-player-container" id="player-carousel-${video.src.queryValue('folder-name')}">
          		<span></span>
          </div>
      <div class="time">
        <span class= "time-video-carousel" id="span-carousel-${video.src.queryValue('folder-name')}">Loading...</span>
      </div>
      <div class="grid-info">
        <div class="video-share">
          <ul>
            <li><a href="#"><img src="/static-assets/images/likes.png" title="links" /></a></li>
            <li><a href="#"><img src="/static-assets/images/link.png" title="Link" /></a></li>
            <li><a href="#"><img src="/static-assets/images/views.png" title="Views" /></a></li>
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
                  <#else>
              		There are no tags for this video
              </#if>
           </p>
        </div>
      </div>
    </div>
  </#list>
  </div>
</#macro>
