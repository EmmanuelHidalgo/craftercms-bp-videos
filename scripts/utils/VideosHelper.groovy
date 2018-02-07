package scripts.utils

import java.util.Properties

class VideosHelper {

   def searchService
   def siteItemService
   def start

  VideosHelper(searchService, siteItemService, start) {
    this.searchService = searchService
    this.siteItemService = siteItemService
    this.start = start
  }
  
  
  def getVideoList(statement) {
    def query = searchService.createQuery()
    query = query.setQuery(statement)
    query.setParam("sort", "createdDate_dt desc")
    query.setParam("start", start)
    query.setParam("rows", "10")
  
    def executedQuery = searchService.search(query)
    def start = executedQuery.response.start
    def itemsFound = executedQuery.response.numFound
    def items = executedQuery.response.documents
    
    def videos = []
    items.each { item ->
        def id = item.localId
        def video = siteItemService.getSiteItem(id)
        def tagArr = item.get("tags.item.tagName")
        def completeTagsArr = []
        def tagUrl = item.get("tags.item.tagUrl")

        if (tagArr){
        for(def i = 0; i<= tagArr.size; i++) {
          def completeTagObj = tagArr[i] ? ["tagName": tagArr[i], "tagUrl": tagUrl[i]] : ["tagName": null, "tagUrl": null]
            completeTagsArr.add(completeTagObj)
        }
      }
      def completeVideoObj = ["src": video, "tags": completeTagsArr]
      videos.add(completeVideoObj)
    }
    return ["totalCount": itemsFound, "responseVideos": videos, "selectedPage": (start/10)+1]
  }

}