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
    query.setParam("start", "0")
    query.setParam("rows", "100")
   
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
        def completeVideoInfo = ["src": video, "metaData": metaData, "totalItems": Math.round(pageNumbers)+1, "start": start]
        videos.add(completeVideoInfo)
    }
    
    
    return videos
  }
 
 
 def getVideoListV2(statement) {
  	def query = searchService.createQuery()
    query = query.setQuery(statement)

    
    query.setParam("sort", "createdDate_dt desc")
    query.setParam("start", "0")
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
  	println videos.size
    return ["totalCount": itemsFound, "responseVideos": videos, "selectedPage": (start/10)+1]
  }
  
}