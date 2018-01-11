<#import "/templates/system/common/cstudio-support.ftl" as studio />
<#include "/templates/web/includes/global.ftl" />

<#macro default cstudioSupport = true>
<!--
Author: W3layouts
Author URL: http://w3layouts.com
License: Creative Commons Attribution 3.0 Unported
License URL: http://creativecommons.org/licenses/by/3.0/
-->
<!DOCTYPE HTML>
<html>
	<head>
		<title>Videostube Website Template | Home :: W3layouts</title>
		<link rel="shortcut icon" type="image/x-icon" href="/static-assets/images/pageicon.png" />
		<link href="/static-assets/css/style.css" rel="stylesheet" type="text/css"  media="all" />
		<meta name="keywords" content="Videostube iphone web template, Andriod web template, Smartphone web template, free webdesigns for Nokia, Samsung, LG, SonyErricsson, Motorola web design" />
		<link href='http://fonts.googleapis.com/css?family=Ropa+Sans' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="/static-assets/css/alertify.min.css">
        <link rel="stylesheet" href="/static-assets/css/jstree/style.css" />
        <link rel="stylesheet" href="/static-assets/css/slick/slick.css"/>
    	<link rel="stylesheet" href="/static-assets/css/slick/slick-theme.css"/>
	</head>
	<body>
	<!----start-wrap---->
	<div class="wrap">
		<header id="header">
            <@renderHeader/>
        </header>

		<div class="clear"> </div>

        <main class="mainContainer">
            <#nested/>
        </main>

		<div class="clear"> </div>
		</div>
		<div class="clear"> </div>
		</div>

		<footer id="footer">
            <@renderFooter/>
        </footer>
	</div>
	<!----End-wrap---->
    <script>window.jQuery || document.write('<script src="/static-assets/js/jquery-1.11.2.min.js"><\/script>')</script>
    <script src="/static-assets/js/alertify.min.js"></script>
    <script src="/static-assets/js/jstree.min.js"></script>
    <script  src="/static-assets/js/slick.min.js"></script>
    <script src="/static-assets/js/main.js"></script>
	</body>
</html>
</#macro>