import scripts.utils.VideosHelper

def start = params.start
def categoryPath = params.category


def videosHelper = new VideosHelper(searchService, siteItemService, start);
def recentVideosStatement = ''

if(categoryPath == 'undefined') {
 recentVideosStatement = 'content-type:"/page/page-video"';
} else {
  path = categoryPath+"/index.xml"
  recentVideosStatement = 'content-type:"/page/page-video" AND categories.item.key:"'+ path +'"'
}

return videosHelper.getVideoList(recentVideosStatement)





