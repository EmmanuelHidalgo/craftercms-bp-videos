<#import "/templates/web/layout/default-layout.ftl" as layout/>
<#import "/templates/web/includes/utils.ftl" as utils/>
<#import "/templates/system/common/cstudio-support.ftl" as studio />
<#import "/templates/system/common/craftercms-common.ftl" as crafterCommon/>

<@layout.default>
<div class="content" <@studio.iceAttr iceGroup="visible" path=contentModel.storeUrl />>
			<div class="section group">				
				<div class="col span_1_of_3">
					<div class="contact_info">
			    	 	<h3>${contentModel.imageTitle}</h3>
							<img src="${contentModel.image}"></img>
      				</div>
				</div>				
				<div class="col span_2_of_3">
				  <div class="contact-form">
				  	<h3>${contentModel.mainInformationTitle}</h3>
                    	${contentModel.mainInformation}
				    </div>
  				</div>				
			  </div>
		</div>
	</div>
</@layout.default>