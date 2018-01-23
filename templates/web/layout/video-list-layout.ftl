<#import "/templates/web/includes/utils.ftl" as utils/>

<#macro videoList listVideos title shouldSearch containerClass>
    <div class="${containerClass}">
     <div class="searchbar">
            <div class="search-left">
                <p>${title}</p>
            </div>
            <#if shouldSearch=true>
              <div class="search-right">
                  <form id="search-form">
                      <input type="text" id="input-search-text">
                      <input type="submit" value="" />
                  </form>
              </div>
            </#if>
            <div class="clear"> </div>
        </div>
     
      <div id="gridContainer" style="display: none;">

      </div>
      <div class="clear"> </div>
        <ul id = "paginationContainer"class="dc_pagination dc_paginationA dc_paginationA03"></ul>
    <div class="clear"> </div>
    </div>
</#macro>