$(document).ready(function() {
  var router = Router({
      '/': function() {
          renderHome();
      },
      '/product-detail/:id': function(id) {
          renderProductDetail(id);
      },
      '/products': function() {
          renderProducts();
      },
      '/login': function() {
        renderLogin();
      },
      '/my-orders': function() {
        renderMyOrders();
      },
      '/search': function() {
        renderSearch();
      }
  });

  router.init('/');

  function loadTemplate(templateName, callback) {
      $.get(`templates/${templateName}.html`, function(data) {
          var template = Handlebars.compile(data);
          callback(template);
      }, 'html');
  }

  function renderHome() {
      loadTemplate('home', function(template) {
          // Retrieve your products data here, e.g. from an AJAX request
          console.log('loadTemplate', template);

          var html = template({});
          $("#app").html(html);
          
          var interval = setInterval(function() {
              if (window.gsSDK) {
                  clearInterval(interval);
                  homeController();
              }
          }, 50);
      });
  }

  async function renderSearch() {
    $.get(`templates/search-bkp.html`, async function(data) {
        $("#app").html(data);

        // var interval = setInterval(async function() {
        //     if (window.gsSDK) {
        //         clearInterval(interval);
        //         await window.gsSDK.getContent('search');
        //     }
        // }, 50);

        
    }, 'html');
  }

  function renderMyOrders() {
    loadTemplate('my-orders', function(template) {
        // Retrieve your products data here, e.g. from an AJAX request
        console.log('loadTemplate', template);
        const products = orders.filter((product) => product.user_id == window.user_id);
        console.log(products);
        var html = template({products});
        $("#app").html(html);
        
        var interval = setInterval(function() {
            if (window.gsSDK) {
                clearInterval(interval);
                homeController();
            }
        }, 50);
    });
}

  function renderLogin() {
      loadTemplate('login', function(template) {
          // Retrieve your products data here, e.g. from an AJAX request
          console.log('loadTemplate', template);


          var html = template({});
          $("#app").html(html);

          var interval = setInterval(function() {
              if (window.gsSDK) {
                  clearInterval(interval);
                  loginController();
              }
          }, 50);
      });
  }

  async function renderProductDetail(id) {
      let interval = setInterval(async function() {
          if (window.gsSDK) {
              clearInterval(interval);
              const itemData = await window.gsSDK.getItemById(id);
              
              itemData.imgs[0].url = convertUrl(itemData.imgs[0].url);
              
              loadTemplate('product-detail', async function(template) {
                  // Retrieve your products data here, e.g. from an AJAX request
                  var html = template(itemData);
                  $("#app").html(html);
                  await window.gsSDK.addInteraction({
                    "event": "view",
                    "item": id
                  });

                  console.log('loading controller')
                  var interval = setInterval(function() {
                    if (window.gsSDK) {
                        clearInterval(interval);
                        detailControllerLoad(id);
                        console.log('loading controller completed')
                    }
                  }, 50);

                  
              });
          }
      }, 100);
  }

  function renderProducts() {
      loadTemplate('products', function(template) {
          // Retrieve your products data here, e.g. from an AJAX request
          var html = template({});
          $("#app").html(html);

          var interval = setInterval(function() {
              if (window.gsSDK) {
                  clearInterval(interval);
                  gridControllerLoad();
              }
          }, 100);
      });
  }
});