<#import "/templates/web/layout/default-layout.ftl" as layout/>
<#import "/templates/web/includes/utils.ftl" as utils/>
<#import "/templates/system/common/cstudio-support.ftl" as studio />
<#import "/templates/system/common/craftercms-common.ftl" as crafterCommon/>

<@layout.default>
<div class="content" <@studio.iceAttr iceGroup="visible" path=contentModel.storeUrl />>
			<div class="section group">				
				<div class="col span_1_of_3">
					<div class="contact_info">
			    	 	<h3>${contentModel.locationTitle}</h3>
			    	 		<div class="map">
					   			 <div class="ourmap" style="height:175px"></div>
					   		</div>
      				</div>
      			<div class="company_address">
				     	<h3>${contentModel.informationTitle}</h3>
						    	<p>${contentModel.companyMainAddress},</p>
						   		<p>${contentModel.companySecondAddress}</p>
				   		<p>Phone: ${contentModel.companyPhone}</p>
				   		<p>Fax: ${contentModel.companyFax}</p>
				 	 	<p>Email: <span><a href="mailto:${contentModel.companyEmail}">${contentModel.companyEmail}</a></span></p>
				   </div>
				</div>				
				<div class="col span_2_of_3">
				  <div class="contact-form">
				  	<h3>${contentModel.contactFormTitle}</h3>
					    <form id="contact" action="/doContact" method="post">
					    	<div>
						    	<span><label>${contentModel.contactNameLabel}</label></span>
						    	<span><input name = "name" id="name" type="text" value=""></span>
						    </div>
						    <div>
						    	<span><label>${contentModel.contactEmailLabel}</label></span>
						    	<span><input  name = "email"  id="email" type="text" value=""></span>
						    </div>
						    <div>
						     	<span><label>${contentModel.contactMobileLabel}</label></span>
						    	<span><input  name="mobile"  id="mobile" type="text" value=""></span>
						    </div>
						    <div>
						    	<span><label>${contentModel.contactSubjectLabel}</label></span>
						    	<span><textarea name="message" id="message" type="text"> </textarea></span>
						    </div>
						   <div>
                                <input type="submit" id="form-submit" value="${contentModel.buttonSubmitTitle}">
                                <input type="submit" value="Send message" style="display:none" />
						  </div>
					    </form>
				    </div>
  				</div>				
			  </div>
		</div>
	</div>
</@layout.default>