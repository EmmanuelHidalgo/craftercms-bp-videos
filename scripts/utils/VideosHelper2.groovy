package scripts.utils

import java.util.Properties



class VideosHelper2 {

   def searchService
   def siteItemService
   def start

  VideosHelper2(searchService, siteItemService, start) {
    this.searchService = searchService
    this.siteItemService = siteItemService
    this.start = start
  }

  def getVideoList(statement) {
    println statement
  	def query = searchService.createQuery()
    query = query.setQuery(statement)

    
    query.setParam("sort", "createdDate_dt desc")
    query.setParam("start", start)
    query.setParam("rows", "10")
   
    def executedQuery = searchService.search(query)
    def start = executedQuery.response.start
    def itemsFound = executedQuery.response.numFound
    def items = executedQuery.response.documents
    def documentsSize = executedQuery.response.documents.size
    
    def videos = []
    items.each { item ->
        def id = item.localId
        def video = siteItemService.getSiteItem(id)
        def pageNumbers = documentsSize/10
        def metaData = ["tags": item.get("tags.item.tagName"), "urls": item.get("tags.item.tagUrl")]
        def completeVideoInfo = ["src": video, "metaData": metaData, "totalItems": Math.round(pageNumbers), "start": start]
        videos.add(completeVideoInfo)
    }
    
    
    return videos
  }
  
  
  
def getVideoListV2(statement) {
def query = searchService.createQuery()
query = query.setQuery(statement)
println start
    
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