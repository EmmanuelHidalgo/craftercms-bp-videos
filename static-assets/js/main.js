
function getVideoTime(time) {
	const minutes = parseInt(time/60, 10);
    let seconds = (time % 60).toFixed(0);
    
    if (seconds == 0) {
    	seconds = '00'
    }
    
    return minutes+':'+seconds
}

function parseData(data) {
	const dataArr = [];
    data.item.children.forEach((child) => {
        const nodes = child.children ? child.children : [];
        if (child.name !== 'index.xml') {

        dataArr.push({
            id: child.name,
            text: child.name,
            url: child.url,
            children: generateChildren(nodes)
        })
      }
    })
	
   return dataArr;
}

function generateChildren(parentChildren) {
    if(!parentChildren) return;

    const filteredChild = parentChildren.filter((child) => child.name !== 'index.xml');

    return filteredChild.map((child) => {
            return {
                id: child.name,
                text: child.name,
                url: child.url,
                children: generateChildren(child.children)
            }
    })
}
    
    
  (function (root, factory) {
    $('.slider').slick({
      slidesToShow: 3,
      slidesToScroll: 3,
      dots: true,
      infinite: true,
      arrows: true,
      autoplay: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          }
        },
        {
          breakpoint: 720,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 320,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          }
        }
      ]
    });
    
    $("#form-submit").click(function(e){
      e.preventDefault();
      var thisButton = $(this);
      alertify.set('notifier','position', 'top-right');
      
      if(!thisButton.hasClass("loading") && !thisButton.hasClass("done")){
        var frm = $("#contact");
        if (!frm[0].checkValidity()) {
          // If the form is invalid, submit it. The form won't actually submit;
          // this will just cause the browser to display the native HTML5 error messages.
          frm.find('input[type=submit]').click()
        } else {
          var data = frm.serializeArray();
          data = data.reduce(function (m, e) { m[e.name] = e.value; return m; }, {});
          console.log(data)
            $.ajax({
              type: "POST",
              "url": "/api/1/services/mail.json",
              "data": data,
            }).done(function () {
              $('#contact')[0].reset();
              alertify.success('Your message was sent');
            }).fail(function (error) {
              alertify.error('There was an error during the action');
              console.error(error);
            }).always(function(){
              setTimeout(function(){
                thisButton.removeClass('done error');
              }, 2000);
            });
        }
      }
    });
    
    var api = "/api/site-map.json"
        $.ajax({
          type: "GET",
          "url": api,
        }).done(function (data) {
          if(data.item) {
            //here is the configuration of the jstree library
            $('#jstree').jstree({
              core: {
                data:parseData(data),
                themes: {
                  responsive: true,
                  dots: false
                }
              },
              state:{key: 'jstree'},
              plugins:['state', 'unique']
            });
            $('#jstree').on("changed.jstree", function (e, data) {
              if (data && data.node) {
                const url = data.node.original.url
                    const formatedUrl = url.split('/').splice(3,url.length).join('/')
                        window.location = '/'+formatedUrl;
              }  
            });
          }
        }).fail(function (error) {
          console.error(error);
        })
  })();
    
    $(document).ready(function() {
    	const carouselVideos = $('.video-carousel').on('loadedmetadata', function() {
        	const videoTime = getVideoTime(this.duration)

            const formatedId= this.id.split('-').splice(1,this.id.length).join('-')
            if (formatedId != '') {
            	const spanElement = document.getElementById('span-'+formatedId)
                spanElement.innerHTML= videoTime
            }            
        })	
	  });