package scripts.utils

import java.util.Properties



class CarouselHelper {

   def searchService
   def siteItemService

  CarouselHelper(searchService, siteItemService) {
    this.searchService = searchService
    this.siteItemService = siteItemService
  }

  def getCarouselList(statement) {
  	def query = searchService.createQuery()
    query = query.setQuery(statement)

    
    query.setParam("sort", "createdDate_dt desc")
    def executedQuery = searchService.search(query)
    def start = executedQuery.response.start
    def itemsFound = executedQuery.response.numFound
    def items = executedQuery.response.documents
    
    def videos = []
    items.each { item ->
        def id = item.localId
        def video = siteItemService.getSiteItem(id)
        def pageNumbers = itemsFound/10
        def metaData = ["tags": item.get("tags.item.tagName"), "urls": item.get("tags.item.tagUrl")]
        def completeVideoInfo = ["src": video, "metaData": metaData]
        videos.add(completeVideoInfo)
    }
    return videos
  }  
}