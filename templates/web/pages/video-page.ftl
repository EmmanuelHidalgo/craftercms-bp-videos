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
                <div id="share"></div>
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
              <#if contentModel.tags.item??>
                <#list contentModel.tags.item as tag>
                    <li><a href="#">${tag.tagName}</a> ,</li>
                </#list>
              </#if>
          </ul>
        </div>
        <div class="clear"> </div>
    </div>
    <div class="clear"> </div>
</div>
</@layout.default>