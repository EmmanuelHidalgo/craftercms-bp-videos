def result = [:]
def topNavItems = [:]
def siteDir = siteItemService.getSiteTree("/site/website/categories/index.xml", 50)
if(siteDir) {
    def dirs = siteDir.childItems
    dirs.each { dir ->
            def dirName = dir.getStoreName()
            def dirItem = siteItemService.getSiteItem("/site/website/${dirName}/index.xml")
            if (dirItem != null) {
                def dirDisplayName = dirItem.queryValue('internal-name')
                   topNavItems.put(dirName, dirDisplayName)
            }
   }
}
result.topNavItems = topNavItems;
return siteDir;