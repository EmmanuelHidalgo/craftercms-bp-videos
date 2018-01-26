import scripts.utils.VideosHelper

def start = params.start
def search = params.searchValue
def path = !params.path ? " ": params.path
def recentVideosStatement = ''

def videosHelper = new VideosHelper(searchService, siteItemService, start);

if(search == '') {
	recentVideosStatement = 'content-type:"/page/page-video"'
} else if(path == '' || path == 'undefined'){
	recentVideosStatement = 'content-type:"/page/page-video" AND (title: *'+ search +'* OR tags.item.tagName: *'+search+'*)'
} else {
	recentVideosStatement = 'content-type:"/page/page-video" AND categories.item.key:"'+ path +'" AND (title: *'+ search +'* OR tags.item.tagName: *'+search+'*)'
}

if(search == '' && (path != 'undefined' || path != " ")) {
	recentVideosStatement = 'content-type:"/page/page-video" AND categories.item.key:"'+ path +'"'
}

return videosHelper.getVideoList(recentVideosStatement)
