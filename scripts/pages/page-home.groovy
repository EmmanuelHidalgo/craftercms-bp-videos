import scripts.utils.CarouselHelper

def carouselHelper = new CarouselHelper(searchService, siteItemService);
def carouselVideosStatement ='content-type:"/page/page-video" AND featured: "true"';

templateModel.featuredVideos = carouselHelper.getCarouselList(carouselVideosStatement)

