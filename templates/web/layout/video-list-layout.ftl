<#import "/templates/web/includes/utils.ftl" as utils/>

<#macro videoList title shouldSearch containerClass>
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
    
    <script id="pagination-table-template" type="text/x-handlebars-template">
    	<li><a id="first-btn" href="#" class="first">First</a></li>
        <li><a id="previous-btn" href="#" class="previous">Previous</a></li>
        {{#each pages}}
    	  <li><a id="page-number-{{this.index}}" class="pagination-page {{this.current}}">{{this.index}}</a></li>
  		{{/each}}
        <li><a id="next-btn" href="#" class="next">Next</a></li>
        <li><a id="last-btn" href="#" class="last">Last</a></li>
    </script>

    <script id="video-table-template" type="text/x-handlebars-template">
    	<div class = "grid">
            <h3>{{src.dom.page.title}}</h3>
            <video id="vid-table-{{src.dom.page.folder-name}}" class="video-table" preload="auto">
                <source src="{{src.dom.page.video}}" type="video/mp4">
                <p>Your browser does not support H.264/mp4</p>
            </video>
            <div class="table-player-container" id="player-table-{{src.dom.page.folder-name}}">
                <span><span>
            </div>
            <div class="watch" class="time-video-table">
                <a href="{{videoUrl}}" class="share-anchor" title="Full video screen">Watch now</a>
            </div>
            <div class="time" class="time-video-table" id="time-table-{{src.dom.page.folder-name}}">
                <span id="span-table-{{src.dom.page.folder-name}}">Loading...</span>
            </div>
            <div class="grid-info">
                <div class="clear"></div>
                <div class="lables">
                    <p>Tags:
                         {{#each tags}}
    						<a class="generic-tag" onClick="categoryRedirect('{{this}}')" title="Go to details for more information">{{this}}</a>
  						 {{/each}}
                    </p>
                </div>
            </div>
         </div>
    </script>
    
    <script id="no-results-table-template" type="text/x-handlebars-template">
    	<div class = "content">
        	<div class="section group">				
				<div class="col no-results span_1_of_3">
			    	 	<h3>No videos found</h3>
				</div>							
			  </div>
         </div>
    </script>

</#macro>