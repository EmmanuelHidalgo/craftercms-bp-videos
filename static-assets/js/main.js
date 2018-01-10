function parseData(data) {
    const obj = {
        core: {
            themes: {
                variant: false,
                stripes: false,
                responsive: true,
                dots: false,
            },
            check_callback:true,
            expand_selected_onload: true,
            loaded_state: true,
            state: {
                key: "container",
                preserve_loaded: true,
                events: ['changed.jstree','open_node.jstree', 'close_node.jstree']
                },
            plugins: ['state', 'contextmenu'],
            data: []
        }
    };

    data.item.children.forEach((child) => {
        const nodes = child.children ? child.children : [];
        if (child.name !== 'index.xml') {

        obj.core.data.push({
            id: child.name,
            text: child.name,
            url: child.url,
            children: generateChildren(nodes)
        })
      }
    })

    return obj;
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
                  $('#jstree').jstree(parseData(data));
                  $('#jstree').on("changed.jstree", function (e, data) {
                  	console.log(data.node.original.url)
                    const url = data.node.original.url
                    const formatedUrl = url.split('/').splice(3,url.length).join('/')
                    window.location = '/'+formatedUrl;
                  });
                  console.log($('#jstree').jstree("get_selected", true));
                }
              }).fail(function (error) {
                console.error(error);
              })
    })();