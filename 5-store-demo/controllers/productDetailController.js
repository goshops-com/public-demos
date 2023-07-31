async function addToCart(productId) {
    // Step 1: Get the element with the class "cart-badge"
    var cartBadgeElement = document.querySelector('.cart-badge');

    // Step 2: Read the current value from the element
    var currentValue = parseInt(cartBadgeElement.textContent);

    // Step 3: Increment the value
    var newValue = currentValue + 1;

    // Step 4: Update the element with the new value
    cartBadgeElement.textContent = newValue;
    
    await window.gsSDK.addInteraction({
      "event": "cart",
      "item": `${productId}`
    });
}

async function detailControllerLoad(productId){

  await window.gsSDK.getContentByContext('product_detail', {
    productId: productId
  });

}