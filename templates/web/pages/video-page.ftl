<#import "/templates/web/layout/default-layout.ftl" as layout/>
<#import "/templates/system/common/cstudio-support.ftl" as studio />
<#import "/templates/system/common/craftercms-common.ftl" as crafterCommon/>

<@layout.default>
<div class="content">
    <div class="inner-page">
        <div class="searchbar">
            <div class="search-left">
                <p>Latest Video Form VideosTube</p>
            </div>
            <div class="search-right">
                <form>
                    <input type="text"><input type="submit" value="" />
                </form>
            </div>
            <div class="clear"> </div>
        </div>
        <div class="title">
            <h3>${model.title}</h3>
            <ul>
                <li><h4>By:</h4></li>
                <li><a href="#">Author</a></li>
            </ul>
        </div>
        <div class="video-inner">
            <video controls>
            	<source src="${model.video}" type="video/mp4">
            	<p>Your browser does not support H.264/MP4.</p>
            </video>
        </div>
        <div class="viwes">
            <div class="view-links">
                <ul>
                    <li><h4>Share on:</h4></li>
                    <li><a href="#"><img src="/static-assets/images/f1.png" title="facebook" /></a></li>
                    <li><a href="#"><img src="/static-assets/images/t1.png" title="Twitter" /></a></li>
                    <li><a href="#"><img src="/static-assets/images/s1.png" title="Google+" /></a></li>
                </ul>
            </div>
            <div class="views-count">
                <p><span>2,500</span> Views</p>
            </div>
            <div class="clear"> </div>
        </div>
        <div class="clear"> </div>
        <div class="video-details">
            <ul>
                <li><p>Uploaded on <a href="#">${model.createdDate}</a> by <a href="#">Lorem</a></p></li>
                <li><span>${model.description}</span></li>
            </ul>
        </div>
        <div class="clear"> </div>
        <div class="tags">
            <ul>
                <li><h3>Tags:</h3></li>
                <li><a href="#">Games</a> ,</li>
                <li><a href="#">HD-Videos</a></li>
            </ul>
        </div>
        <div class="clear"> </div>
    </div>
    <div class="clear"> </div>
</div>
<div class="right-content">
    <div class="popular">
        <h3>Popular Videos</h3>
        <p><img src="/static-assets/images/l1.png" title="likes" /> 10,000</p>
        <div class="clear"> </div>
    </div>
    <div class="grid1">
                <h3>Consectetur adipisicing elit</h3>
                <a href="#"><img src="/static-assets/images/g7.jpg" title="video-name" /></a>
                <div class="time1">
                    <span>2:50</span>
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
                        <a href="#">Watch Now</a>
                    </div>
                    <div class="clear"> </div>
                    <div class="lables">
                        <p>Labels:<a href="#">Lorem</a></p>
                    </div>
                </div>
            </div>
            <div class="clear"> </div>
</div>
</@layout.default>