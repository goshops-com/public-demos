// Image URLs to be looped
const items = [
  {
    imageName: "black-frock-removebg-preview.png",
    itemName: "Wedding Midi Dress",
    price: "Price $135",
  },
  {
    imageName: "black-shirt-removebg-preview.png",
    itemName: "Satin Mini Slip Dress",
    price: "Price $255",
  },
  {
    imageName: "blue-shirt-removebg-preview.png",
    itemName: "Deep Plunge Mini",
    price: "Price $470",
  },
  {
    imageName: "pink_frock-removebg-preview.png",
    itemName: "Mesh Pleated Dress",
    price: "Price $300",
  },
];
let startIndex = 0;
let endIndex = 2;
function generateItems() {
  // Get the container to append images
  const imageContainer = document.getElementById("imageContainer");
  imageContainer.innerHTML = "";
  // Loop through the image URLs and create image elements dynamically
  items.slice(startIndex, endIndex).forEach((data) => {
    const imageElement = document.createElement("img");
    imageElement.src = `./assets/${data.imageName}`;
    // Add onClick function to the image
    imageElement.addEventListener("click", () => {
      nextItems();
    });
    imageElement.alt = "...";

    const itemElement = document.createElement("div");
    itemElement.classList.add("drawer-items");
    const item = document.createElement("div");
    item.classList.add("item");
    itemElement.appendChild(item);
    item.appendChild(imageElement);
    imageContainer.appendChild(itemElement);
    const pTag = document.createElement("p");
    pTag.innerHTML = data.itemName;
    const h6Tag = document.createElement("h6");
    h6Tag.innerHTML = data.price;
    item.appendChild(pTag);
    item.appendChild(h6Tag);
  });
}

function nextItems() {
  if (endIndex == items.length) {
    startIndex = 0;
    endIndex = 2;
  } else {
    startIndex += 2;
    endIndex += 2;
  }

  generateItems();
}
generateItems();

function expandDrawer() {
  let drawer = document.getElementById("drawer-box");
  if (drawer.classList.contains("expand")) {
    drawer.classList.remove("expand");
  } else {
    drawer.classList.add("expand");
  }
}
