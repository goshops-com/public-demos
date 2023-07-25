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

  async function renderProductDetail(id) {
      let interval = setInterval(async function() {
          if (window.gsSDK) {
              clearInterval(interval);
              const itemData = await window.gsSDK.getItemById(id);
              console.log(itemData);
              loadTemplate('product-detail', function(template) {
                  // Retrieve your products data here, e.g. from an AJAX request
                  var html = template(itemData);
                  $("#app").html(html);
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