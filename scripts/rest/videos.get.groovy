import scripts.utils.VideosHelper2

def start = params.start
def categoryPath = params.category


def videosHelper2 = new VideosHelper2(searchService, siteItemService, start);
def recentVideosStatement = ''

if(categoryPath == 'undefined') {
 recentVideosStatement = 'content-type:"/page/page-video"';
} else {
  path = categoryPath+"/index.xml"
  recentVideosStatement = 'content-type:"/page/page-video" AND categories.item.key:"'+ path +'"'
}


println recentVideosStatement
return videosHelper2.getVideoList(recentVideosStatement)


