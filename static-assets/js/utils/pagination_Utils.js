function removeCurrent() {
    const pages = $('.pagination-page')
    $.each(pages, function(){
      $('#'+this.id).removeClass('current')
    })
}

function navigate(page) {
    const pageNumber = page.id.split('-')[2]
    const start = pageNumber == 1 ? 0 : (pageNumber*10)-10
    removeCurrent()
    $('#'+page.id).addClass('current')
    requestVideos(start)
}