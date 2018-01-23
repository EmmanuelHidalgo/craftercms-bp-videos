function removeCurrent() {
    const pages = $('.pagination-page')
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
    const pages = $('.pagination-page')
    const lastPageId = 'page-number-'+pages.length
    const start = pages.length == 1 ? 0 : (pages.length*10)-10
    $("#"+lastPageId).addClass('current')
    if(state) {
    	requestVideos(start, state)
    } else {
    	requestVideos(start)
    }  
}

function shouldContinue(direction, pageNumber){
	const pages = $('.pagination-page')
    if(direction === "next") {
    	const lastElement  = pages[pages.length-1]
        const lastPageNumber = lastElement.id.split('-')[2]
        return pageNumber > lastPageNumber ? true : false
    }
    const firstElement = pages[0]
    const firstPageNumber = firstElement.id.split('-')[2]

    return pageNumber < firstPageNumber ? true : false
}



function go(direction){
	const previousElement = $('.current')
    $.each(previousElement, function() {
    	const previousPageNumber = parseInt(this.id.split('-')[2])
        const nextPageNumber = direction === 'next' ? previousPageNumber + 1 : previousPageNumber - 1
        const nextPageElement = $("#page-number-"+nextPageNumber)
        
        if(shouldContinue(direction, nextPageNumber)) return
        
        if(!nextPageElement) return

        removeCurrent()
        nextPageElement.addClass('current')
        const start = nextPageNumber == 1 ? 0 : (nextPageNumber*10)-10
        if(state){
      		requestVideos(start, state)
        } else {
            requestVideos(start)
        }
    })
}

function navigate(page) {
    const pageNumber = page.id.split('-')[2]
    const start = pageNumber == 1 ? 0 : (pageNumber*10)-10
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
  const container = $("#paginationContainer")
  container.empty();
  const pages = []
  for (let i = 1; i <= pageNumbers; i++ ) {
  	const current = i === selectedPage ? 'current' : ''
  	const element = `<li><a id="page-number-${i}" class="pagination-page ${current}">${i}</a></li>`
    pages.push(element)
  }
  

  const pagination = `
  	<li><a id="first-btn" href="#" class="first">First</a></li>
    <li><a id="previous-btn" href="#" class="previous">Previous</a></li>
    ${pages}
    <li><a id="next-btn" href="#" class="next">Next</a></li>
    <li><a id="last-btn" href="#" class="last">Last</a></li>
  `
  container.append(pagination)
}

