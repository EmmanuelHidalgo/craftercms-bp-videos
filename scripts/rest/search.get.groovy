import scripts.utils.VideosHelper2

def start = params.start
def search = params.searchValue
def recentVideosStatement = ''

def videosHelper2 = new VideosHelper2(searchService, siteItemService, start);

if(search == '') {
	recentVideosStatement = 'content-type:"/page/page-video"'
} else {
	recentVideosStatement = 'content-type:"/page/page-video" AND title: *'+ search +'*'
	}

return videosHelper2.getVideoListV2(recentVideosStatement)
