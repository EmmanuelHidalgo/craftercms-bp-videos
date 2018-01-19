import scripts.utils.VideosHelper


def videosHelper = new VideosHelper(searchService, siteItemService);

def carouselVideosStatement ='content-type:"/page/page-video" AND featured: "true"';
def recentVideosStatement = 'content-type:"/page/page-video"';


templateModel.featuredVideos = videosHelper.getVideoList(carouselVideosStatement)

templateModel.recentVideos = videosHelper.getVideoList(recentVideosStatement)