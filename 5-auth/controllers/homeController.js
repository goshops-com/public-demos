
async function handleHeartClick(event, productId) {
  event.preventDefault();

  const heartIcon = event.currentTarget.querySelector("i.bi-heart");
  heartIcon.classList.toggle("bi-heart-fill");

  await window.gsSDK.addInteraction({
    "event": "like",
    "item": productId
  });
}

async function homeController() {
  console.log('home controller');
  await window.gsSDK.getContentByContext('home');
}

