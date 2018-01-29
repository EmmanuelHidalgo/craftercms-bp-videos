<#import "/templates/system/common/craftercms-common.ftl" as crafterCommon/>
<#import "/templates/web/navigation2/navigation.ftl" as nav/>
<#import "/templates/web/includes/utils.ftl" as utils/>

<#macro carousel listVideos>
<div class="searchbar">
  <div class="search-left">
    <p>Featured Videos</p>
  </div>
  <div class="clear"> </div>
</div>
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
       	  <div class="watch" class="time-video-carousel">
                <a href="${utils.renderURL(video.src.storeUrl)}" title="details">Whatch now</a>
          </div>
      <div class="time" id="time-carousel-${video.src.queryValue('folder-name')}">
        <span class= "time-video-carousel" id="span-carousel-${video.src.queryValue('folder-name')}">Loading...</span>
      </div>
      <div class="grid-info">
        <div class="clear"> </div>        
        <div class="lables">
          <p>Tags:
          	<#if video.metaData.tags??>
                  <#list video.metaData.tags as tag>
                  	<#if tag??>
                      <a onClick="categoryRedirect('${tag}')" title="Go to details for more information">${tag}</a>,
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
