const interests = [
  { name: "Apparel Set", imageUrl: "https://go-shops.nyc3.digitaloceanspaces.com/demos/images/54703.jpg" },
  { name: "Bottomwear", imageUrl: "https://go-shops.nyc3.digitaloceanspaces.com/demos/images/9852.jpg" },
  { name: "Dress", imageUrl: "https://go-shops.nyc3.digitaloceanspaces.com/demos/images/33203.jpg" },
  { name: "Flip Flops", imageUrl: "https://go-shops.nyc3.digitaloceanspaces.com/demos/images/4630.jpg" },
  { name: "Innerwear", imageUrl: "https://go-shops.nyc3.digitaloceanspaces.com/demos/images/27964.jpg" },
  { name: "Sandal", imageUrl: "https://go-shops.nyc3.digitaloceanspaces.com/demos/images/2634.jpg" },
  { name: "Saree", imageUrl: "https://go-shops.nyc3.digitaloceanspaces.com/demos/images/53021.jpg" },
  { name: "Shoes", imageUrl: "https://go-shops.nyc3.digitaloceanspaces.com/demos/images/35725.jpg" },
  { name: "Topwear", imageUrl: "https://go-shops.nyc3.digitaloceanspaces.com/demos/images/6614.jpg" },
];

const imagesPerPage = 9; // Number of images to show on each page
let currentPage = 0; // Current page index
let selectedImageIndex = -1; // Index of the clicked image
let previousPageSelectedImageIndex = [];

function openPopup() {
  var popup = document.getElementById("popup");
  popup.classList.add("popup-active");
}
openPopup();

function closePopup() {
  var popup = document.getElementById("popup");
  popup.classList.remove("popup-active");
}
let currentPageIndex;
function updateLatest(caption, element, index, event) {

  interests[index].checked = !interests[index].checked;
  showImages(currentPage);
}

async function refreshPage() {
  const selectedInterest = [];
  for (interest of interests){
    if (interest.checked){
      selectedInterest.push(interest.name)
    }
  }
  const filter = { 'category': { $in: selectedInterest } };
  if (selectedInterest.length > 0){
    await window.gsSDK.setPreferences({field: 'category', values: selectedInterest});
    await window.gsSDK.emit('loadProducts', { filter });
  }
  
  closePopup();
}

function showImages(page) {
  // const startIndex = page * imagesPerPage;
  const startIndex = 0;
  let endIndex = Math.min(startIndex + imagesPerPage, interests.length);

  const popupImagesContainer = document.getElementById("popupImagesContainer");
  popupImagesContainer.innerHTML = ""; // Clear previous images

  for (let i = startIndex; i < endIndex; i++) {
    const interest = interests[i];

    const popupImageElement = document.createElement("div");
    popupImageElement.classList.add("popup-images");
    // if (previousPageSelectedImageIndex.includes(i)) {
    //   popupImageElement.classList.add("checked");
    // }
    // if (selectedImageIndex === i) {
    //   popupImageElement.classList.add("checked");
    // }

    if (interest.checked){
      popupImageElement.classList.add("checked");
    }

    popupImageElement.setAttribute(
      "onclick",
      `updateLatest('${interest.name}', this, ${i})`
    );

    const popupImageCover = document.createElement("div");
    popupImageCover.classList.add("popup-image-cover");

    const imgElement = document.createElement("img");
    imgElement.src = interest.imageUrl;
    imgElement.alt = interest.name;

    const overlayElement = document.createElement("div");
    overlayElement.classList.add("overlay");

    const checkedMarkElement = document.createElement("div");
    checkedMarkElement.classList.add("checked-mark");
    checkedMarkElement.innerHTML = "&#10003;";

    const itemNameElement = document.createElement("p");
    itemNameElement.classList.add("item-name");
    itemNameElement.textContent = interest.name;

    overlayElement.appendChild(checkedMarkElement);
    popupImageCover.appendChild(imgElement);
    popupImageCover.appendChild(overlayElement);
    popupImageElement.appendChild(popupImageCover);
    popupImageElement.appendChild(itemNameElement);

    popupImagesContainer.appendChild(popupImageElement);
  }
}

// Show the initial images on page load
showImages(currentPage);
