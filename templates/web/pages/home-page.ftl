<#import "/templates/web/layout/default-layout.ftl" as layout/>
<#import "/templates/system/common/cstudio-support.ftl" as studio />
<#import "/templates/system/common/craftercms-common.ftl" as crafterCommon/>
<#import "/templates/web/components/carousel-component.ftl" as carousel>
<#import "/templates/web/layout/video-list-layout.ftl" as videoList>



<@layout.default>
<div class="content">
	<@carousel.carousel listVideos=featuredVideos/>
    
    <div class="left-content">
        <@videoList.videoList listVideos=recentVideos title= "Recent Videos" shouldSearch=true containerClass=""/>
    </div>
    <div class="clear"> </div>
    <ul class="dc_pagination dc_paginationA dc_paginationA03">
                  <li><a href="#" class="first">First</a></li>
                  <li><a href="#" class="previous">Previous</a></li>
                  <li><a href="#">1</a></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#" class="current">3</a></li>
                  <li><a href="#">4</a></li>
                  <li><a href="#">5</a></li>
                  <li><a href="#" class="next">Next</a></li>
                  <li><a href="#" class="last">Last</a></li>
                </ul>
    <div class="clear"> </div>
</div>

</@layout.default>