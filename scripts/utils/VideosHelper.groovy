package scripts.utils

import java.util.Properties



class VideosHelper {

   def searchService
   def siteItemService

  VideosHelper(searchService, siteItemService) {
    this.searchService = searchService
    this.siteItemService = siteItemService
  }

  def getVideoList(statement) {
  	def query = searchService.createQuery()
    query = query.setQuery(statement)
    query.setParam("sort", "createdDate_dt desc")
     query.setParam("rows", "100")
    def executedQuery = searchService.search(query)
    def itemsFound = executedQuery.response.numFound
    def items = executedQuery.response.documents
    
    def videos = []
    items.each { item ->
        def id = item.localId
        def video = siteItemService.getSiteItem(id)
        videos.add(video)
    }
    return videos
  }
 
}