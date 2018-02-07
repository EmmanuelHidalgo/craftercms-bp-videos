function removeCurrent() {
    var pages = $('.pagination-page')
    $.each(pages, function(){
      $('#'+this.id).removeClass('current')
    })
}

function goFirst(){
	removeCurrent()
    $('#page-number-1').addClass('current')
    if(state) {
    	requestVideos(0, state)
    }else {
    	requestVideos(0)
    }
    
}

function goLast(){
	removeCurrent()
    var pages = $('.pagination-page')
    var lastPageId = 'page-number-'+pages.length
    var start = pages.length == 1 ? 0 : (pages.length*10)-10
    $("#"+lastPageId).addClass('current')
    if(state) {
    	requestVideos(start, state)
    } else {
    	requestVideos(start)
    }  
}

function shouldContinue(direction, pageNumber){
	var pages = $('.pagination-page')
    if(direction === "next") {
    	var lastElement  = pages[pages.length-1]
        var lastPageNumber = lastElement.id.split('-')[2]
        return pageNumber > lastPageNumber ? true : false
    }
    var firstElement = pages[0]
    var firstPageNumber = firstElement.id.split('-')[2]

    return pageNumber < firstPageNumber ? true : false
}



function go(direction){
	var previousElement = $('.current')
    $.each(previousElement, function() {
    	var previousPageNumber = parseInt(this.id.split('-')[2])
        var nextPageNumber = direction === 'next' ? previousPageNumber + 1 : previousPageNumber - 1
        var nextPageElement = $("#page-number-"+nextPageNumber)
        
        if(shouldContinue(direction, nextPageNumber)) return
        
        if(!nextPageElement) return

        removeCurrent()
        nextPageElement.addClass('current')
        var start = nextPageNumber == 1 ? 0 : (nextPageNumber*10)-10
        if(state){
      		requestVideos(start, state)
        } else {
            requestVideos(start)
        }
    })
}

function navigate(page) {
    var pageNumber = page.id.split('-')[2]
    var start = pageNumber == 1 ? 0 : (pageNumber*10)-10
    removeCurrent()
    $('#'+page.id).addClass('current')
    if(state){
      requestVideos(start, state)
    } else {
      requestVideos(start)
    }
}


function handlePagination(){  
  $('.pagination-page').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    navigate(this);
  });
  
  $("#first-btn").on('click', function(e){
    e.preventDefault();
    goFirst()
  });
  
  $("#last-btn").on('click', function(e){
    e.preventDefault();
    goLast()
  });
  
  $("#next-btn").on('click', function(e){
    e.preventDefault();
    go('next')
  })
  
  $("#previous-btn").on('click', function(e){
    e.preventDefault();
    go('previous')
  })
 }

function generatePagination(pageNumbers, selectedPage) {
  var noResults = document.getElementsByClassName('no-results')
  if(noResults.length > 0) return

  var container = $("#paginationContainer")
  container.empty();
  var pages = []
 
  for (var i = 1; i <= pageNumbers; i++ ) {
  	var current = i === selectedPage ? 'current' : ''
    pages.push({index: i, current: current})
  }
    
  var content =  document.getElementById("pagination-table-template")
  if(!content) return
  var source   = content.innerHTML;
  var template = Handlebars.compile(source);
  var context = {pages:pages};
  var html    = template(context);

  container.append(html)
}

