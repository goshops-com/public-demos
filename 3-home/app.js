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
      '/checkout': function() {
        renderCheckout();
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

  function renderCheckout() {
    loadTemplate('checkout', async function(template) {
        // Retrieve your products data here, e.g. from an AJAX request
        console.log('loadTemplate', template);
        const state = await window.gsSDK.getState();
        console.log('state', JSON.stringify(state.cart))

        var html = template(state.cart);
        $("#app").html(html);
        
        document.getElementById('placeOrderBtn').addEventListener('click', async function() {
            const orderDetails = state.cart.products.map(product => {
                return {
                    id: product.id,
                    quantity: product.quantity,
                    price: product.price
                };
            });
            const orders = [];
            orderDetails.forEach((product) => {
                orders.push({
                    event: "purchase",
                    item: product.id,
                    quantity: product.quantity,
                    price: parseFloat(product.price),
                    amount: product.quantity*parseFloat(product.price)
                })
            })
            await window.gsSDK.addBulkInteractions(orders);
            window.location.href = '#'
        });
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