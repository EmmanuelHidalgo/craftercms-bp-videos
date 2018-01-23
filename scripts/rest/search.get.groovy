import scripts.utils.VideosHelper

def start = params.start
def search = params.searchValue
def recentVideosStatement = ''

def videosHelper = new VideosHelper(searchService, siteItemService, start);

if(search == '') {
	recentVideosStatement = 'content-type:"/page/page-video"'
} else {
	recentVideosStatement = 'content-type:"/page/page-video" AND title: *'+ search +'*'
	}

return videosHelper.getVideoList(recentVideosStatement)
