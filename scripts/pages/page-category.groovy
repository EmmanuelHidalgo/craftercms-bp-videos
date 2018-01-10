def queryStatement = 'content-type:"/page/page-video" AND categories.item.key:"'+ contentModel.storeUrl +'"'

def query = searchService.createQuery()
query = query.setQuery(queryStatement)

def executedQuery = searchService.search(query)
def itemsFound = executedQuery.response.numFound
def items = executedQuery.response.documents

def videos = []
items.each { item ->
    def id = item.localId
    def video = siteItemService.getSiteItem(id)
    videos.add(video)
}



println queryStatement
println  executedQuery.response

templateModel.videos = videos