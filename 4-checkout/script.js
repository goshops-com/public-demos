$(document).ready(async function() {
    
    window.gsSDK = await new window.GSSDK.default('ZLiFHbRgxtY2VJiS');
    
    await window.gsSDK.getContentByContext('cart');

    // Function to handle the "Place Order" button click
    $("#placeOrderBtn").click(function() {
      // Show the error message
      $("#error").show();
      // Scroll to the error message to make it visible to the user
      $("#error")[0].scrollIntoView();
    });

    // window.$chatwoot.toggleBubbleVisibility("hide"); // to hide the bubble
    
  });