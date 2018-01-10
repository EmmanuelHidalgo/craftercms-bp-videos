<#import "/templates/system/common/craftercms-common.ftl" as crafterCommon/>
<#import "/templates/web/navigation2/navigation.ftl" as nav/>

<!----start-Header---->
<div class="header">
    <!----start-Logo---->
    <div class="logo">
        <a href="${model.headerImageUrl}"><img src="${model.headerImage}" title="logo" /></a>
    </div>
    <!----End-Logo---->
    <!----start-top-nav---->
    <div class="top-nav">
        <ul>
            <li><a href="/index.html">Home</a><p>My Forntpage</p></li>
            <li><a href="#">About</a><p>About this blog</p></li>
            <li><a href="/categories">Categories</a><p>Be Ur Self</p></li>
            <li><a href="/contact">Contact</a><p>Leave Messages</p></li>
        </ul>
    </div>
    <div class="clear"> </div>
    <!----End-top-nav---->
</div>
<!----End-Header---->