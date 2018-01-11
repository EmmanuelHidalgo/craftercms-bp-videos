<#import "/templates/system/common/craftercms-common.ftl" as crafterCommon/>
<#import "/templates/web/navigation2/navigation.ftl" as nav/>
<#import "/templates/web/includes/utils.ftl" as utils/>

<#macro carousel listVideos>
<div class="slider">
  <#list listVideos as video>
    <div class="grid">
      <h3>${video.queryValue('title')}</h3>
      <a href="${utils.renderURL(video.storeUrl)}">
         <img src="/static-assets/images/g1 copy.png" title="video-name">
      </a>
      <div class="time">
        <span>00:10</span>
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
          <a href="single.html">Watch Now</a>
        </div>
        <div class="clear"> </div>
        <div class="lables">
          <p>Labels:<a href="categories.html">Lorem</a></p>
        </div>
      </div>
    </div>
  </#list>
  </div>
</#macro>