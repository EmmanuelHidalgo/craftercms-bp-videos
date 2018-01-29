<#import "/templates/web/layout/default-layout.ftl" as layout/>
<#import "/templates/web/includes/utils.ftl" as utils/>
<#import "/templates/system/common/cstudio-support.ftl" as studio />
<#import "/templates/system/common/craftercms-common.ftl" as crafterCommon/>
<#import "/templates/web/layout/video-list-layout.ftl" as videoList>

<@layout.default>
<div class="content">
    <div class="categories">
        <div class="categories-list">
            <div class="content-sidebar">
                <h4><img src="/static-assets/images/fi.png" alt="" />Categories</h4>
                 	<div id="jstree"></div>   
            </div>
        </div>
        <div class="categories-types">           
            <@videoList.videoList title= model.recentVideosLabel shouldSearch=true containerClass="recent-videos"/>
        </div>
    </div>
    <div class="clear" style="margin-bottom: 14%;"> </div>
</div>
</@layout.default>