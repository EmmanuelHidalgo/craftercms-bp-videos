<#import "/templates/web/includes/utils.ftl" as utils/>

<#macro videoList listVideos title shouldSearch containerClass>
    <div class="${containerClass}">
     <div class="searchbar">
            <div class="search-left">
                <p>${title}</p>
            </div>
            <#if shouldSearch=true>
              <div class="search-right">
                  <form>
                      <input type="text"><input type="submit" value="" />
                  </form>
              </div>
            </#if>
            <div class="clear"> </div>
        </div>
     
      <div id="gridContainer" style="display: none;">

      </div>
      <div class="clear"> </div>
        <ul class="dc_pagination dc_paginationA dc_paginationA03">
          <li><a id="first-btn" href="#" class="first">First</a></li>
          <li><a id="previous-btn" href="#" class="previous">Previous</a></li>
          <#list 1..listVideos[0].totalItems as n>
          	<li><a id="page-number-${n}" class="pagination-page">${n}</a></li>
          </#list>
          <li><a id="next-btn" href="#" class="next">Next</a></li>
          <li><a id="last-btn" href="#" class="last">Last</a></li>
         </ul>
    <div class="clear"> </div>
    </div>
</#macro>