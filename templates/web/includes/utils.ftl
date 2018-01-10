<#import "/templates/system/common/cstudio-support.ftl" as studio />

<#function renderURL url>
    <#return urlTransformationService.transform('storeUrlToRenderUrl', url) />
</#function>