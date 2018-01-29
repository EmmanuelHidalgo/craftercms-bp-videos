<#import "/templates/system/common/craftercms-common.ftl" as crafterCommon/>
<#import "/templates/system/common/cstudio-support.ftl" as studio />

<div class="footer" <@studio.iceAttr iceGroup="visible" path=contentModel.storeUrl />>
    <div class="wrap">
        
        <div class="box1">
        <h4>${contentModel.socialTitle}</h4>
                <ul class="social">
                  <#list contentModel.socialOptions.item as media>
                    <#if media.show == "true">
                       <li><i class="fa-custom ${media.socialSite}"></i><a href="${media.url}">${media.displayName}</a></li>
                    </#if>
                </#list>
                </ul>
        </div>
        <div class="clear"> </div>
    </div>
</div>
<div class="clear"> </div>
<#if contentModel.showCopyright="true">
  <div class="copy-right">
      <p>&#169 2013 All rights Reserved | Design by &nbsp;<a href="http://w3layouts.com">W3Layouts</a></p>
  </div>
</#if>