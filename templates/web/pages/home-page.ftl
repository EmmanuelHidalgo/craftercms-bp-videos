<#import "/templates/web/layout/default-layout.ftl" as layout/>
<#import "/templates/system/common/cstudio-support.ftl" as studio />
<#import "/templates/system/common/craftercms-common.ftl" as crafterCommon/>
<#import "/templates/web/components/carousel-component.ftl" as carousel>
<#import "/templates/web/layout/video-list-layout.ftl" as videoList>



<@layout.default>
<div class="content">
	<@carousel.carousel listVideos=featuredVideos/>
    
    <div class="left-content">
        <@videoList.videoList title= "Recent Videos" shouldSearch=true containerClass=""/>
    </div>
    <div class="clear"> </div>
    
    <div class="clear"> </div>
    
</div>

</@layout.default>