function removeCurrent() {
    const pages = $('.pagination-page')
    $.each(pages, function(){
      $('#'+this.id).removeClass('current')
    })
}

function goFirst(){
	removeCurrent()
    $('#page-number-1').addClass('current')
    requestVideos(0)
}

function goLast(){
	removeCurrent()
    const pages = $('.pagination-page')
    const lastPageId = 'page-number-'+pages.length
    const start = pages.length == 1 ? 0 : (pages.length*10)-10
    $("#"+lastPageId).addClass('current')
    requestVideos(start)
}

function go(direction){
	const previousElement = $('.current')
    $.each(previousElement, function() {
    	const previousPageNumber = parseInt(this.id.split('-')[2])
        const nextPageNumber = direction === 'next' ? previousPageNumber + 1 : previousPageNumber - 1
        const nextPageElement = $("#page-number-"+nextPageNumber)
        if(!nextPageElement) return
        removeCurrent()
        nextPageElement.addClass('current')
        const start = nextPageNumber == 1 ? 0 : (nextPageNumber*10)-10
        requestVideos(start)
    })
}

function navigate(page) {
    const pageNumber = page.id.split('-')[2]
    const start = pageNumber == 1 ? 0 : (pageNumber*10)-10
    removeCurrent()
    $('#'+page.id).addClass('current')
    requestVideos(start)
}

