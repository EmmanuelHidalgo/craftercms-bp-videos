import scripts.utils.VideosHelper


def videosHelper = new VideosHelper(searchService, siteItemService);

//-------Category Videos Service-----------------

def queryStatement = contentModel.storeUrl == "/site/website/categories/index.xml" ? 'content-type:"/page/page-video"' :
'content-type:"/page/page-video" AND categories.item.key:"'+ contentModel.storeUrl +'"'


templateModel.videos = videosHelper.getVideoList(queryStatement)