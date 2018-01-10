<#import "/templates/web/layout/default-layout.ftl" as layout/>
<#import "/templates/web/includes/utils.ftl" as utils/>
<#import "/templates/system/common/cstudio-support.ftl" as studio />
<#import "/templates/system/common/craftercms-common.ftl" as crafterCommon/>

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
            <div class="recent-videos">
                <h5><img src="/static-assets/images/recent.png" alt="" />${model.recentVideosLabel!""}</h5>
                <div class="grids grids2">
                    <#if videos?? >
                        <#list videos as video>
                        	<div class="grid grid2">
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
                                            <li><a href="#"><img src="/static-assets/images/likes.png" title="links"></a></li>
                                            <li><a href="#"><img src="/static-assets/images/link.png" title="Link"></a></li>
                                            <li><a href="#"><img src="/static-assets/images/views.png" title="Views"></a></li>
                                        </ul>
                                    </div>
                                    <div class="video-watch">
                                        <a href="${utils.renderURL(video.storeUrl)}">Watch Now</a>
                                    </div>
                                    <div class="clear"> </div>
                                    <div class="lables">
                                        <p>Labels:<a href="#">Lorem</a></p>
                                    </div>
                                </div>
                            </div>
                        </#list>
                    </#if>
                </div>
            </div>
            <div class="recent-videos">
                <h5><img src="/static-assets/images/recent.png" alt="" />${model.mostViewVideosLabel!""}</h5>
                <div class="grids grids2">
                    <#if videos?? >
                        <#list videos as video>
                            <div class="grid grid2">
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
                                            <li><a href="#"><img src="/static-assets/images/likes.png" title="links"></a></li>
                                            <li><a href="#"><img src="/static-assets/images/link.png" title="Link"></a></li>
                                            <li><a href="#"><img src="/static-assets/images/views.png" title="Views"></a></li>
                                        </ul>
                                    </div>
                                    <div class="video-watch">
                                        <a href="${utils.renderURL(video.storeUrl)}">Watch Now</a>
                                    </div>
                                    <div class="clear"> </div>
                                    <div class="lables">
                                        <p>Labels:<a href="#">Lorem</a></p>
                                    </div>
                                </div>
                            </div>
                        </#list>
                    </#if>
                </div>
            </div>
        </div>
    </div>
    <div class="clear"> </div>
</div>
</@layout.default>